import { makeAutoObservable, runInAction } from "mobx"
import { RoomWebSocketStore } from "./RoomWebSocketStore"
import type { IRoomWithRelations } from "@/pages/RoomPage/types/roomPage.types.ts"
import { getRouteMain } from "@/shared/const/router.ts"
import type { IRoom } from "@/entities/Room"

export class RoomDetailsStore {
  roomData: IRoomWithRelations = null
  inviteCode = ""
  isLoading = true
  guestId: string | null = null

  websocket: RoomWebSocketStore

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    this.websocket = new RoomWebSocketStore(this)
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  setGuestId(value: string) {
    this.guestId = value
  }

  setInviteCode(value: string) {
    this.inviteCode = value
  }

  setRoomData(data: Partial<IRoomWithRelations> | Partial<IRoom>) {
    this.roomData = { ...this.roomData, ...data }
  }

  updateFromWS(data: any) {
    console.log("WS Update:", data)

    if (!this.roomData) return

    runInAction(() => {
      switch (data.type) {
        case "status-created":
          if (data.payload) {
            this.roomData.statuses.push(data.payload)
            this.roomData.statuses.sort((a, b) => a.order - b.order)
          }
          break

        case "status-updated": {
          const index = this.roomData.statuses.findIndex(
            (s) => s.id === data.payload?.id
          )
          if (index !== -1) {
            this.roomData.statuses[index] = {
              ...this.roomData.statuses[index],
              ...data.payload,
            }
          }
          break
        }

        case "status-deleted":
          if (data.payload?.statusId) {
            this.roomData.statuses = this.roomData.statuses.filter(
              (s) => s.id !== data.payload.statusId
            )
          }
          break

        case "statuses-reordered": {
          if (!data.payload?.orderedIds || !this.roomData) break

          runInAction(() => {
            const orderMap = new Map<string, number>(
              data.payload.orderedIds.map((id: string, index: number) => [
                id,
                index,
              ])
            )

            this.roomData.statuses.sort((a, b) => {
              const orderA = orderMap.get(a.id) ?? Infinity
              const orderB = orderMap.get(b.id) ?? Infinity
              return (orderA as number) - (orderB as number)
            })
          })
          break
        }

        case "public-toggled":
        case "room-updated":
          if (data.payload) {
            this.setRoomData(data.payload)
          }
          break

        case "room-deleted":
          window.location.replace(getRouteMain())
          break

        // TODO: Возможно обратно отправлять запрос на удаление комнаты если юзер был админом
        case "user-left":
          if (data.payload?.memberId) {
            const leftMember = this.roomData.members.find(
              (m) => m.id === data.payload.memberId
            )

            // Гости
            if (leftMember.guestId) {
              this.roomData.members = this.roomData.members.filter(
                (m) => m.id !== leftMember.id
              )
            } else {
              // Авторизованные
              const index = this.roomData.members.findIndex(
                (m) => m.id === leftMember.id
              )
              if (index !== -1) {
                this.roomData.members[index].isOnline = false
              }
            }
          }
          break

        case "member-removed":
          if (data.payload?.memberId) {
            this.roomData.members = this.roomData.members.filter(
              (m) => m.id !== data.payload.memberId
            )
          }
          break

        case "user-joined": {
          const newMember = data.payload?.member
          if (!newMember) break

          const index = this.roomData.members.findIndex(
            (m) => m.id === newMember.id
          )

          if (index !== -1) {
            // Обновляем существующего
            this.roomData.members[index] = {
              ...this.roomData.members[index],
              ...newMember,
            }
          } else {
            // Добавляем нового
            this.roomData.members.push(newMember)
          }
          break
        }

        case "permissions-updated":
          if (data.payload?.memberId) {
            const leftMember = this.roomData.members.find(
              (m) => m.id === data.payload.memberId
            )

            if (!leftMember) return

            const index = this.roomData.members.findIndex(
              (m) => m.id === leftMember.id
            )
            if (index !== -1) {
              this.roomData.members[index].permissions =
                data.payload?.permissions
            }
          }
          break

        // Задачи (позже)
        case "task-created": {
          if (data.payload) {
            this.roomData.tasks.push(data.payload)
          }
          break
        }

        case "task-updated": {
          const taskIndex = this.roomData.tasks.findIndex(
            (t) => t.id === data.payload?.id
          )
          if (taskIndex !== -1) {
            this.roomData.tasks[taskIndex] = {
              ...this.roomData.tasks[taskIndex],
              ...data.payload,
            }
          }
          break
        }

        case "task-moved": {
          if (!data.payload?.task || !this.roomData) break

          runInAction(() => {
            const { task } = data.payload

            const index = this.roomData.tasks.findIndex((t) => t.id === task.id)
            if (index !== -1) {
              this.roomData.tasks[index] = { ...task }
            } else {
              this.roomData.tasks.push(task)
            }

            this.roomData.tasks.sort((a, b) => a.order - b.order)
          })
          break
        }

        case "tasks-reordered": {
          if (
            !data.payload?.statusId ||
            !data.payload?.orderedIds ||
            !this.roomData
          ) {
            break
          }

          runInAction(() => {
            const orderMap = new Map(
              data.payload.orderedIds.map((id: string, index: number) => [
                id,
                index,
              ])
            )

            this.roomData.tasks.forEach((task) => {
              if (task.statusId === data.payload.statusId) {
                const newOrder = orderMap.get(task.id)
                if (typeof newOrder === "number") {
                  task.order = newOrder
                }
              }
            })

            this.roomData.tasks.sort((a, b) => a.order - b.order)
          })
          break
        }

        case "task-deleted": {
          this.roomData.tasks = this.roomData.tasks.filter(
            (t) => t.id !== data.payload?.taskId
          )
          break
        }

        default:
          console.log("Необработанное WS событие:", data.type)
      }
    })
  }

  joinRoom(roomId: string, guestId?: string) {
    this.websocket.connectByRoomId(roomId, guestId)
  }

  joinRoomByInvite() {
    if (!this.inviteCode) return

    this.websocket.connectByInviteCode(this.inviteCode)
  }

  leaveRoom() {
    this.websocket.disconnect()
  }
}

export default new RoomDetailsStore()
