import type { RootStore } from "@/app/providers/StoreProvider/RootStore.ts"
import { makeAutoObservable } from "mobx"

export class StatusStore {
  isCreating = false
  newStatusName = ""

  constructor(private readonly root: RootStore) {
    makeAutoObservable(this)
  }

  setNewStatusName(name: string) {
    this.newStatusName = name
  }

  async create(roomId: string) {
    if (!this.newStatusName.trim() || this.isCreating) return
    if (!roomId) {
      console.warn("roomId не передан")
      return
    }

    this.isCreating = true

    try {
      const websocket = this.root.roomDetailsStore.websocket

      websocket.send({
        type: "create-status",
        roomId,
        name: this.newStatusName.trim(),
      })

      this.newStatusName = ""
    } catch (e) {
      console.error("Failed to send create-status:", e)
    } finally {
      this.isCreating = false
    }
  }

  async updateStatus(statusId: string, newName: string) {
    if (!statusId || !newName?.trim()) return

    try {
      const websocket = this.root.roomDetailsStore.websocket

      websocket.send({
        type: "update-status",
        statusId,
        payload: { name: newName.trim() },
      })
    } catch (e) {
      console.error("Ошибка обновления статуса:", e)
    }
  }

  async delete(statusId: string) {
    if (!statusId) {
      console.warn("statusId не передан")
      return
    }

    try {
      const websocket = this.root.roomDetailsStore.websocket

      websocket.send({
        type: "delete-status",
        statusId,
      })
    } catch (e) {
      throw new Error("Ошибка удаления статуса", e)
    }
  }

  async reorderStatuses(orderedIds: string[]) {
    try {
      const websocket = this.root.roomDetailsStore.websocket

      websocket.send({
        type: "reorder-statuses",
        orderedIds,
      })
    } catch (e) {
      throw new Error("Ошибка переноса статуса", e)
    }
  }
}
