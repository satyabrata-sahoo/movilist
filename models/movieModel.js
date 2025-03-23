import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import movieSchem from "../models/schema/movieSchem";
import reviewSchema from "../models/schema/reviewSchem";

module.exports = {
    addMovie: async (data) => {
        return new Promise(async (resolve, reject) => {
            await new movieSchem(data)
                .save()
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getMovieById: async (Id) => {
        return new Promise(async (resolve, reject) => {
            await movieSchem.findById(Id)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    updateMovie: async (_id, data) => {
        return new Promise(async (resolve, reject) => {
            await movieSchem.findOneAndUpdate({ _id: _id }, data, { new: true })
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getAllMovie: async (query) => {
        return new Promise(async (resolve, reject) => {
            console.log(query)
            let page = query?.page ? query.page : 1;
            let perPage = query?.per_page ? query.per_page : 10;
            let search = query?.search ? query.search : "";
            let arr = [
                {
                    $or:
                        [
                            { title: { $regex: search, $options: "i" } },
                        ]
                },
            ];
            if (query?.movie_id) arr.push({ _id: { $eq: new ObjectId(query?.movie_id) } });
            if (query?.status) arr.push({ status: { $eq: query?.status } });
            let agg = [
                {
                    $match: {
                        $and: arr
                    }
                },
                {
                    $lookup: {
                        from: "reviews",
                        let: {
                            movie_id: "$_id"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ["$movie_id", "$$movie_id"]
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "reviews"
                    }
                },
                {
                    $facet: {
                        totalCount: [
                            {
                                $count: "count",
                            },
                        ],
                        pageResults: [
                            {
                                $skip: (Number(page) - 1) * Number(perPage),
                            },
                            {
                                $limit: Number(perPage),
                            },
                        ],
                    },
                },
            ];
            await movieSchem.aggregate(agg).then((result) => {
                resolve(result);
            })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getMovieReviwList: async (query) => {
        return new Promise(async (resolve, reject) => {
            let page = query?.page ? query.page : 1;
            let perPage = query?.per_page ? query.per_page : 10;
            let arr = [
                {
                    status: "Active",
                    movie_id: new ObjectId(query?.movie_id)
                },
            ];
            if (query?.reviw_id) arr.push({ _id: { $eq: new ObjectId(query?.reviw_id) } });
            let agg = [
                {
                    $match: {
                        $and: arr
                    }
                },
                {
                    $lookup: {
                        from: "movies",
                        let: {
                            movie_id: "$movie_id"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ["$_id", "$$movie_id"]
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    title: 1,
                                    description: 1
                                }
                            }
                        ],
                        as: "movie"
                    }
                },
                {
                    $unwind: {
                        path: "$movie",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: "customers",
                        let: {
                            customer_likeed: "$customer_likeed"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $in: [
                                                    "$_id",
                                                    "$$customer_likeed"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "customer_likeed"
                    }
                },
                {
                    $facet: {
                        totalCount: [
                            {
                                $count: "count",
                            },
                        ],
                        pageResults: [
                            {
                                $skip: (Number(page) - 1) * Number(perPage),
                            },
                            {
                                $limit: Number(perPage),
                            },
                        ],
                    },
                },
            ];
            await reviewSchema.aggregate(agg).then((result) => {
                resolve(result);
            })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};