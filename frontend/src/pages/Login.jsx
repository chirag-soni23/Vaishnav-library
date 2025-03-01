import { useState } from "react";
import { Book, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser, forgotPassword, btnLoading } = UserData();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }
    try {
      await forgotPassword(email);
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error) {
      toast.error("Failed to send password reset email.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Book className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Login to Your Account</h1>
            <p className="text-base-content/60">Access your account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              className="link link-primary text-sm"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-full" disabled={btnLoading}>
            {btnLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-base-content/60">
            Not a member?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
