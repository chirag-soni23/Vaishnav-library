import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Request OTP
    async function requestOTP(email) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/request-otp", { email });
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Register User with OTP
    async function registerUser(name, email, password, mobileNumber, dateOfBirth, otp, state, district, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/register", {
                name,
                email,
                password,
                mobileNumber,
                dateOfBirth,
                otp,
                state,  
                district,
            });
            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            navigate("/");
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Login User
    async function loginUser(email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/login", { email, password });
            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            navigate("/");
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Fetch Logged-In User
    async function fetchUser() {
        try {
            const { data } = await axios.get("/api/user/me");
            setUser(data);
            setIsAuth(true);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            setIsAuth(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
        fetchAllUsers();
    }, []);

    // Fetch All Users (Admin Only)
    async function fetchAllUsers() {
        setIsLoading(true);
        try {
            const { data } = await axios.get("/api/user/users");
            setAllUsers(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to fetch all users:", error);
        } finally {
            setIsLoading(false);
        }
    }

    // Logout
    async function logout() {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/logout");
            toast.success(data.message || "User Logout successfully!");
            setUser(null);
            setIsAuth(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Edit Profile
    async function editProfile({ role, userId, name, email, mobileNumber, dateOfBirth, state, district }) {
        setBtnLoading(true);
        try {
            if (role && user?.role !== 'admin') {
                toast.error("Only admins can update user roles.");
                return;
            }

            const { data } = await axios.patch(`/api/user/users/${userId}`, {
                name,
                email,
                mobileNumber,
                dateOfBirth,
                role,
                state, 
                district,  
            });

            toast.success(data.message);

            if (data.user._id === user?._id) {
                setUser({
                    ...user,
                    name: data.user.name,
                    email: data.user.email,
                    mobileNumber: data.user.mobileNumber,
                    dateOfBirth: data.user.dateOfBirth,
                    role: data.user.role,
                    state: data.user.state,
                    district: data.user.district, 
                });
            }

            setAllUsers(prev => prev.map(u => (u._id === userId ? data.user : u)));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Delete User (Admin Only)
    async function deleteUser(userId) {
        setBtnLoading(true);
        try {
            const { data } = await axios.delete(`/api/user/users/${userId}`);
            toast.success(data.message);

            setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete user.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Update Profile Picture
    async function updateProfilePicture(file) {
        setBtnLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const { data } = await axios.put("/api/user/profile-picture", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success(data.message);
            setUser(prevUser => ({ ...prevUser, profilePicture: data.profilePicture }));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile picture.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Delete Profile Picture
    async function deleteProfilePicture(userId) {
        setBtnLoading(true);
        try {
            const { data } = await axios.delete(`/api/user/delete-profilePic/${userId}`);
            toast.success(data.message);
            setUser(prevUser => ({
                ...prevUser,
                profilePicture: null
            }));
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete profile picture.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Delete All Users (Admin Only)
    async function deleteAllUsers() {
        setBtnLoading(true);
        try {
            const { data } = await axios.delete("/api/user/deleteall");
            toast.success(data.message);
            setAllUsers([]);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete all users.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Forgot Password
    async function forgotPassword(email) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/forgotpassword", { email });
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send password reset email.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Reset Password
    async function resetPassword(token, newPassword, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.put(`/api/user/resetpassword/${token}`, { password: newPassword });
            toast.success(data.message);
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Password reset failed.");
        } finally {
            setBtnLoading(false);
        }
    }

    return (
        <UserContext.Provider
            value={{
                requestOTP,
                registerUser,
                loginUser,
                logout,
                fetchAllUsers,
                deleteUser,
                deleteAllUsers,
                forgotPassword,
                resetPassword,
                btnLoading,
                isAuth,
                user,
                allUsers,
                loading,
                isLoading,
                editProfile,
                updateProfilePicture,
                deleteProfilePicture
            }}
        >
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);
