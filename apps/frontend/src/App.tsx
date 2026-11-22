import { Toaster } from "@/components/ui/toast.tsx";
import { RouterProvider } from "react-router";
import { router } from "@/router";

export const App = () => {
  return (
    <Toaster>
      <RouterProvider router={router} />
    </Toaster>
  );
};
