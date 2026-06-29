import { Routes, Route } from "react-router-dom"
import { memo, Suspense, useCallback } from "react"
import { routeConfig } from "./config/routerConfig"
import type { AppRoutesProps } from "./types/router.types"
import { PageLoader } from "@/shared/ui/PageLoader"
import { RequireAuth } from "./RequireAuth"
import LoginLayout from "@/shared/layouts/LoginLayout"
import MainLayout from "@/shared/layouts/MainLayout"
import { Header } from "@/widgets/Header"
import {
  getRouteAuth,
  getRouteForbidden,
  getRouteNotFound,
} from "@/shared/const/router.ts"

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    )

    if (
      route.path === getRouteAuth() ||
      route.path === getRouteForbidden() ||
      route.path === getRouteNotFound()
    ) {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<LoginLayout>{element}</LoginLayout>}
        />
      )
    }

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <MainLayout header={<Header />}>
            {route.authOnly ? (
              <RequireAuth roles={route.roles}>{element}</RequireAuth>
            ) : (
              element
            )}
          </MainLayout>
        }
      />
    )
  }, [])

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
}

export default memo(AppRouter)
