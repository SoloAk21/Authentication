import crypto from "crypto";

export const generatePassword = async () => {
  const randomPassword = crypto.randomBytes(8).toString("hex"); // Generate a random password

  return randomPassword; // Hash the password
};
