import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, Phone, User, Calendar, Library } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext.jsx";
import toast from 'react-hot-toast';

const Register = () => {
  const { requestOTP, registerUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email to receive OTP.");
      return;
    }
    const trimmedName = name.trim();
    const nameParts = trimmedName.split(/\s+/);

    if (nameParts.length < 2) {
      toast.error("Full name must contain at least a first and last name.");
      return;
    }
    setResendLoading(true);
    await requestOTP(email);
    setOtpSent(true);
    setOtpError(false);
    setResendLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!otp) {
      toast.error("Please enter OTP to verify your email.");
      return;
    }

    // Check password length and complexity using regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!password.match(passwordRegex)) {
      toast.error("Password must be at least 6 characters long, contain both lowercase and uppercase letters, and include a special character.");
      return;
    }

    // Check future date validation
    const selectedDate = new Date(dateOfBirth);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      toast.error("Date of birth cannot be a future date.");
      return;
    }
  
    const success = await registerUser(name, email, password, mobileNumber, dateOfBirth, otp, navigate);
    if (!success) {
      setOtpError(true);
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!newPassword.match(passwordRegex)) {
      setPasswordError("Password must be at least 6 characters long, contain both lowercase and uppercase letters, and include a special character.");
    } else {
      setPasswordError("");
    }
  };

  const handleMobileNumberChange = (e) => {
    // Remove any non-numeric characters and limit to 10 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(value);
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Library className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={otpSent ? handleRegister : handleSendOtp} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name and Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-5 text-base-content/40" />
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={otpSent && !otpError}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Mobile Number and Date of Birth */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Mobile Number</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 size-5 text-base-content/40" />
                  <input
                    type="tel"
                    className="input input-bordered w-full pl-10"
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    required
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Date of Birth</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 size-5 text-base-content/40" />
                  <input
                    type="date"
                    className="input input-bordered w-full pl-10"
                    value={dateOfBirth}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      const currentDate = new Date();
                      // Prevent future date selection
                      if (selectedDate <= currentDate) {
                        setDateOfBirth(e.target.value);
                      } else {
                        toast.error("Date of birth cannot be a future date.");
                      }
                    }}
                    required
                  />
                </div>
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
                  onChange={handlePasswordChange}
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
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            {otpSent && otpError && (
              <button
                type="button"
                className="btn btn-secondary w-full"
                onClick={handleSendOtp}
                disabled={resendLoading}
              >
                {resendLoading ? <Loader2 className="size-5 animate-spin mx-auto" /> : "Resend OTP"}
              </button>
            )}
            
            {otpSent ? (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Enter OTP</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter OTP sent to email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={btnLoading}>
                  {btnLoading ? <Loader2 className="size-5 animate-spin mx-auto" /> : "Verify & Register"}
                </button>
              </>
            ) : (
              <button type="submit" className="btn btn-primary w-full" disabled={btnLoading}>
                {btnLoading ? <Loader2 className="size-5 animate-spin mx-auto" /> : "Send OTP"}
              </button>
            )}
          </form>
          <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-primary underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
