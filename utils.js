import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const privateKey = process.env.JWT_SECRET_KEY;


export const catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      const statusCode = err.statusCode || 500;
      const errorResponse =
        process.env.NODE_ENV === "development"
          ? { status: false, message: `Internal Server Error: ${err.message}` }
          : { status: false, message: "Internal Server Error" };

      res.status(statusCode).json(errorResponse);
    }
  };
};

export const resHandler = (res, statusCode, message, data) => {
  if (statusCode >= 400) {
    return res.status(statusCode).json({
      status: false,
      message,
      ...(data && { data }),
    });
  }
  return res.status(statusCode).json({ status: true, message, data });
};

export const validateEmail = async (emailAddress) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress);
};

export const generateVerificationCode = async (length) => {
  return Math.floor(
    10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1)
  );
};

export const generateJwtToken = (data, expireTime) => {
  return jwt.sign(data, privateKey, { expiresIn: expireTime });
};

export const validatePhone = async (phoneNumber) => {
  let phoneFormat = /^\d{10}$/;
  return String(phoneNumber).match(phoneFormat) !== null;
};

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, await bcrypt.genSalt(saltRounds));
};

export const comparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
