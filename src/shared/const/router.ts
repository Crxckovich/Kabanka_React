export enum AppRoutes {
  MAIN = "main",
  AUTH = "auth",
  FORBIDDEN = "forbidden",
  NOT_FOUND = "not_found",
}

export const getRouteMain = () => "/";
export const getRouteAuth = () => "/auth";
export const getRouteForbidden = () => "/forbidden";
export const getRouteNotFound = () => "*";
