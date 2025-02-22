import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import GoogleAuthButton from "../components/GoogleAuthButton";
import Alert from "../components/Alert";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import { useAuth } from "../context/AuthContext";

function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Check for token when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/check-auth");

        if (response.data.success) {
          login();
        }
      } catch (error) {
        console.error("Failed to check authentication status:", error);
      }
    };

    checkAuth();
  }, [login]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    setLoading(true);
    setAlertMessage("");

    try {
      const response = await axios.post("/api/auth/login", formData);

      setSuccess(true);
      setAlertMessage("Login successful!");
      login(); // Call the login function to update authentication state
      navigate("/profile"); // Redirect to the protected route
    } catch (error) {
      console.log(error);
      const errorMsg = error.response?.data?.message || "An error occurred";
      setAlertMessage(errorMsg);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuthClick = () => {
    setIsGoogleLoading(true);
    window.location.href = "/api/auth/google";
  };

  return (
    <>
      {/* Alert Message */}
      {alertMessage && (
        <Alert
          message={alertMessage}
          success={success}
          onDismiss={() => setAlertMessage("")}
          autoDismiss={true}
          dismissTime={3000}
        />
      )}

      {/* Form Container */}
      <FormContainer
        onSubmit={handleSubmit}
        title="Sign In"
        subtitle="Sign in to your account"
      >
        {/* Google Sign-In Button */}
        <GoogleAuthButton
          text="Sign Up with Google"
          isLoading={isGoogleLoading}
          onClick={handleGoogleAuthClick}
        />
        <div className="flex items-center mt-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 text-gray-600">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Email Input */}
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(!!formData.email)}
          placeholder="Email address"
          required
          icon={MdOutlineMail}
          focused={emailFocused || !!formData.email}
        />
        {errors.email && (
          <div className="text-red-500 text-sm mt-1 ml-4">{errors.email}</div>
        )}

        {/* Password Input */}
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(!!formData.password)}
          placeholder="Password"
          required
          icon={MdLockOutline}
          focused={passwordFocused || !!formData.password}
        />
        {errors.password && (
          <div className="text-red-500 text-sm mt-1 ml-4">
            {errors.password}
          </div>
        )}

        {/* Forgot Password Link */}
        <div className="mt-2 text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button loading={loading} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        {/* Sign Up Link */}
        <div className="mt-2 text-center">
          <span className="text-sm text-gray-600">
            Don't have an account? &nbsp;
          </span>
          <Link to="/signup" className="text-sm text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </FormContainer>
    </>
  );
}

export default SigninPage;
