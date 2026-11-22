import { NavLink } from "react-router";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils.ts";
import { ROUTES } from "@/router/routes.ts";

type NavigationItemProps = ComponentProps<typeof NavLink>;

const NavigationItem = ({ children, ...props }: NavigationItemProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        cn(
          "inline-flex items-center border-b-2 px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "border-foreground text-foreground"
            : "border-transparent text-muted-foreground hover:text-foreground",
        )
      }
    >
      {children}
    </NavLink>
  );
};

export const Navigation = () => {
  return (
    <ul className="flex gap-2 items-center">
      <li>
        <NavigationItem to={ROUTES.NOTIFICATIONS}>Уведомления</NavigationItem>
      </li>
      <li>
        <NavigationItem to={ROUTES.HISTORY}>История</NavigationItem>
      </li>
    </ul>
  );
};
