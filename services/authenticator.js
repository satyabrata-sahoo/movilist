import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import customerModel from "../models/customerModel";
import adminModel from "../models/adminModel";
const { catchAsync, resHandler } = require("../utils");

module.exports.customerAuthHandler = catchAsync(async (req, res, next) => {
    const token = req.headers.token;
    if (!token) return resHandler(res, 400, "Unauthorized request");
    const privateKey = process.env.JWT_SECRET_KEY;
    jwt.verify(token, privateKey, async (err, decData) => {
        if (err) return resHandler(res, 410, "Session Expired");
        if (!decData?.account_id || !decData?.secret_key) return resHandler(res, 410, "Unauthorized request");
        const user = await customerModel.getCustomerById(decData?.account_id);
        const loginLog = await customerModel.getLoginLogBySecretKey(decData?.account_id, decData?.secret_key);
        if (!user || user.is_blocked || loginLog.length == 0) return resHandler(res, 410, "Unauthorized request");
        if (req.method == "GET" || req.method == "DELETE") {
            req.query.account_id = decData?.account_id;
        } else {
            req.body.account_id = decData?.account_id;
        }
        next();
    });
});


// module.exports.adminAuthHandler = catchAsync(async (req, res, next) => {
//     const token = req.headers.token;
//     if (!token) return resHandler(res, 400, "Unauthorized request");
//     const privateKey = process.env.JWT_SECRET_KEY;
//     jwt.verify(token, privateKey, async (err, decData) => {
//         if (err) return resHandler(res, 410, "Session Expired");
//         if (!decData?.account_id || !decData?.secret_key) return resHandler(res, 410, "Unauthorized request");
//         const user = await customerModel.getCustomerById(decData?.account_id);
//         const loginLog = await customerModel.getLoginLogBySecretKey(decData?.account_id, decData?.secret_key);
//         if (!user || user.is_blocked || loginLog.length == 0) return resHandler(res, 410, "Unauthorized request");
//         if (req.method == "GET" || req.method == "DELETE") {
//             req.query.account_id = decData?.account_id;
//         } else {
//             req.body.account_id = decData?.account_id;
//         }
//         next();
//     });
// });

module.exports.adminAuthHandler = catchAsync(async (req, res, next) => {
    const token = req.headers.token;
    if (!token)  return resHandler(res, 400, "Invalid Headers");
    try {
      const privateKey = process.env.JWT_SECRET_KEY;
      const decodedData = jwt.verify(token, privateKey, (err, decoded) => {
        if (err) return null;
        return decoded;
      });
      if (!decodedData) return resHandler(res, 410, "Session Expired");
      const user = await adminModel.getAdminUserByEmail(decodedData?.email);
      if (!user)  return resHandler(res, 401, "Invalid user");
      req.login_id = user._id;
      next();
    } catch (error) {
      return resHandler(res, 401, "Invalid Token");
    }
  });


