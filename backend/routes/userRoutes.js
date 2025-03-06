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
    deleteAllUsers
} from '../controllers/userController.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAuth, myProfile);
router.post("/logout", isAuth, logout);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);
router.delete("/deleteall", isAuth, deleteAllUsers);

// Admin Routes
router.get("/users", isAuth, getAllUsers);
router.patch("/users/:id", isAuth, editUser);
router.delete("/users/:id", isAuth, deleteUser);

export default router;
