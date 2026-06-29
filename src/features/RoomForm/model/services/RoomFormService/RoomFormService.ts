import type { IRoom } from "@/entities/Room/model/types/room.types"
import { $api } from "@/shared/api/api.ts"

export class RoomFormService {
  async createRoom(name: string): Promise<{ room: IRoom; guestId?: string }> {
    const { data } = await $api.post<{ room: IRoom; guestId?: string }>(
      "/rooms",
      {
        name,
      }
    )

    return data
  }
}

export default new RoomFormService()
