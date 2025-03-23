import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
    {
        ip_address:String,
        email: String,
        phone: Number,
        first_name:String,
        last_name:String,
        password: String,
        status: {
            type: String,
            enum: ["Active", "Inactive", "Delete"],
            default: "Active",
        },
        is_blocked: {
            type: Boolean,
            default: false,
        },
        login_time:{ type: Date, default: null },
        token:String
    }, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const adminUserModel =
    mongoose.models.adminusers || mongoose.model("adminusers", adminUserSchema);

module.exports = adminUserModel;