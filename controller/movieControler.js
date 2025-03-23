const { uploadToCloudinary } = require("../services/fileUpload");
const { resHandler, catchAsync } = require("../utils");
const { validateMovie, validateMovieUpdate } = require("../services/validation");
const movieModel = require("../models/movieModel");
const customerModel = require("../models/customerModel");

module.exports = {
    addMovie: async (req, res) => {
        try {
            req.body = JSON.parse(req.body.data);
            const validation = validateMovie(req.body);
            if (validation?.error) {
                return resHandler(res, 400, validation.error);
            }
            let movie = await movieModel.addMovie(req.body);
            let posterUrl = null;
            if (req.file) {
                if (req.file.fieldname === "poster") {
                    posterUrl = await uploadToCloudinary(req.file.path);
                }
            }
            movie.poster = posterUrl;
            await movie.save();
            return resHandler(res, 200, "Movie added successfully", movie);
        } catch (error) {
            console.error("Error adding movie:", error);
            return resHandler(res, 500, "Internal server error.");
        }
    },
    updateMovie: async (req, res) => {
        try {
            req.body = JSON.parse(req.body.data);
            if (!req.body.movie_id) return resHandler(res, 400, "Please pass movie id.");
            const validation = validateMovieUpdate(req.body);
            if (validation?.error) return resHandler(res, 400, validation.error);
            const Movie = await movieModel.getMovieById(req.body.movie_id);
            if (!Movie) return resHandler(res, 400, "Invalid request.");
            if (req.file) {
                if (req.file.fieldname === "poster") {
                    req.body.poster = await uploadToCloudinary(req.file.path);
                }
            }
            const movie = await movieModel.updateMovie(req.body.movie_id, req.body);
            return resHandler(res, 200, "Movie updated successfully", movie);
        } catch (error) {
            return resHandler(res, 500, "Internal server error.");
        }
    },
    addReview: async (req, res) => {
        if (!req.body.account_id) return resHandler(res, 400, "Unauthorized request.");
        if (!req.body.movie_id) return resHandler(res, 400, "Please pass movie id.");

        const customer = await customerModel.getCustomerById(req.body.account_id);
        if (!customer) return resHandler(res, 400, "Invalid request.");

        const Movie = await movieModel.getMovieById(req.body.movie_id);
        if (!Movie) return resHandler(res, 400, "Invalid request.");

        const existingReview = await customerModel.getCustomerMoviereview(req.body.movie_id, req.body.account_id);
        if (existingReview.length > 0) return resHandler(res, 400, "You have already added a review.");

        if (!req.body.rating && !req.body.review) {
            return resHandler(res, 400, "Please provide either a rating or a review.");
        }

        let obj = {
            customer_id: req.body.account_id,
            movie_id: req.body.movie_id,
            rating: req.body.rating || undefined,
            review: req.body.review || undefined
        };

        const review = await customerModel.add_review(obj);

        if (req.body.rating) {
            if (Movie.rating == undefined && Movie.number_of_review == undefined) {
                Movie.rating = req.body.rating;
                Movie.number_of_review = 1;
            } else {
                let total = Movie.rating * Movie.number_of_review + req.body.rating;
                let no_of_review = Movie.number_of_review + 1;
                Movie.rating = parseFloat((total / no_of_review).toFixed(1));
                Movie.number_of_review = no_of_review;
            }
            await Movie.save();
        }
        return resHandler(res, 200, "Review added successfully", review);
    },
    updateReview: async (req, res) => {
        if (!req.body.account_id) return resHandler(res, 400, "Unauthorized request.");
        if (!req.body.movie_id) return resHandler(res, 400, "Please pass movie id.");
        if (!req.body.review_id) return resHandler(res, 400, "Please pass review id.");

        const customer = await customerModel.getCustomerById(req.body.account_id);
        if (!customer) return resHandler(res, 400, "Invalid request.");

        const Movie = await movieModel.getMovieById(req.body.movie_id);
        if (!Movie) return resHandler(res, 400, "Invalid request.");

        const existingReview = await customerModel.getReviewById(req.body.review_id);
        if (!existingReview) return resHandler(res, 400, "No review found.");
        if (req.body.action === "delete") {
            if (existingReview.rating) {
                if (Movie.number_of_review > 1) {
                    let total = Movie.rating * Movie.number_of_review - existingReview.rating;
                    let no_of_review = Movie.number_of_review - 1;
                    Movie.rating = parseFloat((total / no_of_review).toFixed(1));
                    Movie.number_of_review = no_of_review;
                } else {
                    Movie.rating = 0;
                    Movie.number_of_review = 0;
                }
                await Movie.save();
            }
            await customerModel.updateReview(existingReview._id, { status: "Delete" });
            return resHandler(res, 200, "Review deleted successfully.");
        }

        if (!req.body.rating && !req.body.review) {
            return resHandler(res, 400, "Please provide either a rating or a review.");
        }

        if (req.body.rating && existingReview.rating) {
            let totalRating = (Movie.rating * Movie.number_of_review) - existingReview.rating + req.body.rating;
            Movie.rating = parseFloat((totalRating / Movie.number_of_review).toFixed(1));
            await Movie.save();
        }

        let updateData = {
            rating: req.body.rating || existingReview.rating,
            review: req.body.review || existingReview.review
        };

        await customerModel.updateReview(existingReview._id, updateData);
        return resHandler(res, 200, "Review updated successfully.");
    },
    addLikeInReview: async (req, res) => {
        if (!req.body.account_id) return resHandler(res, 400, "Unauthorized request.");
        if (!req.body.review_id) return resHandler(res, 400, "Please pass review id.");
        const customer = await customerModel.getCustomerById(req.body.account_id);
        if (!customer) return resHandler(res, 400, "Invalid request.");
        const existingReview = await customerModel.getReviewById(req.body.review_id);
        if (!existingReview) return resHandler(res, 400, "No review found.");
        if (req.body.action === "add_like") {
            const review = await customerModel.updateReview(existingReview._id, { $addToSet: { customer_likeed: req.body.account_id } });
            return resHandler(res, 200, "data updated successfullyg.", review);
        } else if (req.body.action === "remove_like") {
            const review = await customerModel.updateReview(existingReview._id, { $pull: { customer_likeed: req.body.account_id } });
            return resHandler(res, 200, "data updated successfully.", review);
        } else {
            return resHandler(res, 400, "Invalid input data.");
        }
    },
    getMovie: async (req, res) => {
        const data = await movieModel.getAllMovie(req.query)
        const count = data[0]?.totalCount[0]?.count > 0 ? data[0].totalCount[0].count : 0;
        const pageResult = data[0]?.pageResults?.length > 0 ? data[0].pageResults : [];
        let result = { totalCount: count, pageResult }
        return resHandler(res, 200, "Success.", result);
    },
    getMovieReviewList: async (req, res) => {
        if(!req.query.movie_id) return resHandler(res, 400, "Please pass movie id.");
        const data = await movieModel.getMovieReviwList(req.query)
        const count = data[0]?.totalCount[0]?.count > 0 ? data[0].totalCount[0].count : 0;
        const pageResult = data[0]?.pageResults?.length > 0 ? data[0].pageResults : [];
        let result = { totalCount: count, pageResult }
        return resHandler(res, 200, "Success.", result);
    },
};