import type { AuthStore } from "@/features/Auth/model/store/authStore.ts"
import type { UserStore } from "@/entities/User/model/store/userStore.ts"
import type { RoomStore } from "@/entities/Room/model/store/roomStore.ts"
import type { RoomFormStore } from "@/features/RoomForm/model/store/roomFormStore.ts"

export interface IStateSchema {
  userStore: UserStore
  authStore: AuthStore

  // Асинхронные сторы
  roomStore: RoomStore
  roomFormStore?: RoomFormStore
}

export type StateSchemaKey = keyof IStateSchema
