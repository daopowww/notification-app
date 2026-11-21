import z from "zod";

export const notificationRequest = z.object({
  title: z.string("Заголовок должно быть числом").min(1, "Минимум 1 символ"),
  message: z.string("Сообщение должно быть числом").min(1, "Минимум 1 символ"),
  recipient: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? `Поле ${issue.path} обязательно`
          : `Поле ${issue.path} должно быть строкой`,
    })
    .min(1, "Минимум 1 символ")
    .email("Неверный формат почты"),
});

export type NotificationRequest = z.infer<typeof notificationRequest>;
