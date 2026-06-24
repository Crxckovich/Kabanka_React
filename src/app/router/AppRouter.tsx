import {Route} from "react-router";
import {Routes} from "react-router-dom";
import { routeConfig } from "./config/routerConfig.tsx";
import {memo, Suspense, useCallback} from "react";
import type { AppRoutesProps } from "./types/router.types";
import { PageLoader } from "@/shared/ui/PageLoader";
import { RequireAuth } from "./RequireAuth";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth roles={route.roles}>{element}</RequireAuth>
                    ) : (
                        element
                    )
                }
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);