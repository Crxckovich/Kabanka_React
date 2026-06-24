import { Button } from "@/shared/ui/Button"
import { Link } from "react-router-dom"
import {
  useAuthStore,
  useUserStore,
} from "@/app/providers/StoreProvider/StoresRegister.ts"
import { Htag } from "@/shared/ui/Htag"
import { LogoutButton } from "@/features/Auth"

export const Header = () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  return (
    <div
      className={
        "flex w-full items-center justify-between border-b border-border bg-secondary/80 px-10 py-3"
      }
    >
      <h1>Кабанка</h1>

      {authStore.isAuth ? (
        <div className={"flex items-center gap-2"}>
          <Htag tag={"h4"}>{userStore.user.name}</Htag>
          <LogoutButton />
        </div>
      ) : (
        <Link to="/auth">
          <Button size={"lg"}>Войти</Button>
        </Link>
      )}
    </div>
  )
}

export default Header
