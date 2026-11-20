import express from "express";
import { notificationRequest } from "@notification-app/shared";
import { transporter } from "./tranporter.ts";
import nodemailer from "nodemailer";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/api/notifications", async (req, res) => {
  const safeData = notificationRequest.safeParse(req.body);

  if (!safeData.success) {
    return res.status(400).json({ errors: safeData.error.issues });
  }

  try {
    console.log("начато");
    const info = await transporter.sendMail({
      from: "Отправитель ilyaruslanovi4@gmail.com",
      to: "solovey5165@gmail.com",
      subject: "Привет из как дела",
      text: "Текстовая версия письма.",
    });

    console.log("Сообщение отправил", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Ошибка при отправке:", err);

    return res.status(500).json({ err });
  }

  return res.status(200).json("success");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
