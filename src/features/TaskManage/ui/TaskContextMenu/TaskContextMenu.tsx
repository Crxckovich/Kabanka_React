import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu.tsx"
import { Button } from "@/shared/ui/Button"
import { HugeiconsIcon } from "@hugeicons/react"
import { EllipsisIcon } from "@hugeicons/core-free-icons"
import type { ITask } from "@/entities/Task/model/types/task.types.ts"
import { useTaskManageStore } from "@/app/providers/StoreProvider/StoresRegister.ts"
import TaskEditDialog from "@/features/TaskManage/ui/TaskEditDialog/TaskEditDialog.tsx"
import { observer } from "mobx-react-lite"

interface ITaskContextMenuProps {
  taskData?: ITask
}

export const TaskContextMenu = observer(
  ({ taskData }: ITaskContextMenuProps) => {
    const taskManageStore = useTaskManageStore()

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <HugeiconsIcon icon={EllipsisIcon} className="size-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-fit">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <TaskEditDialog taskData={taskData} />
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => taskManageStore.deleteTask(taskData.id)}
            >
              Удалить задачу
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

export default TaskContextMenu
