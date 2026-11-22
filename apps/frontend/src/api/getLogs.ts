import { historyResponse } from "@notification-app/shared";

export const getLogs = async () => {
  const response = await fetch("/api/notifications/history");

  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }

  return historyResponse.parse(await response.json());
};
