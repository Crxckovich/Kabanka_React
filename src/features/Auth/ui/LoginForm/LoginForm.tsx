import { useCallback } from "react"
import { useAuthStore } from "@/app/providers/StoreProvider/StoresRegister.ts"
import { observer } from "mobx-react-lite"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import { useNavigate } from "react-router-dom"
import { getRouteMain } from "@/shared/const/router.ts"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card.tsx"

export interface ILoginFormProps {
  onFormChange?: () => void
}

export const LoginForm = observer(({ onFormChange }: ILoginFormProps) => {
  const authStore = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = useCallback(() => {
    authStore.login().then(() => {
      if (authStore.isAuth) {
        navigate(getRouteMain())
      }
    })
  }, [authStore, navigate])

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Вход в аккаунт</CardTitle>
      </CardHeader>
      <CardContent className={"mb-4"}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-6"
        >
          <div>
            <Input
              onChange={(e) => authStore.setEmail(e.target.value)}
              value={authStore.email}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <Input
              onChange={(e) => authStore.setPassword(e.target.value)}
              value={authStore.password}
              type="password"
              placeholder="Пароль"
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          size={"lg"}
          className={"w-full"}
          onClick={handleSubmit}
          disabled={!authStore.email || !authStore.password}
        >
          Войти
        </Button>

        <Button
          type="button"
          className={"w-full"}
          variant="link"
          onClick={onFormChange}
        >
          Ещё не зарегистрированы?
        </Button>
      </CardFooter>
    </Card>
  )
})
