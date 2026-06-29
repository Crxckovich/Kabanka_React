import { HugeiconsIcon } from "@hugeicons/react"
import { ClipboardPlusIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/shared/ui/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog"
import { Input } from "@/shared/ui/Input"
import { useTaskManageStore } from "@/app/providers/StoreProvider/StoresRegister.ts"
import { observer } from "mobx-react-lite"
import { Textarea } from "@/shared/ui/textarea.tsx"

interface ICreateTaskButtonProps {
  statusId?: string
}

export const CreateTaskButton = observer(
  ({ statusId }: ICreateTaskButtonProps) => {
    const taskManageStore = useTaskManageStore()

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size={"icon-lg"}
            variant={"secondary"}
            className={"size-10 w-full gap-2 rounded-lg"}
          >
            Создать задачу
            <HugeiconsIcon icon={ClipboardPlusIcon} className="size-5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создание задачи</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              taskManageStore.createTask(statusId)
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
                  Создать
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
)

export default CreateTaskButton
