import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";
import { errorHandler } from "../utils/errorHandler.js";

dotenv.config();

const createTransport = () => {
  try {
    const transport = nodemailer.createTransport(
      MailtrapTransport({
        token: process.env.MAILTRAP_TOKEN,
      })
    );
    return transport;
  } catch (error) {
    throw errorHandler(500, "Failed to configure Mailtrap transporter");
  }
};

const transport = createTransport();
export default transport;
