import type { AxiosResponse } from "axios"
import { $api } from "@/shared/api/api.ts"
import type { IPermissions, IRoomMember } from "@/entities/RoomMember"

export class RoomMemberService {
  static async leaveFromRoom(): Promise<AxiosResponse<IRoomMember[]>> {
    return $api.post<IRoomMember[]>("/:roomId/leave")
  }
  static async deleteRoomMember(
    roomId: string,
    memberId: string
  ): Promise<AxiosResponse<IRoomMember[]>> {
    return $api.delete<IRoomMember[]>(`/rooms/${roomId}/members/${memberId}`)
  }

  static async updatePermissions(
    roomId: string,
    memberId: string,
    data: Partial<IPermissions>
  ): Promise<AxiosResponse<IRoomMember[]>> {
    return $api.delete<IRoomMember[]>(
      `/rooms/${roomId}/members/${memberId}/permissions`,
      {
        data,
      }
    )
  }
}

export default new RoomMemberService()
