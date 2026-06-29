import { makeAutoObservable } from "mobx"
import type { IStateSchema, StateSchemaKey } from "./config/StateSchema"
import { UserStore } from "@/entities/User/model/store/userStore.ts"
import { AuthStore } from "@/features/Auth/model/store/authStore.ts"
import { RoomStore } from "@/features/RoomOptions/model/store/roomStore.ts"
import { RoomFormStore } from "@/features/RoomForm/model/store/roomFormStore"
import { RoomDetailsStore } from "@/pages/RoomPage/model/store/roomDetailsStore.ts"
import { StatusStore } from "@/features/StatusManage/model/store/statusStore.ts"
import { UserRoomsStore } from "@/pages/MainPage/model/store/userRoomsStore.ts"
import { MemberOptionsStore } from "@/features/MemberOptions/model/store/memberOptionsStore.ts"
import { TaskManageStore } from "@/features/TaskManage/model/store/taskManageStore.ts"

export class RootStore implements IStateSchema {
  userStore: UserStore
  authStore: AuthStore
  roomStore: RoomStore
  userRoomsStore: UserRoomsStore
  roomFormStore: RoomFormStore
  roomDetailsStore: RoomDetailsStore
  statusStore: StatusStore
  memberOptionsStore: MemberOptionsStore
  taskManageStore: TaskManageStore

  constructor() {
    this.userStore = new UserStore()
    this.authStore = new AuthStore(this)
    this.roomStore = new RoomStore(this)
    this.userRoomsStore = new UserRoomsStore()
    this.roomFormStore = new RoomFormStore()
    this.roomDetailsStore = new RoomDetailsStore()
    this.statusStore = new StatusStore(this)
    this.memberOptionsStore = new MemberOptionsStore(this)
    this.taskManageStore = new TaskManageStore(this)
    makeAutoObservable(this, {}, { autoBind: true })
  }

  getStore<K extends StateSchemaKey>(key: K): IStateSchema[K] {
    const store = (this as any)[key]
    if (store === undefined) {
      throw new Error(`Store "${String(key)}" is not registered yet`)
    }
    return store
  }
}
