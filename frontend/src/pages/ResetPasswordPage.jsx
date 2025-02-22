import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { IoMdCheckmarkCircle, IoMdAlert } from "react-icons/io";
import { MdLockOutline } from "react-icons/md";
import axios from "axios";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import Alert from "../components/Alert";
import FormContainer from "../components/FormContainer";
import Spinner from "../components/Spinner";

function ResetPasswordPage() {
  const { token, userId } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setAlertMessage("");

    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `/api/auth/reset-password/${userId}/${token}`,
        { password }
      );

      setSuccess(true);
      setAlertMessage(response.data.message || "Password reset successful!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setSuccess(false);
      setAlertMessage(
        error.response?.data?.message ||
          error.response.data ||
          error.response.data ||
          "Something wennt wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      {alertMessage && (
        <Alert
          message={alertMessage}
          success={success}
          onDismiss={() => setAlertMessage("")}
          autoDismiss={true}
          dismissTime={3000}
        />
      )}
      <FormContainer
        onSubmit={handleSubmit}
        title="Reset Password"
        subtitle="Enter your new password below"
      >
        {/* New Password Input */}
        <PasswordInput
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(!!password)}
          placeholder="New Password"
          required
          icon={MdLockOutline}
          focused={passwordFocused || !!password}
        />

        {/* Confirm Password Input */}
        <PasswordInput
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => setConfirmPasswordFocused(true)}
          onBlur={() => setConfirmPasswordFocused(!!confirmPassword)}
          placeholder="Confirm Password"
          required
          icon={MdLockOutline}
          focused={confirmPasswordFocused || !!confirmPassword}
        />

        {/* Submit Button */}
        <Button loading={loading} disabled={loading}>
          {loading ? <Spinner /> : "Reset Password"}
        </Button>

        {/* Sign In Link */}
        <div className="mt-2 text-center">
          <span className="text-sm text-gray-600">
            Remembered your password? &nbsp;
          </span>
          <Link to="/login" className="text-sm text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      </FormContainer>
    </>
  );
}

export default ResetPasswordPage;
