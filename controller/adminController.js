import adminModel from "../models/adminModel";
import { catchAsync, resHandler, validatePhone, validateEmail, hashPassword, generateJwtToken, comparePassword } from "../utils";

const adminController = {
    createAdminUser: catchAsync(async (req, res) => {
        const { phone, email, password } = req.body;
        if (!phone || !email || !password) return resHandler(res, 400, "All fields are required.");
        if (!(await validatePhone(phone))) return resHandler(res, 400, "Invalid phone number.");
        if (!(await validateEmail(email.toLowerCase()))) return resHandler(res, 400, "Invalid email.");
        if (await adminModel.getAdminUserByPhone(phone)) return resHandler(res, 400, `User with phone ${phone} already exists.`);
        if (await adminModel.getAdminUserByEmail(email.toLowerCase())) return resHandler(res, 400, `User with email ${email} already exists.`);
        const hashedPassword = await hashPassword(password);
        const user = await adminModel.createAdminUser({
            phone,
            email: email.toLowerCase(),
            password: hashedPassword,
        });
        return resHandler(res, 201, "Admin user created successfully", user);
    }),

    updateAdminUser: catchAsync(async (req, res) => {
        const { userId, phone, email } = req.body;
        if (!userId || !phone || !email) return resHandler(res, 400, "All fields are required.");
        if (!(await validatePhone(phone))) return resHandler(res, 400, "Invalid phone number.");
        if (!(await validateEmail(email.toLowerCase()))) return resHandler(res, 400, "Invalid email.");
        const user = await adminModel.getAdminUserById(userId);
        if (!user) return resHandler(res, 400, "Invalid input data.");
        const existingPhoneUser = await adminModel.getAdminUserByPhone(phone);
        if (existingPhoneUser && existingPhoneUser._id.toString() !== userId) return resHandler(res, 400, `User with phone ${phone} already exists.`);
        const existingEmailUser = await adminModel.getAdminUserByEmail(email.toLowerCase());
        if (existingEmailUser && existingEmailUser._id.toString() !== userId) return resHandler(res, 400, `User with email ${email} already exists.`);
        const updatedUser = await adminModel.updateAdminUser(userId, { phone, email });
        return resHandler(res, 200, "Admin user updated successfully", updatedUser);
    }),

    adminLogin: catchAsync(async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) return resHandler(res, 400, "Email and password are required.");
        const user = await adminModel.getAdminUserByEmail(email.toLowerCase());
        if (!user || !(await comparePassword(password, user.password))) return resHandler(res, 400, "Invalid credentials.");
        if (user.is_blocked) return resHandler(res, 400, "Your account is suspended. Please contact support.");
        const token = generateJwtToken({ email: user.email }, "1d");
        const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        await adminModel.updateAdminUser(user._id, {
            ip_address: ipAddress.replace("::ffff:", ""),
            login_time: new Date(),
            token,
        });
        const userData = await adminModel.getAdminUserById(user._id);;
        return resHandler(res, 200, "Login successful", {
            _id: userData._id,
            email: userData.email,
            phone: userData.phone,
            status: userData.status,
            token: userData.token,
        });
    }),
};

export default adminController;
