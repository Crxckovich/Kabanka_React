import { useStore } from "@/app/providers/StoreProvider/lib/hooks/useStore.ts"

export const useAuthStore = () => useStore().authStore
export const useUserStore = () => useStore().userStore
export const useRoomStore = () => useStore().roomStore
export const useRoomFormStore = () => useStore().roomFormStore
