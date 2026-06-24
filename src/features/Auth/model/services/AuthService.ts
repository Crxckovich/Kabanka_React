import {$api} from "@/shared/api/api.ts";
import type { AxiosResponse } from "axios";
import type {IAuthRes} from "../types/auth.types.ts";

export class AuthService {
    static async login (email: string, password: string): Promise<AxiosResponse<IAuthRes>> {
        return $api.post<IAuthRes>("/login", {email, password})
    }

    static async signup (name: string, email: string, password: string): Promise<AxiosResponse<IAuthRes>> {
        return $api.post<IAuthRes>("/signup", {name, email, password})
    }

    static async logout (): Promise<void> {
        return $api.post("/logout")
    }
}


export default new AuthService();