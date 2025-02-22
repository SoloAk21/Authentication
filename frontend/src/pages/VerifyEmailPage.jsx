import React, { useState, useRef } from "react";
import axios from "axios";
import { FaEnvelope } from "react-icons/fa";
import { IoMdAlert, IoMdCheckmarkCircle } from "react-icons/io";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("soloasefa6603@gmail.com"); // Replace with dynamic email if needed
  const [isResending, setIsResending] = useState(false);
  const [countdownDate, setCountdownDate] = useState(
    Date.now() + 60 * 14 * 1000
  ); // 14 minutes
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // Handles individual input changes
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits (0-9)

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handles pasting a full 6-digit code at once
  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData("text").slice(0, 6); // Get first 6 digits
    if (!/^\d{6}$/.test(pasteData)) return; // Ensure it's exactly 6 digits

    setCode(pasteData.split("")); // Set the full code

    // Focus last input
    inputRefs.current[5].focus();
  };

  const handleSubmit = async () => {
    if (code.join("").length !== 6) {
      setAlertMessage("Please enter a 6-digit code.");
      setSuccess(false);
      return;
    }

    try {
      await axios.post("/api/auth/verify-email", {
        email,
        verificationToken: code.join(""),
      });
      setAlertMessage("Email verified successfully! Redirecting to login...");
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setAlertMessage(
        error.response?.data?.message ||
          "Verification failed. Please try again."
      );
      setSuccess(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      await axios.post("/api/auth/resend-verification", { email });

      setCountdownDate(Date.now() + 60 * 14 * 1000);
      setAlertMessage("Verification code resent. Check your email.");
      setSuccess(true);
    } catch (error) {
      setAlertMessage(
        error.response?.data?.message || "Failed to resend code."
      );
      setSuccess(false);
    } finally {
      setIsResending(false);
    }
  };

  const renderer = ({ minutes, seconds, completed }) => {
    return completed ? (
      <span className="text-red-500">Expired</span>
    ) : (
      <span>
        {minutes}:{seconds}
      </span>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Alert Message */}
      {alertMessage && (
        <div
          className={`fixed top-4 right-4 p-3 mb-4 text-sm rounded-lg flex items-center transition-transform transform-gpu ease-in-out duration-300 animate-slide-in ${
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

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-4">
          <FaEnvelope className="text-blue-500 text-4xl mb-2" />
          <h2 className="text-xl font-semibold">Verify Your Email Address</h2>
          <p className="text-gray-600">
            A verification code has been sent to{" "}
            <span className="font-bold">{email}</span>
          </p>
        </div>

        {/* 6-Digit Code Input */}
        <div className="flex justify-center" onPaste={handlePaste}>
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              maxLength={1}
              className="w-10 h-12 border rounded-md text-center mx-1 text-xl font-bold"
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !code[i] && i > 0) {
                  inputRefs.current[i - 1].focus();
                }
              }}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleResendCode}
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend Code"}
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
            disabled={code.join("").length !== 6}
          >
            Verify
          </button>
        </div>

        {/* Countdown Timer */}
        <p className="text-center mt-4">
          The code will expire in{" "}
          <Countdown date={countdownDate} renderer={renderer} />.
        </p>
      </div>

      {/* Back Link */}
      <div className="mt-4 text-center">
        <a href="#" className="text-blue-500 hover:underline">
          Back to previous page
        </a>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
