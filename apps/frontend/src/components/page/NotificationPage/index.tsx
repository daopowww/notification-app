import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { NotificationForm } from "@/components/NotificationForm";

export const NotificationPage = () => {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-2xl px-4 py-4 text-sm font-semibold sm:px-6">
          Уведомления
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <Card className="gap-0 py-0 max-w-130">
          <CardHeader className="gap-0 py-5 border-b border-border ">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              <h1>Новое письмо</h1>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <NotificationForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
