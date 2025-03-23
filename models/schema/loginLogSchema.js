const mongoose = require("mongoose");

const loginLogSchema = new mongoose.Schema(
    {
        account_id: { type: mongoose.Schema.ObjectId },
        secret_key:String,
        ip_address: { type: String },
        login_time: { type: Date, default: Date.now },
        logout_time: { type: Date, default: null },
        web_browser: { type: String },
        operating_system: { type: String },
        platform: { type: String },
        token: String,
        status: {
            type: String,
            enum: ["Active", "Inactive", "Delete"],
            default: "Active",
        },
    },
    { timestamps: { createdAt: "created_date", updatedAt: "updated_date" } }
);
const loginModel = mongoose.models.loginlogs || mongoose.model("loginlogs", loginLogSchema);
module.exports = loginModel;
