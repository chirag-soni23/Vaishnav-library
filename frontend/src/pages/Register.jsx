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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email to receive OTP.");
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
    const success = await registerUser(name, email, password, mobileNumber, dateOfBirth, otp, navigate);
    if (!success) {
      setOtpError(true);
      toast.error("Invalid OTP. Please try again.");
    }
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
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  required
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
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
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
