import { LogsTable } from "@/components/history/LogsTable";
import { Card, CardContent } from "@/components/ui/card.tsx";
import type { LogType } from "@notification-app/shared";

type HistoryResultSectionProps = {
  logs: LogType[] | null;
};

export const HistoryResultSection = ({ logs }: HistoryResultSectionProps) => {
  return (
    <Card>
      <CardContent>
        <LogsTable logs={logs} />
      </CardContent>
    </Card>
  );
};
