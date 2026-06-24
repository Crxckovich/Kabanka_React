import type {
  IStateSchema,
  StateSchemaKey,
} from "@/app/providers/StoreProvider/config/StateSchema"
import { useStore } from "@/app/providers/StoreProvider/lib/hooks/useStore"
import { useEffect, useState, type ReactNode } from "react"
import type { RootStore } from "@/app/providers/StoreProvider/RootStore.ts"

type StoreLoader<K extends StateSchemaKey> = () => Promise<{
  default: new (root: RootStore) => IStateSchema[K]
}>

interface DynamicModuleLoaderProps {
  stores: StateSchemaKey[]
  removeAfterUnmount?: boolean
  children: ReactNode
  loaders?: Partial<Record<StateSchemaKey, StoreLoader<StateSchemaKey>>>
  fallback?: ReactNode
}

export const DynamicModuleLoader = ({
  stores,
  removeAfterUnmount = true,
  children,
  loaders = {},
  fallback = <div>Загрузка модуля...</div>,
}: DynamicModuleLoaderProps) => {
  const root = useStore()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let mounted = true

    const loadAll = async () => {
      const promises = stores.map(async (key) => {
        const loader = loaders[key]
        if (loader) {
          await root.loadStore(key, loader)
        } else {
          root.getStore(key)
        }
      })

      try {
        await Promise.all(promises)
        if (mounted) setIsLoaded(true)
      } catch (e) {
        console.error("Failed to load stores:", e)
      }
    }

    void loadAll()

    return () => {
      mounted = false
      if (removeAfterUnmount) {
        stores.forEach((key) => root.removeStore(key))
      }
    }
  }, [root, stores, removeAfterUnmount, loaders])

  if (!isLoaded) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
