import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Shield,
  Users,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("https://auctionhub-ycv4.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user.email))
      localStorage.setItem("id", JSON.stringify(data.user.id))
      navigate('/dashboard');
      // alert("Account created successfully!");
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed!";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Shield,
      title: "Secure Bidding",
      description: "Bank-level encryption protects your data",
    },
    {
      icon: Users,
      title: "Active Community",
      description: "Join 10,000+ active bidders worldwide",
    },
    {
      icon: Trophy,
      title: "Exclusive Auctions",
      description: "Access to premium and rare items",
    },
  ];

  const passwordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { strength: 0, label: "", color: "" };
    if (password.length < 6)
      return { strength: 25, label: "Weak", color: "bg-red-500" };
    if (password.length < 8)
      return { strength: 50, label: "Fair", color: "bg-yellow-500" };
    if (password.length < 12)
      return { strength: 75, label: "Good", color: "bg-blue-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 py-20">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-white mb-4">
              Join AuctionHub
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Start your bidding journey today and discover amazing deals on
              unique items.
            </p>

            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-white">
                  <p className="font-semibold">Join 10,000+ bidders</p>
                  <p className="text-sm text-gray-300">Active this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Create Account
                </h2>
                <p className="text-gray-300">
                  Join the auction community today
                </p>
              </div>

              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-white/20"
                        }`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.lastName ? "border-red-500" : "border-white/20"
                        }`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        errors.email ? "border-red-500" : "border-white/20"
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        errors.phone ? "border-red-500" : "border-white/20"
                      }`}
                      placeholder="+91 5551234567"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        errors.password ? "border-red-500" : "border-white/20"
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
                            style={{ width: `${strength.strength}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-400">
                          {strength.label}
                        </span>
                      </div>
                    </div>
                  )}
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-white/20"
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword && (
                      <p className="mt-1 text-sm text-green-400 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Passwords match
                      </p>
                    )}
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                    />
                    <label className="text-sm text-gray-300">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-purple-400 hover:text-purple-300 underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-purple-400 hover:text-purple-300 underline"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.agreeToTerms}
                    </p>
                  )}

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                    />
                    <label className="text-sm text-gray-300">
                      Subscribe to our newsletter for auction updates and
                      exclusive deals
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
