import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { NotificationForm } from "@/components/NotificationForm";

export const NotificationPage = () => {
  return (
    <main>
      <Card className="gap-5 py-5">
        <CardHeader className="gap-0 border-b">
          <CardTitle className="text-2xl">
            <h1>Новое письмо</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NotificationForm />
        </CardContent>
      </Card>
    </main>
  );
};
