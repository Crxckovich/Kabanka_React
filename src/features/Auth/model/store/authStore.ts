import { type IUser } from "@/entities/User"
import { makeAutoObservable, runInAction } from "mobx"
import { AuthService } from "@/features/Auth"
import { handleAxiosError } from "@/shared/api/handleAxiosError.ts"
import axios from "axios"
import type { IAuthRes } from "../types/auth.types.ts"
import type { RootStore } from "@/app/providers/StoreProvider/RootStore.ts"
import type { UserStore } from "@/entities/User/model/store/userStore.ts"
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localStorage.ts"

export class AuthStore {
  isAuth = false
  isLoading = true

  name = ""
  email = ""
  password = ""

  private initPromise: Promise<void> | null = null

  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  private get userStore(): UserStore {
    return this.root.getStore("userStore")
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  setName(email: string) {
    this.name = email
  }

  setEmail(email: string) {
    this.email = email
  }

  setPassword(password: string) {
    this.password = password
  }

  resetForm() {
    this.name = ""
    this.email = ""
    this.password = ""
  }

  async initAuth(): Promise<void> {
    if (this.isAuth) {
      return
    }

    if (this.initPromise) {
      return this.initPromise
    }
    this.setLoading(true)

    this.initPromise = (async () => {
      try {
        const response = await axios.get<IAuthRes>(
          "http://localhost:5000/api/refresh",
          { withCredentials: true }
        )

        localStorage.setItem(
          USER_LOCALSTORAGE_KEY,
          JSON.stringify(response.data)
        )

        runInAction(() => {
          this.setAuth(true)
          this.userStore.setUser(response.data.user)
        })
      } catch {
        localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        runInAction(() => {
          this.setAuth(false)
          this.userStore.setUser({} as IUser)
        })
      } finally {
        runInAction(() => {
          this.setLoading(false)
          this.initPromise = null
        })
      }
    })()

    return this.initPromise
  }

  async signup() {
    if (!this.email || !this.name || !this.password) return

    try {
      const response = await AuthService.signup(
        this.name,
        this.email,
        this.password
      )
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      this.setAuth(true)
      this.userStore.setUser(response.data.user)
      this.resetForm()
    } catch (e) {
      handleAxiosError(e)
    }
  }

  async login() {
    if (!this.email || !this.password) return

    try {
      const response = await AuthService.login(this.email, this.password)
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      this.setAuth(true)

      this.userStore.setUser(response.data.user)
      this.resetForm()
    } catch (e) {
      handleAxiosError(e)
    }
  }

  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
      this.setAuth(false)
      this.userStore.setUser({} as IUser)
    } catch (e) {
      handleAxiosError(e)
    }
  }
}
