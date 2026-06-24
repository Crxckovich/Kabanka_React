import { useCallback, useState } from "react"
import { useAuthStore } from "@/app/providers/StoreProvider/StoresRegister.ts"
import { observer } from "mobx-react-lite"
import { Input } from "@/shared/ui/Input"
import { Button } from "@/shared/ui/Button"
import { useNavigate } from "react-router-dom"
import { getRouteMain } from "@/shared/const/router.ts"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card.tsx"

export interface ISignUpFormProps {
  onFormChange?: () => void
}

export const SignUpForm = observer(({ onFormChange }: ISignUpFormProps) => {
  const authStore = useAuthStore()
  const navigate = useNavigate()

  const [retryPassword, setRetryPassword] = useState("")

  const handleSubmit = useCallback(() => {
    authStore.signup().then(() => navigate(getRouteMain()))
  }, [authStore, navigate])

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
      </CardHeader>
      <CardContent className={"mb-4"}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-6"
        >
          <div>
            <Input
              onChange={(e) => authStore.setName(e.target.value)}
              value={authStore.name}
              type="text"
              placeholder="Имя"
              required
            />
          </div>

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

          <div>
            <Input
              onChange={(e) => setRetryPassword(e.target.value)}
              value={retryPassword}
              type="password"
              placeholder="Повторите пароль"
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          size={"lg"}
          className={"w-full"}
          type="submit"
          onClick={handleSubmit}
          disabled={
            !authStore.email ||
            !authStore.password ||
            !authStore.name ||
            !retryPassword
          }
        >
          Зарегистрироваться
        </Button>

        <Button
          type="button"
          className={"w-full"}
          variant={"link"}
          onClick={onFormChange}
        >
          Уже есть аккаунт?
        </Button>
      </CardFooter>
    </Card>
  )
})
