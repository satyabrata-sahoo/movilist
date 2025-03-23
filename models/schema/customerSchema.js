const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    is_email_verified: {
      type: Boolean,
      default: false,
    },
    email_verification_code: Number,
    is_login: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Delete"],
      default: "Inactive",
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    rating:Number,
    number_of_review:Number,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const customerModel =
  mongoose.models.customers || mongoose.model("customers", usersSchema);
module.exports = customerModel;
