import { makeAutoObservable } from "mobx"
import type { RootStore } from "@/app/providers/StoreProvider/RootStore.ts"
import type { ITask } from "@/entities/Task/model/types/task.types"

export class TaskManageStore {
  editingTaskId: string | null = null
  newTaskTitle = ""
  newTaskDescription = ""

  constructor(private root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setTitle(text: string) {
    this.newTaskTitle = text
  }

  setDescription(text: string) {
    this.newTaskDescription = text
  }

  openEdit(task: ITask) {
    this.editingTaskId = task.id
    this.newTaskTitle = task.title
    this.newTaskDescription = task.description || ""
  }

  closeEdit() {
    this.editingTaskId = null
    this.newTaskTitle = ""
    this.newTaskDescription = ""
  }

  // TODO: payload только там где что то обновляем (ИЗМЕНИТЬ)
  async createTask(statusId: string) {
    if (!this.newTaskTitle.trim()) return

    try {
      const websocket = this.root.roomDetailsStore.websocket

      websocket.send({
        type: "create-task",
        payload: {
          statusId,
          title: this.newTaskTitle.trim(),
          description: this.newTaskDescription.trim() || null,
        },
      })

      this.newTaskTitle = "" // TODO: setName
      this.newTaskDescription = ""
    } catch (e) {
      console.error("Ошибка создания задачи:", e)
    }
  }

  async updateTask() {
    if (!this.editingTaskId || !this.newTaskTitle.trim()) return

    try {
      const websocket = this.root.roomDetailsStore.websocket

      websocket.send({
        type: "update-task",
        taskId: this.editingTaskId,
        payload: {
          title: this.newTaskTitle.trim(),
          description: this.newTaskDescription.trim() || null,
        },
      })

      this.editingTaskId = null
      this.newTaskTitle = ""
      this.newTaskDescription = ""
    } catch (e) {
      console.error("Ошибка обновления задачи:", e)
    }
  }

  async moveTask(taskId: string, newStatusId: string, targetIndex: number) {
    console.log("[TaskManageStore] moveTask called:", {
      taskId,
      newStatusId,
      targetIndex,
    })

    if (!taskId || !newStatusId) return

    try {
      const websocket = this.root.roomDetailsStore.websocket
      const currentTasks = this.root.roomDetailsStore.roomData?.tasks || []

      const oldStatusId = currentTasks.find((t) => t.id === taskId)?.statusId
      if (!oldStatusId) return

      if (oldStatusId === newStatusId) {
        // Reorder внутри
        const tasksInStatus = currentTasks
          .filter((t) => t.statusId === newStatusId)
          .sort((a, b) => a.order - b.order)

        const filtered = tasksInStatus.filter((t) => t.id !== taskId)
        const orderedIds = [
          ...filtered.slice(0, targetIndex).map((t) => t.id),
          taskId,
          ...filtered.slice(targetIndex).map((t) => t.id),
        ]

        websocket.send({
          type: "reorder-tasks",
          payload: { statusId: newStatusId, orderedIds },
        })
      } else {
        // Move между статусами
        const orderedOld = currentTasks
          .filter((t) => t.statusId === oldStatusId && t.id !== taskId)
          .sort((a, b) => a.order - b.order)
          .map((t) => t.id)

        const tasksInNew = currentTasks
          .filter((t) => t.statusId === newStatusId)
          .sort((a, b) => a.order - b.order)

        const orderedNew = [
          ...tasksInNew.slice(0, targetIndex).map((t) => t.id),
          taskId,
          ...tasksInNew.slice(targetIndex).map((t) => t.id),
        ]

        websocket.send({
          type: "move-task",
          payload: { taskId, newStatusId, oldStatusId, orderedOld, orderedNew },
        })
      }
    } catch (e) {
      console.error("[TaskManageStore] moveTask error:", e)
    }
  }

  async deleteTask(taskId: string) {
    try {
      const websocket = this.root.roomDetailsStore.websocket

      websocket.send({
        type: "delete-task",
        taskId,
      })
    } catch (e) {
      console.error("Ошибка удаления задачи:", e)
    }
  }
}
