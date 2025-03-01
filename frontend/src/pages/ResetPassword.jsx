import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    // Extract token from URL
    const queryParams = new URLSearchParams(location.search);
    const resetToken = queryParams.get("token");
    if (resetToken) {
      setToken(resetToken);
    } else {
      toast.error("Invalid or expired token.");
      navigate("/login"); 
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setBtnLoading(true);
    try {
      const { data } = await axios.put(`/api/user/resetpassword/${token}`, {
        password,
      });

      toast.success(data.message);
      navigate("/login"); // Redirect to login after successful reset
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
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-base-content/60">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">New Password</span>
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

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Confirm Password</span>
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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full" disabled={btnLoading}>
            {btnLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
