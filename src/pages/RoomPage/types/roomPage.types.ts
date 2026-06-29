import type { IRoom } from "@/entities/Room"
import type { IMemberWithPermissions } from "@/entities/RoomMember"
import type { IStatus } from "@/entities/Status/model/types/status.types"
import type { ITask } from "@/entities/Task/model/types/task.types.ts"

export interface IRoomWithRelations extends IRoom {
  members: IMemberWithPermissions[]
  statuses: IStatus[]
  tasks: ITask[]
}
