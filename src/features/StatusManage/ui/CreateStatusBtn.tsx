import { observer } from "mobx-react-lite"
import { Button } from "@/shared/ui/Button"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import {
  useRoomDetailsStore,
  useStatusStore,
} from "@/app/providers/StoreProvider/StoresRegister.ts"
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

export const CreateStatusBtn = observer(() => {
  const roomStore = useRoomDetailsStore()
  const statusStore = useStatusStore()
  const roomId = roomStore.roomData?.id

  const handleSubmit = () => {
    if (roomId) {
      statusStore.create(roomId)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon-lg"
          variant="secondary"
          className="size-12 rounded-xl"
        >
          <HugeiconsIcon icon={PlusSignIcon} className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание статуса</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="space-y-4"
        >
          <Input
            placeholder="Название статуса..."
            value={statusStore.newStatusName}
            onChange={(e) => statusStore.setNewStatusName(e.target.value)}
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
                disabled={statusStore.isCreating || !roomId}
              >
                Создать
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
})
