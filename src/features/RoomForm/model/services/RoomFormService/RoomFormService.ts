import type { IRoom } from "@/entities/Room/model/types/room.types"
import type { AxiosResponse } from "axios"
import { $api } from "@/shared/api/api.ts"

export class RoomFormService {
  async createRoom(roomName: string): Promise<AxiosResponse<IRoom>> {
    return $api.post<IRoom>("/rooms", { roomName })
  }
}

export default new RoomFormService()
