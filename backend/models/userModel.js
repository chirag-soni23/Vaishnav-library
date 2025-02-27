import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['member', 'admin'], default: 'member' },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true });

// Password Hash Middleware
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash & Set Token
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set Expiry (10 min)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

export const User = mongoose.model("User", userSchema);
