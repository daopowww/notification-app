import { createBrowserRouter, Navigate } from "react-router";
import { NotificationPage } from "@/components/pages";
import { HistoryPage } from "@/components/pages";
import { Layout } from "@/components/Layout";
import { ROUTES } from "@/router/routes.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.NOTIFICATIONS} replace />,
      },
      {
        path: ROUTES.NOTIFICATIONS,
        Component: NotificationPage,
      },
      {
        path: ROUTES.HISTORY,
        Component: HistoryPage,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.NOTIFICATIONS} replace />,
  },
]);
