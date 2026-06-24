import type { RouteProps } from "react-router-dom";
import type { ERole } from "@/entities/User";

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: ERole[];
};
