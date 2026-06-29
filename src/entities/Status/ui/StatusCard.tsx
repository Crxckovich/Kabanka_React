import { observer } from "mobx-react-lite"
import { type ReactElement, useRef, useState } from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { Input } from "@/shared/ui/Input"
import type { IStatus } from "../model/types/status.types"
import { StatusContextMenu } from "@/features/StatusManage"
import {
  useRoomDetailsStore,
  useStatusStore,
} from "@/app/providers/StoreProvider/StoresRegister.ts"
import { TaskList } from "../../Task/ui/TaskList.tsx"
import TaskContextMenu from "@/features/TaskManage/ui/TaskContextMenu/TaskContextMenu.tsx"

interface IStatusCardProps {
  statusData: IStatus
  addTaskButton?: ReactElement
  onDragStart?: (e: React.DragEvent, statusId: string) => void
  onDragOver?: (e: React.DragEvent) => void
  onDragLeave?: (e: React.DragEvent) => void
  onDragEnd?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  isDragOver?: boolean
}

export const StatusCard = observer(
  ({
    statusData,
    addTaskButton,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDragEnd,
    onDrop,
    isDragOver = false,
  }: IStatusCardProps) => {
    const roomDetailsStore = useRoomDetailsStore()
    const cardRef = useRef<HTMLDivElement>(null)
    const statusStore = useStatusStore()

    const [localName, setLocalName] = useState(statusData.name)

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalName(e.target.value)
    }

    const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault()
        const trimmed = localName.trim()

        if (trimmed && trimmed !== statusData.name) {
          statusStore.updateStatus(statusData.id, trimmed)
        } else {
          setLocalName(statusData.name)
        }
      }

      if (e.key === "Escape") {
        setLocalName(statusData.name)
      }
    }

    const handleBlur = () => {
      const trimmed = localName.trim()
      if (trimmed && trimmed !== statusData.name) {
        statusStore.updateStatus(statusData.id, trimmed)
      } else {
        setLocalName(statusData.name)
      }
    }

    const tasks = (roomDetailsStore.roomData?.tasks || [])
      .filter((task) => task.statusId === statusData.id)
      .sort((a, b) => a.order - b.order)

    const handleDragStartInternal = (e: React.DragEvent) => {
      if (onDragStart) {
        onDragStart(e, statusData.id)
      }

      if (cardRef.current) {
        const clone = cardRef.current.cloneNode(true) as HTMLElement
        clone.style.width = `${cardRef.current.offsetWidth}px`
        clone.style.position = "absolute"
        clone.style.top = "-9999px"
        document.body.appendChild(clone)

        e.dataTransfer.setDragImage(clone, 20, 20)

        setTimeout(() => document.body.removeChild(clone), 0)
      }
    }

    return (
      <Card
        ref={cardRef}
        className={`group relative flex h-fit max-h-[750px] w-80 flex-shrink-0 flex-col gap-0 transition-all ${
          isDragOver ? "border-2 border-primary" : ""
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
      >
        <div className="absolute z-50 h-30 w-full -translate-y-4 rounded-2xl bg-card"></div>

        <div
          draggable
          onDragStart={handleDragStartInternal}
          className="absolute -top-3 right-0 left-0 h-12 cursor-grab rounded-t-full rounded-t-xl bg-foreground/70 opacity-0 transition-all group-hover:opacity-100 hover:bg-primary active:cursor-grabbing"
        />

        <CardHeader className={"z-10 z-50 items-center justify-between"}>
          <CardTitle className={"w-fit"}>
            <Input
              value={localName}
              onChange={handleNameChange}
              onKeyDown={handleNameKeyDown}
              onBlur={handleBlur}
              className="border-none bg-transparent text-lg font-semibold focus-visible:ring-1"
              spellCheck={false}
            />
          </CardTitle>
          <CardAction>
            <StatusContextMenu statusId={statusData.id} />
          </CardAction>
        </CardHeader>

        <CardContent className="z-50 flex flex-1 flex-col gap-3 overflow-auto">
          {addTaskButton}
          <TaskList
            tasksData={tasks}
            contextMenu={<TaskContextMenu />}
            statusId={statusData.id}
          />
        </CardContent>
      </Card>
    )
  }
)

export default StatusCard
