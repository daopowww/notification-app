import { notificationRequest } from "@notification-app/shared";
import { z } from "zod";

export const notificationRequestWithAttachment = notificationRequest.extend({
  attachment: z.instanceof(File).optional(),
});

export type NotificationRequestWithAttachmentType = z.infer<
  typeof notificationRequestWithAttachment
>;
