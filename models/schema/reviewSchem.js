const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        customer_id: {
            type: mongoose.Schema.ObjectId,
            ref: "customers"
        },
        movie_id: {
            type: mongoose.Schema.ObjectId,
            ref: "movies"
        },
        review: String,
        rating: Number,
        status: {
            type: String,
            enum: ["Active", "Inactive", "Delete"],
            default: "Active",
        },
        customer_likeed:[mongoose.Schema.ObjectId],
    }, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const reviewModel = mongoose.models.reviews || mongoose.model("reviews", reviewSchema);

module.exports = reviewModel;