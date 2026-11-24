import { getLogs } from "@/api/getLogs.ts";

export const historyLoader = () => {
  return { history: getLogs() };
};
