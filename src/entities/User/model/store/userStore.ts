import type {IUser} from "@/entities/User";
import {makeAutoObservable, runInAction} from "mobx";
import {UserService} from "@/entities/User/model/services/UserService.ts";
import {handleAxiosError} from "@/shared/api/handleAxiosError.ts";

export class UserStore {
    user = {} as IUser;
    usersData: IUser[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setUser(user: IUser) {
        this.user = user;
    }


    async fetchAllUsers() {
        try {
            const res = await UserService.fetchUsers();

            runInAction(() => {
                this.usersData = res.data;
            });
        } catch (e) {
            handleAxiosError(e);
        }
    }
}