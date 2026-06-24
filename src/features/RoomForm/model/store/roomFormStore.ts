import { makeAutoObservable } from "mobx"
import { handleAxiosError } from "@/shared/api/handleAxiosError.ts"
import RoomFormService from "../services/RoomFormService/RoomFormService"

export class RoomFormStore {
  roomName = ""
  inviteCode = ""

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setRoomName(name: string) {
    this.roomName = name
  }

  setInviteCode(inviteCode: string) {
    this.inviteCode = inviteCode
  }

  async createRoom() {
    if (!this.roomName) return

    try {
      await RoomFormService.createRoom(this.roomName)
    } catch (e) {
      handleAxiosError(e)
    }
  }

  // async joinRoom(inviteCode: string) {}
}
