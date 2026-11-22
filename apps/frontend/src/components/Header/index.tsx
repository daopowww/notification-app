import { Navigation } from "@/components/Navigation";
import { useMatch } from "react-router";
import { ROUTES } from "@/router/routes.ts";

export const Header = () => {
  const isHistory = useMatch(ROUTES.HISTORY);

  const title = isHistory ? "Истории запросов" : "Уведомления";

  return (
    <header className="w-auto px-4 py-5 flex justify-between border-b">
      <h1 className="flex items-center text-center">{title}</h1>
      <Navigation />
    </header>
  );
};
