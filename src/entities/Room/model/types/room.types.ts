export interface IRoom {
  id: string
  name: string
  ownerId: number | null
  isPublic: boolean
  inviteCode: string | null
  inviteCodeExpiresAt: Date | null
  isTemporary: boolean
  maxStatuses: number
  maxTasksPerStatus: number
  createdAt: Date
  updatedAt: Date
}
