import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoMdCheckmarkCircle, IoMdAlert } from "react-icons/io";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import axios from "axios";
import { MdLockOutline, MdOutlineMail, MdPersonOutline } from "react-icons/md";
import GoogleAuthButton from "../components/GoogleAuthButton";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when user types
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
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
      const response = await axios.post("/api/auth/signup", formData);

      setSuccess(true);
      setAlertMessage(
        "Signup successful! Please check your email to verify your account."
      );
      navigate("/verify-email", { state: { email: formData.email } });
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
    login();
  };

  return (
    <section className="bg-white">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        {/* Alert Message */}
        {alertMessage && (
          <div
            className={`fixed top-4 right-4 p-3 text-sm rounded-lg flex items-center transition-transform transform-gpu ease-in-out duration-300 animate-slide-in ${
              success
                ? "text-green-800 bg-green-200 border border-green-500"
                : "text-red-800 bg-red-200 border border-red-500"
            }`}
          >
            {success ? (
              <IoMdCheckmarkCircle className="w-5 h-5 mr-2" />
            ) : (
              <IoMdAlert className="w-5 h-5 mr-2" />
            )}
            <span className="mr-10">{alertMessage}</span>
            <button
              type="button"
              className="ml-auto hover:underline"
              onClick={() => setAlertMessage("")}
            >
              Dismiss
            </button>
          </div>
        )}

        <form
          className="w-full max-w-md border p-6 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize sm:text-3xl">
              Sign Up
            </h1>
            <p className="mt-2 text-sm text-gray-600">Create a new account</p>
          </div>

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

          {/* Username Input */}
          <div className="relative flex items-center mt-8">
            <span className="absolute left-3">
              <MdPersonOutline className="w-6 h-6 text-gray-300" />
            </span>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(!!formData.username)}
              required
              className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-1 focus:outline-none"
            />
            <label
              className={`absolute left-10 transition-all duration-200 font-normal ${
                usernameFocused || formData.username
                  ? "top-0 text-xs text-blue-500 bg-white px-1 -translate-y-1/2"
                  : "top-1/2 text-gray-400 font-extralight -translate-y-1/2"
              }`}
            >
              Username
            </label>
          </div>
          {errors.username && (
            <div className="text-red-500 text-sm mt-1 ml-4">
              {errors.username}
            </div>
          )}

          {/* Email Input */}
          <div className="relative flex items-center mt-4">
            <span className="absolute left-3">
              <MdOutlineMail className="w-6 h-6 text-gray-300" />
            </span>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(!!formData.email)}
              required
              className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-1 focus:outline-none"
            />
            <label
              className={`absolute left-10 transition-all duration-200 font-normal ${
                emailFocused || formData.email
                  ? "top-0 text-xs text-blue-500 bg-white px-1 -translate-y-1/2"
                  : "top-1/2 text-gray-400 font-extralight -translate-y-1/2"
              }`}
            >
              Email address
            </label>
          </div>
          {errors.email && (
            <div className="text-red-500 text-sm mt-1 ml-4">{errors.email}</div>
          )}

          {/* Password Input */}
          <div className="relative flex items-center mt-4">
            <span className="absolute left-3">
              <MdLockOutline className="w-6 h-6 text-gray-300" />
            </span>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(!!formData.password)}
              required
              className="block w-full py-3 pl-10 pr-10 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-300 focus:outline-none"
            />
            <label
              className={`absolute left-10 transition-all duration-200 ${
                passwordFocused || formData.password
                  ? "top-0 text-xs text-blue-500 bg-white px-1 -translate-y-1/2"
                  : "top-1/2 text-gray-400 font-extralight -translate-y-1/2"
              }`}
            >
              Password
            </label>
            <button
              type="button"
              className="absolute text-sm right-3 flex items-center gap-1 text-gray-500 hover:text-gray-700"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <>
                  <RiEyeOffLine size={16} />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <RiEyeLine size={16} />
                  <span>Show</span>
                </>
              )}
            </button>
          </div>
          {errors.password && (
            <div className="text-red-500 text-sm mt-1 ml-4">
              {errors.password}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-400"
            } focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Sign Up"}
          </button>
          {/* Sign In Link */}
          <div className="mt-2 text-center">
            <span className="text-sm text-gray-600">
              Already have an account? &nbsp;
            </span>
            <Link to="/login" className="text-sm text-blue-500 hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignupPage;
