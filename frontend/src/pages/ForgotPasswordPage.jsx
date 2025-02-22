import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineMail } from "react-icons/md";
import GoogleAuthButton from "../components/GoogleAuthButton";
import Alert from "../components/Alert";
import InputField from "../components/InputField";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setAlertMessage("");

    try {
      const response = await axios.post("/api/auth/forgot-password", { email });

      setSuccess(true);
      setAlertMessage(response.data.message || "Password reset link sent!");
    } catch (error) {
      setSuccess(false);
      setAlertMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
        title="Forgot Password"
        subtitle="Enter your email to receive a reset link."
      >
        <InputField
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(!!email)}
          placeholder="Email address"
          required
          icon={MdOutlineMail}
          focused={emailFocused || !!email}
        />

        <Button loading={loading} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>

        <div className="mt-2 text-center">
          <span className="text-sm text-gray-600">
            Remembered your password? &nbsp;
          </span>
          <Link to="/signin" className="text-sm text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      </FormContainer>
    </>
  );
}

export default ForgotPasswordPage;
