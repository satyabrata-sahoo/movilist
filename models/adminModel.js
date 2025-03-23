import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import adminUserSchema from "../models/schema/adminUserSchema";


module.exports = {
    createAdminUser: async (data) => {
        return new Promise(async (resolve, reject) => {
            await new adminUserSchema(data)
                .save()
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getAdminUserById: async (Id) => {
        return new Promise(async (resolve, reject) => {
            await adminUserSchema.findById(Id)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getAdminUserByPhone: async (phone) => {
        return new Promise(async (resolve, reject) => {
            await adminUserSchema.findOne({ phone: phone, status: { $ne: "Delete" } })
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getAdminUserByEmail: async (email) => {
        return new Promise(async (resolve, reject) => {
            await adminUserSchema.findOne({ email: email, status: { $ne: "Delete" } })
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    updateAdminUser: async (_id, data) => {
        return new Promise(async (resolve, reject) => {
            await adminUserSchema.findOneAndUpdate({ _id: _id }, data, { new: true })
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};