const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const customerSchema = require("./schema/customerSchema");
const loginLogSchema = require("./schema/loginLogSchema");
const reviewSchema = require("../models/schema/reviewSchem");

module.exports = {
  addCustomer: async (data) => {
    return new Promise(async (resolve, reject) => {
      await new customerSchema(data)
        .save()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getCustomerByEmail: async (email) => {
    return new Promise(async (resolve, reject) => {
      await customerSchema
        .findOne({ email: email, status: { $ne: "Delete" } })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateCustomerById: async (customer_id, data) => {
    return new Promise(async (resolve, reject) => {
      await customerSchema
        .findOneAndUpdate({ _id: customer_id }, data, { new: true })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getCustomerById: async (Id) => {
    return new Promise(async (resolve, reject) => {
      await customerSchema
        .findById(Id)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  addLoginLogs: async (data) => {
    return new Promise(async (resolve, reject) => {
      await new loginLogSchema(data)
        .save()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logoutFromOtherDevice: async (account_id) => {
    return new Promise(async (resolve, reject) => {
      await loginLogSchema.updateMany({ account_id, status: "Active" }, { status: "Delete", logout_time: new Date() })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getLoginLogBySecretKey: async (account_id, secret_key) => {
    return new Promise(async (resolve, reject) => {
      await loginLogSchema
        .find({
          account_id,
          secret_key,
          status: "Active",
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  add_review: async (data) => {
    return new Promise(async (resolve, reject) => {
      await new reviewSchema(data)
        .save()
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getCustomerMoviereview: async (movie_id,customer_id) => {
    return new Promise(async (resolve, reject) => {
      await reviewSchema.find({movie_id:movie_id,customer_id:customer_id,status:"Active"})
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateReview: async (id, data) => {
    return new Promise(async (resolve, reject) => {
      await reviewSchema
        .findOneAndUpdate({ _id: id }, data, { new: true })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getReviewById: async (id) => {
    return new Promise(async (resolve, reject) => {
      await reviewSchema.findById(id)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
};
