import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.FRONTEND_URL || "http://localhost:3000";
// emailTemplates.js
const emailTemplates = {
  // Verification Code Email Template
  getVerificationCodeEmail: (userName, verificationCode) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
        <h2 style="color: #4A90E2;">Verification Code</h2>
        <p>Hello ${userName},</p>
        <p>Your verification code is:</p>
        <h3 style="background-color: #4A90E2; color: white; padding: 10px; text-align: center; border-radius: 5px;">${verificationCode}</h3>
        <p>Please enter this code to verify your account. This code will expire in 10 minutes.</p>
        <p>If you did not request this code, please ignore this email or contact support if you have any concerns.</p>
        <p>Best regards,<br/>Your Company Name</p>
        <hr/>
        <p style="font-size: 0.8em; color: #777;">This is an automated message, please do not reply directly to this email.</p>
      </div>
    `;
  },

  // Success Email Template
  getSuccessEmail: (userName, successMessage) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
        <h2 style="color: #4A90E2;">Success!</h2>
        <p>Hello ${userName},</p>
        <p>${successMessage}</p>
        <p>Thank you for using our services. If you have any questions or need further assistance, please feel free to contact us.</p>
        <p>Best regards,<br/>Your Company Name</p>
        <hr/>
        <p style="font-size: 0.8em; color: #777;">This is an automated message, please do not reply directly to this email.</p>
      </div>
    `;
  },

  getPasswordResetEmail: (user, resetToken) => {
    // Password Reset Email Template
    const BASE_URL = process.env.FRONTEND_URL || "http://localhost:3000";
    const resetLink = `${BASE_URL}/reset-password/${user._id.toString()}/${resetToken}`;
    return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
      <h2 style="color: #4A90E2;">Password Reset Request</h2>
      <p>Hello ${user.username},</p>
      <p>We received a request to reset your password. Please click the following link to reset your password:</p>
      <p style="text-align: center;">
        <a href="${resetLink}" style="background-color: #4A90E2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      </p>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request a password reset, please ignore this email or contact support if you have any concerns.</p>
      <p>Best regards,<br/>Your Company Name</p>
    </div>
    `;
  },

  // Welcome Email Template
  getWelcomeEmail: (userName) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
        <h2 style="color: #4A90E2;">Welcome to Our Platform!</h2>
        <p>Hello ${userName},</p>
        <p>Thank you for registering with us. We're excited to have you on board!</p>
        <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <p>Best regards,<br/>Your Company Name</p>
        <hr/>
        <p style="font-size: 0.8em; color: #777;">This is an automated message, please do not reply directly to this email.</p>
      </div>
    `;
  },
};

export default emailTemplates;
