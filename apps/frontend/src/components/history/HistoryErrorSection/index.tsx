import { Card, CardContent } from "@/components/ui/card.tsx";
import { useAsyncError } from "react-router";

export const HistoryErrorSection = () => {
  const error = useAsyncError();

  const errorMessage =
    error instanceof Error ? error.message : "Произошла неизвестная ошибка";

  return (
    <Card>
      <CardContent>{errorMessage}</CardContent>
    </Card>
  );
};
