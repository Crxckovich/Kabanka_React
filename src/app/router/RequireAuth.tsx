import { Navigate, useLocation } from "react-router-dom";
import type { JSX } from "react";
import { getRouteAuth, getRouteForbidden } from "@/shared/const/router";
import { type ERole } from "@/entities/User";
import { useAuthStore, useUserStore } from "@/app/providers/StoreProvider/StoresRegister.ts";

interface RequireAuthProps {
  children: JSX.Element;
  roles?: ERole[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const location = useLocation();

  if (!authStore.isAuth) {
    return <Navigate to={getRouteAuth()} state={{ from: location }} replace />;
  }

  const hasRequiredRoles = !roles?.length || roles.includes(userStore.user.roleId);

  if (!hasRequiredRoles) {
    return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
  }

  return children;
}
