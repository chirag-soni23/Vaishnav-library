import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // Regex for password validation (at least one lowercase, one uppercase, one special character, and minimum 6 characters)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    const validatePassword = (password) => {
        if (!password.match(passwordRegex)) {
            setPasswordError('Password must be at least 6 characters long, contain both lowercase and uppercase letters, and include a special character.');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            toast.error("Passwords do not match.");
            return;
        } else {
            setConfirmPasswordError('');
        }

        // Validate password
        validatePassword(password);
        if (passwordError) return;  // If there's a password error, don't submit the form

        setBtnLoading(true);
        try {
            const { data } = await axios.put(`/api/user/resetpassword/${token}`, { password });
            toast.success(data.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || "Password reset failed.");
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mt-2">Reset Your Password</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* New Password Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">New Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="input input-bordered w-full"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validatePassword(e.target.value);
                                }}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <Eye className="size-5 text-base-content/40" />
                                ) : (
                                    <EyeOff className="size-5 text-base-content/40" />
                                )}
                            </button>
                        </div>
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="input input-bordered w-full"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <Eye className="size-5 text-base-content/40" />
                                ) : (
                                    <EyeOff className="size-5 text-base-content/40" />
                                )}
                            </button>
                        </div>
                        {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={btnLoading}>
                        {btnLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
