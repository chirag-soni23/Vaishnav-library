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

    // Register User
    async function registerUser(name, email, password, mobileNumber, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("api/user/register", {
                name,
                email,
                password,
                mobileNumber,
            });
            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            navigate("/");
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
    }, []);

    // Fetch All Users (Admin Only)
    async function fetchAllUsers() {
        setIsLoading(true);
        try {
            const { data } = await axios.get("/api/user/users");
            setAllUsers(data);
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
            const { data } = await axios.get("/api/user/logout");
            toast.success(data.message);
            setUser(null);
            setIsAuth(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Edit Profile
    async function editProfile({ name, email, mobileNumber }) {
        setBtnLoading(true);
        try {
            const { data } = await axios.patch("/api/user/users/me", { name, email, mobileNumber });

            toast.success(data.message);
            setUser((prev) => ({
                ...prev,
                ...data.user,
            }));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile.");
        } finally {
            setBtnLoading(false);
        }
    }

    // **Delete User (Admin Only)**
    async function deleteUser(userId) {
        setBtnLoading(true);
        try {
            const { data } = await axios.delete(`/api/user/users/${userId}`);
            toast.success(data.message);

            // Update UI after deletion
            setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete user.");
        } finally {
            setBtnLoading(false);
        }
    }

    return (
        <UserContext.Provider
            value={{
                registerUser,
                loginUser,
                logout,
                fetchAllUsers,
                deleteUser, 
                btnLoading,
                isAuth,
                user,
                allUsers,
                loading,
                isLoading,
                editProfile,
            }}
        >
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);
