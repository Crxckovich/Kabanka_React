import { makeAutoObservable } from "mobx"
import { handleAxiosError } from "@/shared/api/handleAxiosError.ts"
import RoomFormService from "../services/RoomFormService/RoomFormService"
import type { IRoom } from "@/entities/Room"

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

  async createRoom(): Promise<{ room: IRoom; guestId?: string } | null> {
    if (!this.roomName.trim()) return null

    try {
      const room = await RoomFormService.createRoom(this.roomName)
      this.roomName = ""
      return room
    } catch (e) {
      handleAxiosError(e)
    }
  }
}
