import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const { token } = useParams(); // Get the token from the URL
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setBtnLoading(true);
        try {
            const { data } = await axios.put(`/api/user/resetpassword/${token}`, { password });
            toast.success(data.message);
            navigate('/login'); // Redirect to login page after successful reset
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
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">New Password</span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
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
