import md5 from "md5";
const customerModel = require("../models/customerModel");
const {
  catchAsync,
  resHandler,
  validateEmail,
  generateVerificationCode,
  generateJwtToken
} = require("../utils");

module.exports = {
  customerSignIn: async (req, res) => {
    const { email } = req.body;
    if (!email) return resHandler(res, 400, "Please enter email.");
    const Email = email.toLowerCase();
    const isValidEmail = await validateEmail(Email);
    if (!isValidEmail) return resHandler(res, 400, "Invalid Email Address");
    const RegisteredUser = await customerModel.getCustomerByEmail(Email);
    const verificationCode = await generateVerificationCode(4);
    if (RegisteredUser) {
      if (RegisteredUser.is_blocked) return resHandler(res, 403, "Your account has been banned.");
      RegisteredUser.email_verification_code = verificationCode;
      await RegisteredUser.save();
      return resHandler(res, 200,
        `We have sent you OTP on your Email Address: ${email}, Please use the same OTP to log in.`,
        { customer_id: RegisteredUser._id, email: RegisteredUser.email,otp:verificationCode }
      );
    }
    const newCustomer = await customerModel.addCustomer({ email: Email, email_verification_code: verificationCode });
    return resHandler(res, 200,
      `We have sent you OTP on your Email Address: ${email}, Please use the same OTP to log in.`,
      {
        customer_id: newCustomer._id,
        email: newCustomer.email,
        otp:verificationCode
      }
    );
  },
  verification: async (req, res) => {
    try {
      const { customer_id, otp } = req.body;
      if (!customer_id) return resHandler(res, 400, "Please pass customer ID");
      if (!otp) return resHandler(res, 400, "Please enter your OTP");
      const customer = await customerModel.getCustomerById(customer_id);
      if (!customer) return resHandler(res, 404, "We cannot find the requested account to process this request");
      if (customer.is_blocked) return resHandler(res, 403, "Your account has been banned.");
      if (customer.email_verification_code !== Number(otp)) return resHandler(res, 403, "Invalid OTP.");
      customer.is_email_verified = true;
      customer.status = "Active";
      customer.login_time = new Date();
      customer.is_login = true;
      await customer.save();

      const IPAddress =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection?.socket?.remoteAddress;
      const IPAddressCleaned = IPAddress ? IPAddress.replace("::ffff:", "") : "Unknown";

      const UserAgent = req.headers["user-agent"];
      let browser = "unknown";
      if (/firefox/i.test(UserAgent)) browser = "firefox";
      else if (/chrome/i.test(UserAgent)) browser = "chrome";
      else if (/safari/i.test(UserAgent)) browser = "safari";
      else if (/msie/i.test(UserAgent)) browser = "msie";
      else if (/PostmanRuntime/i.test(UserAgent)) browser = "Postman";
      // log out customer from other device single device login
      await customerModel.logoutFromOtherDevice(customer_id);

      const date = new Date();
      const timestamp = date.getTime();
      const secret_key = md5(customer._id + timestamp);
      const token = generateJwtToken({ account_id: customer._id.toString(), secret_key }, "10d");
      // Store login logs
      let loginLogData = {
        account_id: customer._id,
        ip_address: IPAddressCleaned,
        web_browser: browser,
        operating_system: process.platform,
        platform: process.platform,
        secret_key
      };
      await customerModel.addLoginLogs(loginLogData);
      let data = customer.toObject();
      delete data.email_verification_code;
      data.token = token;
      return resHandler(res, 200, "Verification successful", data);
    } catch (error) {
      return resHandler(res, 400, error.message);
    }
  },
  getCustomerData: async (req, res) => {
    try {
      const { account_id } = req.query;
      if (!account_id) return resHandler(res, 410, "Unauthorized request");
      const customer = await customerModel.getCustomerById(account_id);
      if (!customer) return resHandler(res, 404, "We cannot find the requested account to process this request");
      let data = customer.toObject();
      delete data.email_verification_code;
      return resHandler(res, 200, "Success", data);
    } catch (error) {
      return resHandler(res, 400, error.message);
    }
  },
};
