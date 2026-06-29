import type { AxiosResponse } from "axios"
import { $api } from "@/shared/api/api.ts"
import type { IRoomMember } from "@/entities/RoomMember/model/types/roomMember.types.ts"

export class RoomMemberService {
  static async fetchRoomMembers(
    id: string
  ): Promise<AxiosResponse<IRoomMember[]>> {
    return $api.get<IRoomMember[]>(`/rooms/${id}/members`)
  }
}

export default new RoomMemberService()
