import express from 'express';
import {
    forgotPassword,
    resetPassword,
    deleteUser,
    editUser,
    getAllUsers,
    loginUser,
    logout,
    myProfile,
    registerUser,
    deleteAllUsers,
    updateProfilePicture,
    deleteProfilePicture,
    requestOTP
} from '../controllers/userController.js';
import { isAuth } from '../middlewares/isAuth.js';
import uploadFile from '../middlewares/multer.js';

const router = express.Router();

// OTP Routes
router.post("/request-otp", requestOTP);
router.post("/register", registerUser);

// Auth Routes
router.post("/login", loginUser);
router.get("/me", isAuth, myProfile);
router.post("/logout", isAuth, logout);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);

// Profile Routes
router.put("/profile-picture", isAuth, uploadFile, updateProfilePicture);
router.delete("/delete-profilePic/:id", isAuth, deleteProfilePicture);

// Admin Routes
router.get("/users", isAuth, getAllUsers);
router.patch("/users/:id", isAuth, editUser);
router.delete("/users/:id", isAuth, deleteUser);
router.delete("/deleteall", isAuth, deleteAllUsers);

export default router;
