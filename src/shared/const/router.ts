export enum AppRoutes {
  MAIN = "main",
  AUTH = "auth",
  ROOM = "room",
  FORBIDDEN = "forbidden",
  NOT_FOUND = "not_found",
}

export const getRouteMain = () => "/"
export const getRouteAuth = () => "/auth"
export const getRouteRoom = (id: string) => `/rooms/${id}`
export const getRouteForbidden = () => "/forbidden"
export const getRouteNotFound = () => "*"
