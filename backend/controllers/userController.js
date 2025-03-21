import generateToken from "../utils/generateToken.js";
import tryCatch from "../utils/tryCatch.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import redisClient from "../services/redis.service.js";
import cloudinary from "cloudinary";

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Request OTP for Registration
export const requestOTP = tryCatch(async (req, res) => {
    const { email } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists!" });
    }

    const otp = generateOTP();
    const redisKey = `otp:${email}`;

    await redisClient.set(redisKey, otp, 'EX', 300); // OTP valid for 5 mins

    await sendEmail({
        email,
        subject: "Your OTP for Registration",
        message: `Welcome to Vaishnav Library. Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    res.status(200).json({ message: "OTP sent to your email!" });
});

// Register User with OTP Verification
export const registerUser = tryCatch(async (req, res) => {
    const { name, email, password, mobileNumber, dateOfBirth, state, district, otp } = req.body;

    const redisKey = `otp:${email}`;
    const storedOTP = await redisClient.get(redisKey);

    if (!storedOTP || storedOTP !== otp) {
        return res.status(400).json({ message: "Invalid or expired OTP!" });
    }

    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists!" });
    }

    user = await User.create({ name, email, password, mobileNumber, dateOfBirth, state, district });

    await redisClient.del(redisKey);

    generateToken(user._id, res);
    res.status(201).json({ message: "User registered successfully!" });
});

// Login User
export const loginUser = tryCatch(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id, res);
    const redisKey = `auth_token:${user._id}`;

    await redisClient.set(redisKey, token, 'EX', 3600);

    res.status(200).json({ message: "User logged in successfully!" });
});

// My Profile
export const myProfile = tryCatch(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
});

// Logout
export const logout = tryCatch(async (req, res) => {
    const userId = req.user._id;
    const redisKey = `auth_token:${userId}`;
    await redisClient.del(redisKey);

    res.cookie("token", "", { maxAge: 0 });
    res.json({ message: "User logged out successfully!" });
});

// Edit User
export const editUser = tryCatch(async (req, res) => {
    const { name, email, mobileNumber, dateOfBirth, role, state, district } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }

    if (role && !['user', 'member'].includes(role)) {
        return res.status(400).json({ message: "Invalid role specified!" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.mobileNumber = mobileNumber || user.mobileNumber;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.role = role || user.role;
    user.state = state || user.state; 
    user.district = district || user.district; 
    await user.save();

    if (user.role === "member") {
        const message = `
            Dear ${user.name}, Now, you are a member of Vaishnav library:
            Name: ${user.name}
            Email: ${user.email}
            Mobile: ${user.mobileNumber}
            Role: ${user.role}
        `;

        await sendEmail({
            email: user.email,
            subject: "Your Profile Has Been Updated",
            message
        });
    }

    res.status(200).json({ message: "User updated successfully!", user });
});

// Delete User
export const deleteUser = tryCatch(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully!" });
});

// Delete All Users
export const deleteAllUsers = tryCatch(async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied! Admins only." });
    }

    const result = await User.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully!", deletedCount: result.deletedCount });
});

// Get All Users
export const getAllUsers = tryCatch(async (req, res) => {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
});

// Forgot Password
export const forgotPassword = tryCatch(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;
    const message = `You requested a password reset. Click the link to reset your password: \n\n ${resetUrl}`;

    try {
        await sendEmail({ email: user.email, subject: "Password Reset Request", message });
        res.status(200).json({ message: "Reset password link sent to email!" });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        res.status(500).json({ message: "Email could not be sent" });
    }
});

// Reset Password
export const resetPassword = tryCatch(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
});

// Update Profile Picture
export const updateProfilePicture = tryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
    }

    try {
        // Delete old profile picture from Cloudinary
        if (user.profilePicture && user.profilePicture.id) {
            await cloudinary.v2.uploader.destroy(user.profilePicture.id);
        }

        // Upload new profile picture
        const result = await cloudinary.v2.uploader.upload_stream(
            { folder: "profile_pictures", width: 500, height: 500, crop: "fill" },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ message: "Cloudinary upload failed", error });
                }

                user.profilePicture = {
                    id: result.public_id,
                    url: result.secure_url,
                };

                await user.save();
                res.status(200).json({ message: "Profile picture updated successfully!", profilePicture: user.profilePicture });
            }
        );

        result.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
});

// Delete Profile Picture Based on User ID from Params
export const deleteProfilePicture = tryCatch(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }

    if (user.profilePicture && user.profilePicture.id) {
        await cloudinary.v2.uploader.destroy(user.profilePicture.id);

        user.profilePicture = undefined;
        await user.save();

        return res.status(200).json({ message: "Profile picture deleted successfully!" });
    } else {
        return res.status(404).json({ message: "No profile picture to delete!" });
    }
});
