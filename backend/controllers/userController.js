import generateToken from "../utils/generateToken.js";
import tryCatch from "../utils/tryCatch.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import redisClient from "../services/redis.service.js"; // Assuming redisConfig.js is the file where Redis client is configured

// Register User
export const registerUser = tryCatch(async (req, res) => {
    const { name, email, password, mobileNumber, dateOfBirth } = req.body;

    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists!" });
    }

    user = await User.create({
        name,
        email,
        password,
        mobileNumber,
        dateOfBirth,
    });

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

    // Generate JWT token and store it in Redis with a TTL (e.g., 1 hour)
    const token = generateToken(user._id, res);
    const redisKey = `auth_token:${user._id}`;
    
    await redisClient.set(redisKey, token, 'EX', 3600); // Store token for 1 hour

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
    
    // Delete the user's JWT token from Redis when logging out
    await redisClient.del(redisKey);

    res.cookie("token", "", { maxAge: 0 });
    res.json({ message: "User logged out successfully!" });
});

// Edit User
export const editUser = tryCatch(async (req, res) => {
    const { name, email, mobileNumber, dateOfBirth, role } = req.body;

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

    await user.save();

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
