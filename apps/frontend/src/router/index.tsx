import { createBrowserRouter, Navigate } from "react-router";
import { NotificationPage } from "@/components/pages";
import { HistoryPage } from "@/components/pages";
import { Layout } from "@/components/Layout";
import { ROUTES } from "@/router/routes.ts";
import { historyLoader } from "@/router/loaders";

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
        loader: historyLoader,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.NOTIFICATIONS} replace />,
  },
]);
