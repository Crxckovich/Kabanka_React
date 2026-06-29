import type { ITask } from "@/entities/Task/model/types/task.types.ts"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card.tsx"
import type { DragEvent, ReactElement } from "react"
import { observer } from "mobx-react-lite"

interface ITaskCardProps {
  taskData: ITask
  contextMenu?: ReactElement
  isDragOver?: boolean
  onDragStart?: (e: DragEvent<HTMLDivElement>) => void
  onDragOver?: (e: DragEvent<HTMLDivElement>) => void
  onDragLeave?: (e: DragEvent<HTMLDivElement>) => void
  onDrop?: (e: DragEvent<HTMLDivElement>) => void
}

export const TaskCard = observer(
  ({
    taskData,
    contextMenu,
    isDragOver = false,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
  }: ITaskCardProps) => {
    return (
      <Card
        className={`cursor-grab gap-2 rounded-xl bg-secondary/50 transition-all hover:shadow-md active:cursor-grabbing ${
          isDragOver ? "scale-[1.02] border-b-10 border-primary" : ""
        }`}
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <CardHeader>
          <CardTitle className="flex items-start justify-between">
            {taskData.title}
          </CardTitle>
          {contextMenu && <CardAction>{contextMenu}</CardAction>}
        </CardHeader>
        {taskData.description && (
          <CardContent className="leading-relaxed break-words whitespace-pre-wrap">
            {taskData.description}
          </CardContent>
        )}
      </Card>
    )
  }
)

export default TaskCard
