import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useAuthStore } from "./providers/StoreProvider/StoresRegister"
import AppRouter from "@/app/router/AppRouter.tsx"
import { PageLoader } from "@/shared/ui/PageLoader"

const App = observer(() => {
  const authStore = useAuthStore()

  useEffect(() => {
    authStore.initAuth()
  }, [authStore])

  if (authStore.isLoading) {
    return <PageLoader />
  }

  return <AppRouter />
})

export default App
