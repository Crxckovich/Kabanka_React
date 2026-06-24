import { $api } from "@/shared/api/api.ts";
import type { AxiosResponse } from "axios";
import type { IUser } from "../types/user.types.ts";

export class UserService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/users");
  }

  static async fetchRoles(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/roles");
  }
}

export default new UserService();
