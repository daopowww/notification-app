import { NotificationPage } from "@/components/page/NotificationPage";
import { Toaster } from "@/components/ui/toast.tsx";

export const App = () => {
  return (
    <Toaster>
      <NotificationPage />
    </Toaster>
  );
};
