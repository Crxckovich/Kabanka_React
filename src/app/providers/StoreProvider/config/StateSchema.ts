import type { AuthStore } from "@/features/Auth/model/store/authStore.ts"
import type { UserStore } from "@/entities/User/model/store/userStore.ts"
import type { RoomStore } from "@/features/RoomOptions/model/store/roomStore.ts"
import type { RoomFormStore } from "@/features/RoomForm/model/store/roomFormStore.ts"
import type { RoomDetailsStore } from "@/pages/RoomPage/model/store/roomDetailsStore.ts"
import { StatusStore } from "@/features/StatusManage/model/store/statusStore.ts"
import type { UserRoomsStore } from "@/pages/MainPage/model/store/userRoomsStore.ts"
import { MemberOptionsStore } from "@/features/MemberOptions/model/store/memberOptionsStore.ts"
import { TaskManageStore } from "@/features/TaskManage/model/store/taskManageStore.ts"

export interface IStateSchema {
  userStore: UserStore
  authStore: AuthStore

  // Асинхронные сторы
  roomStore: RoomStore
  roomFormStore: RoomFormStore
  roomDetailsStore: RoomDetailsStore
  statusStore: StatusStore
  userRoomsStore: UserRoomsStore
  memberOptionsStore: MemberOptionsStore
  taskManageStore: TaskManageStore
}

export type StateSchemaKey = keyof IStateSchema
