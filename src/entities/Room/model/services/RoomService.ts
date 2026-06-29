import type { AxiosResponse } from "axios"
import { $api } from "@/shared/api/api.ts"
import type { IRoomWithRelations } from "@/pages/RoomPage/types/roomPage.types.ts"
import type { IRoom } from "@/entities/Room"

export class RoomService {
  static async fetchUserRooms(): Promise<AxiosResponse<IRoomWithRelations[]>> {
    return $api.get<IRoomWithRelations[]>("/rooms")
  }

  static async getInviteCode(id: string): Promise<AxiosResponse<IRoom>> {
    return $api.get<IRoom>(`/rooms/${id}/invite-code`)
  }

  static async deleteRoom(roomId: string): Promise<void> {
    return $api.delete(`/rooms/${roomId}`)
  }

  static async leaveRoom(roomId: string): Promise<void> {
    return $api.post(`/rooms/${roomId}/leave`)
  }
}

export default new RoomService()
