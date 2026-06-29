import { observer } from "mobx-react-lite"
import StatusCard from "./StatusCard"
import type { IStatus } from "../model/types/status.types"
import { cloneElement, type ReactElement, useState } from "react"
import { CreateStatusBtn } from "@/features/StatusManage"
import { useStatusStore } from "@/app/providers/StoreProvider/StoresRegister.ts"

interface IStatusListProps {
  statusesData: IStatus[]
  addTaskButton?: ReactElement<{ statusId: string }>
}

export const StatusList = observer(
  ({ statusesData, addTaskButton }: IStatusListProps) => {
    const statusStore = useStatusStore()
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

    const handleDragStart = (e: React.DragEvent, index: number) => {
      setDraggedIndex(index)
      e.dataTransfer.effectAllowed = "move"
    }

    const handleDragOver = (e: React.DragEvent, index: number) => {
      e.preventDefault()
      if (dragOverIndex !== index) setDragOverIndex(index)
    }

    const handleDragLeave = () => setDragOverIndex(null)

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault()
      if (draggedIndex === null || draggedIndex === dropIndex) return

      const newOrdered = [...statusesData]
      const [moved] = newOrdered.splice(draggedIndex, 1)
      newOrdered.splice(dropIndex, 0, moved)

      statusStore.reorderStatuses(newOrdered.map((s) => s.id))

      setDraggedIndex(null)
      setDragOverIndex(null)
    }

    const handleDragEnd = () => {
      setDraggedIndex(null)
      setDragOverIndex(null)
    }

    return (
      <div className="ml-10 flex gap-6">
        {statusesData.map((status, index) => (
          <StatusCard
            key={status.id}
            statusData={status}
            addTaskButton={
              addTaskButton
                ? cloneElement(addTaskButton, { statusId: status.id })
                : undefined
            }
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            isDragOver={dragOverIndex === index}
            onDragEnd={handleDragEnd}
          />
        ))}
        <CreateStatusBtn />
      </div>
    )
  }
)

export default StatusList
