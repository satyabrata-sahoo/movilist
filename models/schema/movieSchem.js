import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    tagline: String,
    releaseDate: {
      type: Date,
    },
    runtime: Number,
    genre: {
      type: [String],
    },
    language:String,
    certification: String,
    director: {
      type: [String],
    },
    writers: {
      type: [String],
    },
    cast: [
      {
        name: String,
        role: String,
      },
    ],
    poster: String,
    budget:Number,
    productionCompanies: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Deleted"],
      default: "Active",
    },
    rating:Number,
    number_of_review:Number,
    industry:String
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
const Movie = mongoose.models.movies || mongoose.model("movies", movieSchema);
export default Movie;