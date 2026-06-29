import { Button } from "@/shared/ui/Button"
import { Link } from "react-router-dom"
import {
  useAuthStore,
  useUserStore,
} from "@/app/providers/StoreProvider/StoresRegister.ts"
import { Htag } from "@/shared/ui/Htag"
import { LogoutButton } from "@/features/Auth"
import { getRouteMain } from "@/shared/const/router.ts"

export const Header = () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  return (
    <div
      className={
        "sticky top-0 left-0 flex w-full items-center justify-between border-b border-border bg-foreground/5 px-10 py-3"
      }
    >
      <Link to={getRouteMain()}>
        <h1>Канбанка</h1>
      </Link>

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
