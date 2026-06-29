import {
  AppRoutes,
  getRouteAuth,
  getRouteForbidden,
  getRouteMain,
  getRouteNotFound,
  getRouteRoom,
} from "@/shared/const/router.ts"
import type { AppRoutesProps } from "../types/router.types"
import { AuthPage } from "@/pages/AuthPage"
import { MainPage } from "@/pages/MainPage"
import { ForbiddenPage } from "@/pages/ForbiddenPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { RoomPage } from "@/pages/RoomPage"

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.AUTH]: {
    path: getRouteAuth(),
    element: <AuthPage />,
  },
  [AppRoutes.ROOM]: {
    path: getRouteRoom(":id"),
    element: <RoomPage />,
  },
  [AppRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },
} as const
