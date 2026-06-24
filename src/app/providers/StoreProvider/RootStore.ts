import { makeAutoObservable, runInAction } from "mobx"
import type { IStateSchema, StateSchemaKey } from "./config/StateSchema"
import { UserStore } from "@/entities/User/model/store/userStore.ts"
import { AuthStore } from "@/features/Auth/model/store/authStore.ts"
import { RoomStore } from "@/entities/Room/model/store/roomStore.ts"
import { RoomFormStore } from "@/features/RoomForm/model/store/roomFormStore"

export class RootStore implements IStateSchema {
  userStore: UserStore
  authStore: AuthStore
  roomStore: RoomStore
  roomFormStore: RoomFormStore

  constructor() {
    this.userStore = new UserStore()
    this.authStore = new AuthStore(this)
    this.roomStore = new RoomStore()
    this.roomFormStore = new RoomFormStore()
    makeAutoObservable(this, {}, { autoBind: true })
  }

  registerStore<K extends StateSchemaKey>(
    key: K,
    storeInstance: IStateSchema[K]
  ): void {
    ;(this as any)[key] = storeInstance
  }

  removeStore<K extends StateSchemaKey>(key: K): void {
    if (this[key] !== undefined) {
      const store = (this as any)[key] as any
      if (typeof store?.dispose === "function") {
        store.dispose()
      }
      delete (this as any)[key]
    }
  }

  getStore<K extends StateSchemaKey>(key: K): IStateSchema[K] {
    const store = (this as any)[key]
    if (store === undefined) {
      throw new Error(`Store "${String(key)}" is not registered yet`)
    }
    return store
  }

  async loadStore<K extends StateSchemaKey>(
    key: K,
    loader: () => Promise<{ default: new (root: RootStore) => IStateSchema[K] }>
  ): Promise<IStateSchema[K]> {
    if ((this as any)[key] !== undefined) {
      return (this as any)[key]
    }

    const module = await loader()
    const StoreClass = module.default
    const storeInstance = new StoreClass(this)

    runInAction(() => {
      this.registerStore(key, storeInstance)
    })

    return storeInstance
  }
}
