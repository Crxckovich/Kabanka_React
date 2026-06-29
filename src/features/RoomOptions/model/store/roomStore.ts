import { makeAutoObservable } from "mobx"
import { handleAxiosError } from "@/shared/api/handleAxiosError.ts"
import type { RootStore } from "@/app/providers/StoreProvider/RootStore.ts"
import { RoomService } from "@/entities/Room/model/services/RoomService.ts"

export class RoomStore {
  newRoomName = ""

  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setNewRoomName(newRoomName: string) {
    this.newRoomName = newRoomName
  }

  async updateRoomName() {
    if (!this.newRoomName || !this.root.roomDetailsStore.roomData) return
    if (this.newRoomName === this.root.roomDetailsStore.roomData.name) return

    try {
      const websocket = this.root.roomDetailsStore.websocket

      websocket.send({
        type: "update-room",
        payload: {
          name: this.newRoomName,
        },
      })
    } catch (e) {
      console.error("Ошибка обновления названия комнаты:", e)
    }
  }

  async deleteRoom() {
    try {
      const websocket = this.root.roomDetailsStore.websocket

      websocket.send({
        type: "delete-room",
      })
    } catch (e) {
      handleAxiosError(e)
    }
  }

  async deleteRoomHttp(roomId: string) {
    try {
      await RoomService.deleteRoom(roomId)
      await this.root.userRoomsStore.fetchUserRooms()
    } catch (e) {
      handleAxiosError(e)
    }
  }

  async leaveRoomHttp(roomId: string) {
    try {
      await RoomService.leaveRoom(roomId)
      await this.root.userRoomsStore.fetchUserRooms()
    } catch (e) {
      handleAxiosError(e)
    }
  }

  async togglePublic() {
    try {
      const websocket = this.root.roomDetailsStore.websocket

      websocket.send({
        type: "toggle-public",
        roomId: this.root.roomDetailsStore.roomData.id,
      })
    } catch (e) {
      handleAxiosError(e)
    }
  }

  async resetInviteCode(roomId: string) {
    try {
      const updatedData = await RoomService.getInviteCode(roomId)
      this.root.roomDetailsStore.setRoomData(updatedData.data)
    } catch (e) {
      handleAxiosError(e)
    }
  }
}
