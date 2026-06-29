import { observer } from "mobx-react-lite"
import TaskCard from "./TaskCard"
import type { ITask } from "../model/types/task.types"
import { useTaskManageStore } from "@/app/providers/StoreProvider/StoresRegister.ts"
import {
  cloneElement,
  type ReactElement,
  useState,
  type DragEvent,
} from "react"

interface ITaskListProps {
  tasksData: ITask[]
  statusId: string
  contextMenu?: ReactElement<{ taskData: ITask }>
}

export const TaskList = observer(
  ({ tasksData, statusId, contextMenu }: ITaskListProps) => {
    const taskManageStore = useTaskManageStore()
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

    const handleDragStart = (e: DragEvent, taskId: string) => {
      e.dataTransfer.setData("text/plain", taskId)
      e.dataTransfer.effectAllowed = "move"
    }

    const handleDragOver = (e: DragEvent, index: number) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = "move"
      if (dragOverIndex !== index) setDragOverIndex(index)
    }

    const handleDragLeave = () => setDragOverIndex(null)

    // Drop на задачу (вставка перед ней)
    const handleDropOnTask = (e: DragEvent, targetIndex: number) => {
      e.preventDefault()
      e.stopPropagation()
      const draggedId = e.dataTransfer.getData("text/plain")
      if (!draggedId) return

      console.log("[TaskList] Drop on task index:", {
        draggedId,
        targetIndex,
        statusId,
      })
      taskManageStore.moveTask(draggedId, statusId, targetIndex)
      setDragOverIndex(null)
    }

    // Drop в конец списка
    const handleDropOnEnd = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const draggedId = e.dataTransfer.getData("text/plain")
      if (!draggedId) return

      console.log("[TaskList] Drop on END of column:", { draggedId, statusId })
      taskManageStore.moveTask(draggedId, statusId, tasksData.length)
      setDragOverIndex(null)
    }

    return (
      <div className="flex h-full flex-col gap-3 py-1">
        {tasksData.map((task, index) => (
          <TaskCard
            key={task.id}
            taskData={task}
            contextMenu={
              contextMenu
                ? cloneElement(contextMenu, { taskData: task })
                : undefined
            }
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDropOnTask(e, index)}
            isDragOver={dragOverIndex === index}
          />
        ))}

        {/* Пустая зона в конце для drop в конец колонки */}
        <div
          className="min-h-[80px] flex-1 rounded-xl border-2 border-dashed border-muted-foreground/30"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnEnd}
          onDragLeave={handleDragLeave}
        />
      </div>
    )
  }
)

export default TaskList
