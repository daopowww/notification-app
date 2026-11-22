import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import type { LogType } from "@notification-app/shared";
import { formatDate } from "@/lib/utils.ts";

const formatStatus: Record<LogType["status"], string> = {
  accepted: "Принято почтовым сервисом",
  failed: "Не удалось отправить",
};

const formatChannel: Record<LogType["channel"], string> = {
  email: "Электронная почта",
};

type LogsTableProps = {
  logs: LogType[] | null;
};

export const LogsTable = ({ logs }: LogsTableProps) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Дата и время</TableHead>
            <TableHead>Канал</TableHead>
            <TableHead>Получатель</TableHead>
            <TableHead>Результат</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs?.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{formatDate(log.createdAt)}</TableCell>
              <TableCell>{formatChannel[log.channel]}</TableCell>
              <TableCell>{log.recipient}</TableCell>
              <TableCell>{formatStatus[log.status]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
