import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import { Textarea } from "@/shared/ui/textarea.tsx"
import { useTaskManageStore } from "@/app/providers/StoreProvider/StoresRegister.ts"
import type { ITask } from "@/entities/Task/model/types/task.types.ts"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"

interface ITaskEditDialogProps {
  taskData: ITask
}

const TaskEditDialog = observer(({ taskData }: ITaskEditDialogProps) => {
  const taskManageStore = useTaskManageStore()

  useEffect(() => {
    taskManageStore.openEdit(taskData)

    return (
      taskManageStore.closeEdit
    )
  }, [taskData, taskManageStore])

  return (
    <Dialog>
      <DialogTrigger className="w-full p-2 text-left text-sm">
        Изменить
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование задачи</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            taskManageStore.updateTask()
          }}
          className="space-y-4"
        >
          <Input
            placeholder="Название задачи..."
            value={taskManageStore.newTaskTitle}
            onChange={(e) => taskManageStore.setTitle(e.target.value)}
            autoFocus
          />

          <Textarea
            placeholder="Описание задачи..."
            value={taskManageStore.newTaskDescription}
            onChange={(e) => taskManageStore.setDescription(e.target.value)}
            autoFocus
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Отмена
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="submit"
                disabled={!taskManageStore.newTaskTitle.trim()}
              >
                Изменить
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
})

export default TaskEditDialog
