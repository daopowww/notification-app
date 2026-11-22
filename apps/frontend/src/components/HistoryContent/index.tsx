import { useEffect, useState } from "react";
import type { LogType } from "@notification-app/shared";
import { getLogs } from "@/api/getLogs.ts";
import { LogsTable } from "@/components/LogsTable";

type FetchStatus = "idle" | "loading" | "error" | "success";

export const HistoryContent = () => {
  const [tableData, setData] = useState<LogType[] | null>(null);
  const [status, setStatus] = useState<FetchStatus>("idle");

  useEffect(() => {
    async function fetchLogs() {
      setStatus("loading");

      try {
        const data = await getLogs();

        setData(data.logs);

        setStatus("success");
      } catch (e) {
        setStatus("error");
        console.error(e);
      }
    }

    fetchLogs();
  }, [setStatus]);

  if (status === "idle") return <div>Сделайте запрос</div>;

  if (status === "loading") return <div>Загрузка данных...</div>;

  if (status === "error") return <div>Произошла ошибка</div>;

  if (status === "success" && tableData?.length === 0)
    return <div>История запросов пуста</div>;

  if (status === "success") return <LogsTable logs={tableData} />;

  return null;
};
