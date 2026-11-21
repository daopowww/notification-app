import express from "express";
import { notificationRequest } from "@notification-app/shared";
import { isNodeMailerError } from "./utils/index.ts";
import { transporter } from "./tranporter.ts";
import { logs } from "./data/index.ts";
import multer from "multer";
import fs from "node:fs";

const app = express();
const upload = multer({ dest: "./uploads/" });
const port = 3000;

app.use(express.json());

app.post(
  "/api/notifications",
  upload.single("attachment"),
  async (req, res) => {
    const safeData = notificationRequest.safeParse(req.body);

    if (!safeData.success) {
      console.error("Неверные данные");

      if (req.file?.path) {
        fs.unlink(req.file?.path, () => {});
      }

      return res.status(400).json({ errors: safeData.error.issues });
    }

    try {
      console.log("Отправка письма");

      const { recipient, title, message } = safeData.data;

      const info = await transporter.sendMail({
        from: `Отправитель ${process.env.SMTP_USER}`,
        to: `${recipient}`,
        subject: title,
        text: message,
        ...(req.file?.path && {
          attachments: [
            {
              filename: req.file.originalname,
              path: req.file.path,
            },
          ],
        }),
        signal: AbortSignal.timeout(30_000),
      });

      logs.push({
        createdAt: new Date(),
        channel: "email",
        recipient,
        status: "accepted",
      });

      console.log("Письмо отправлено", info.messageId);
    } catch (error) {
      logs.push({
        createdAt: new Date(),
        channel: "email",
        recipient: safeData.data.recipient,
        status: "failed",
      });

      if (isNodeMailerError(error)) {
        if (error.code === "EAUTH") {
          console.error("Ошибка входа:", error.message);

          return res.status(500).json({
            message: "Не удалось отправить письмо",
          });
        }

        if (error.code === "EABORT" || error.code === "ETIMEDOUT") {
          console.log("Время ожидания вышло:", error.message);

          return res
            .status(504)
            .json({ message: "Превышено время ожидания отправки" });
        }

        console.error("Ошибка при отправке:", error.message);
        console.error("Код ошибки:", error.code);

        if (error.responseCode) {
          console.error("SMTP ответ:", error.responseCode, error.response);
        }
        return res.status(500).json({ message: "Не удалось отправить письмо" });
      }

      return res.status(500).json({ message: "Критическая ошибка запроса" });
    } finally {
      if (req.file?.path) {
        fs.unlink(req.file?.path, () => {});
      }
    }

    return res
      .status(200)
      .json({ message: "Письмо принято почтовым сервисом" });
  },
);

app.get("/api/notifications/history", (req, res) => {
  res.status(200).json({ logs: [...logs].reverse() });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
