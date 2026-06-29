import { makeAutoObservable, runInAction } from "mobx"
import { handleAxiosError } from "@/shared/api/handleAxiosError.ts"
import type { IRoomWithRelations } from "@/pages/RoomPage/types/roomPage.types.ts"
import { RoomService } from "@/entities/Room/model/services/RoomService.ts"

export class UserRoomsStore {
  roomsData: IRoomWithRelations[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  async fetchUserRooms() {
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

export default new UserRoomsStore()
