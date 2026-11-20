import z from "zod";

export const notificationRequest = z.object({
  title: z.string("Сообщение должно быть числом").min(1, "Минимум 1 символ"),
  message: z.string("Сообщение должно быть числом").min(1, "Минимум 1 символ"),
  recipient: z
    .string("Сообщение должно быть числом")
    .min(1, "Минимум 1 символ")
    .email({
      pattern:
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
    }),
});

export type NotificationRequest = z.infer<typeof notificationRequest>;
