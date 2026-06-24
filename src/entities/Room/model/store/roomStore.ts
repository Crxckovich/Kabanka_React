import { makeAutoObservable, runInAction } from "mobx"
import { handleAxiosError } from "@/shared/api/handleAxiosError.ts"
import type { IRoom } from "@/entities/Room/model/types/room.types.ts"
import { RoomService } from "@/entities/Room/model/services/RoomService.ts"

export class RoomStore {
  roomsData: IRoom[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  async fetchAllUsers() {
    try {
      const res = await RoomService.fetchUserRooms()

      runInAction(() => {
        this.roomsData = res.data
      })

    } catch (e) {
      handleAxiosError(e)
    }
  }
}

export default new RoomStore()
