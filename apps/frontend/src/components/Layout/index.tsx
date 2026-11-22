import { Header } from "@/components/Header";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="w-full max-w-4xl mx-auto min-h-dvh flex flex-col gap-10 px-4">
      <Header />
      <Outlet />
    </div>
  );
};
