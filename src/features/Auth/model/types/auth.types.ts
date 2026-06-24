import type {IUser} from "@/entities/User";

export interface IAuthRes {
    accessToken: string
    refreshToken: string
    user: IUser
}