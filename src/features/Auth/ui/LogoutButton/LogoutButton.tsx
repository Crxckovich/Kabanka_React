import { useAuthStore } from "@/app/providers/StoreProvider/StoresRegister.ts"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import { getRouteAuth } from "@/shared/const/router.ts"
import { Button } from "@/shared/ui/Button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Logout01Icon } from "@hugeicons/core-free-icons"

export const LogoutButton = observer(() => {
  const authStore = useAuthStore()

  const navigate = useNavigate()

  const handleSubmit = useCallback(() => {
    authStore.logout().then(() => navigate(getRouteAuth()))
  }, [authStore, navigate])

  return (
    <Button variant="destructive" size="icon" onClick={handleSubmit}>
      <HugeiconsIcon icon={Logout01Icon} />
    </Button>
  )
})
