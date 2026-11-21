import { type NodemailerError } from "nodemailer";

export const isNodeMailerError = (error: unknown): error is NodemailerError => {
  return (
    error instanceof Error &&
    ("code" in error || "responseCode" in error || "command" in error)
  );
};
