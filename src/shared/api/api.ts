import axios from "axios"
import { USER_LOCALSTORAGE_KEY } from "../const/localStorage"
import type { IAuthRes } from "@/features/Auth/model/types/auth.types.ts"
import { createAuthRefresh } from "axios-auth-refresh"

export const $api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/api",
})

$api.interceptors.request.use((config) => {
  const storedValue = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY))

  if (storedValue) {
    try {
      config.headers.Authorization = `Bearer ${storedValue.accessToken}`
    } catch (e) {
      console.error("Ошибка парсинга токена", e)
    }
  }

  return config
})

// Функция для того чтобы не кидать кучу рефреш запросов на БЭК если токены устарели.
const refreshAuthLogic = async (failedRequest: any) => {
  try {
    const response = await axios.get<IAuthRes>(
      "http://localhost:5000/api/refresh",
      { withCredentials: true }
    )

    const newAccessToken = response.data.accessToken

    localStorage.setItem(USER_LOCALSTORAGE_KEY, newAccessToken)

    failedRequest.response.config.headers.Authorization = `Bearer ${newAccessToken}`

    return Promise.resolve()
  } catch (error) {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    return Promise.reject(error)
  }
}

createAuthRefresh($api, refreshAuthLogic, { statusCodes: [401] })
