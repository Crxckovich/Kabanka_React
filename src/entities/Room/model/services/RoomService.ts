import type { AxiosResponse } from "axios"
import { $api } from "@/shared/api/api.ts"
import type { IRoom } from "@/entities/Room/model/types/room.types.ts"

export class RoomService {
  static async fetchUserRooms(): Promise<AxiosResponse<IRoom[]>> {
    return $api.get<IRoom[]>("/rooms")
  }
}

export default new RoomService()
