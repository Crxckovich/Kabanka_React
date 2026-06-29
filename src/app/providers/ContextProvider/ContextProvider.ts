import { useContext, type Context } from "react"

export const useContextProvider = <T>(context: Context<T | undefined>): T => {
  const ctx = useContext(context)

  if (ctx === undefined) {
    throw new Error("Контекст не найден.")
  }

  return ctx
}
