import { useStore } from "@/app/providers/StoreProvider/lib/hooks/useStore.ts"

export const useAuthStore = () => useStore().authStore
export const useUserStore = () => useStore().userStore
export const useRoomStore = () => useStore().roomStore
export const useUserRoomsStore = () => useStore().userRoomsStore
export const useRoomFormStore = () => useStore().roomFormStore
export const useRoomDetailsStore = () => useStore().roomDetailsStore
export const useStatusStore = () => useStore().statusStore
export const useMemberOptionsStore = () => useStore().memberOptionsStore
export const useTaskManageStore = () => useStore().taskManageStore
