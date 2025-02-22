import transport from "./mailtrap.config.js";
import emailTemplates from "./emailTemplates.js";
import { errorHandler } from "../utils/errorHandler.js";

const sender = {
  address: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationCodeEmail = emailTemplates.getVerificationCodeEmail(
    "User", // Replace with the user's name if available
    verificationToken
  );

  try {
    const mailOptions = {
      from: sender,
      to: email,
      subject: "Verify Your Account",
      html: verificationCodeEmail,
      category: "Verification Email",
    };

    const info = await transport.sendMail(mailOptions);
    // console.log("Verification email sent successfully:", info);
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw errorHandler(500, "Failed to send verification email");
  }
};

export const sendPasswordResetEmail = async (user, resetToken) => {
  const passwordResetEmail = emailTemplates.getPasswordResetEmail(
    user,
    resetToken
  );

  console.log("Password reset email:", passwordResetEmail);

  try {
    const mailOptions = {
      from: sender,
      to: user.email,
      subject: "Password Reset Request",
      html: passwordResetEmail,
      category: "Password Reset Email",
    };

    const info = await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw errorHandler(500, "Failed to send password reset email");
  }
};

export const sendWelcomeEmail = async (email, userName) => {
  const recipients = [email];

  try {
    await transport.sendMail({
      from: sender,
      to: recipients,
      subject: "Welcome to Our Platform!",
      html: emailTemplates.getWelcomeEmail(userName),
      template_uuid: "34ada6c9-5354-4436-9792-08bf861fcd2e",
      template_variables: {
        company_info_name: "Test_Company_info_name",
        name: userName,
        company_info_address: "Test_Company_info_address",
        company_info_city: "Test_Company_info_city",
        company_info_zip_code: "Test_Company_info_zip_code",
        company_info_country: "Test_Company_info_country",
      },
    });

    console.log("Welcome email sent successfully.");
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    throw errorHandler(500, "Failed to send welcome email");
  }
};
