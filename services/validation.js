const Joi = require("joi");

// Joi schema for movie validation
const movieSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
    "any.required": "Title is required.",
  }),
  industry: Joi.string().required().messages({
    "string.empty": "Please select industry.",
    "any.required": "Please select industry.",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required.",
    "any.required": "Description is required.",
  }),
  tagline: Joi.string().optional(),
  releaseDate: Joi.date().required().messages({
    "date.base": "Release date must be a valid date.",
    "any.required": "Release date is required.",
  }),
  runtime: Joi.number().required().messages({
    "number.base": "Runtime must be a number.",
    "any.required": "Runtime is required.",
  }),
  genre: Joi.array().items(Joi.string()).required().messages({
    "array.base": "Genre must be an array of strings.",
    "any.required": "Genre is required.",
  }),
  language: Joi.string().required().messages({
    "string.empty": "Language is required.",
    "any.required": "Language is required.",
  }),
  certification: Joi.string().optional(),
  director: Joi.array().items(Joi.string()).required().messages({
    "array.base": "Director must be an array of strings.",
    "any.required": "Director is required.",
  }),
  writers: Joi.array().items(Joi.string()).optional(),
  cast: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        role: Joi.string().required(),
      })
    )
    .required()
    .messages({
      "array.base": "Cast must be an array of objects.",
      "any.required": "Cast is required.",
    }),
    status: Joi.string().required().messages({
      "string.empty": "Please select status.",
      "any.required": "Please select status.",
    }),
  budget: Joi.number().optional(),
  productionCompanies: Joi.array().items(Joi.string()).optional(),
  homepage: Joi.string().optional(),
});

const validateMovie = (data) => {
  const { error } = movieSchema.validate(data, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message).join(", ");
    console.log("errorMessages",errorMessages)
    return { isValid: false, error: errorMessages }; 
  }

  return { isValid: true, error: null }; 
};

const movieUpdateSchema = Joi.object({
  movie_id: Joi.string().required().messages({
    "string.empty": "Please pass movie id.",
    "any.required": "Please pass movie id.",
  }),
  title: Joi.string().optional().messages({
    "string.empty": "Title cannot be empty.",
  }),
  industry: Joi.string().optional().messages({
    "string.empty": "Please select industry.",
  }),
  description: Joi.string().optional().messages({
    "string.empty": "Description cannot be empty.",
  }),
  tagline: Joi.string().optional(),
  releaseDate: Joi.date().optional().messages({
    "date.base": "Release date must be a valid date.",
  }),
  runtime: Joi.number().optional().messages({
    "number.base": "Runtime must be a number.",
  }),
  genre: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Genre must be an array of strings.",
  }),
  language: Joi.string().optional().messages({
    "string.empty": "Language cannot be empty.",
  }),
  certification: Joi.string().optional(),
  director: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Director must be an array of strings.",
  }),
  writers: Joi.array().items(Joi.string()).optional(),
  cast: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        role: Joi.string().required(),
      })
    )
    .optional()
    .messages({
      "array.base": "Cast must be an array of objects.",
    }),
    status: Joi.string().optional().messages({
      "string.empty": "Please select status.",
    }),
  budget: Joi.number().optional(),
  productionCompanies: Joi.array().items(Joi.string()).optional(),
  homepage: Joi.string().optional(),
});

const validateMovieUpdate = (data) => {
  const { error } = movieUpdateSchema.validate(data, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message).join(", ");
    console.log("Validation errors:", errorMessages);
    return { isValid: false, error: errorMessages };
  }

  return { isValid: true, error: null };
};

module.exports = { validateMovie ,validateMovieUpdate};