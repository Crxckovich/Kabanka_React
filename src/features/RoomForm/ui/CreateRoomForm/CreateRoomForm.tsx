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
import { Button } from "@/shared/ui/Button"
import { useRoomFormStore } from "@/app/providers/StoreProvider/StoresRegister.ts"
import { observer } from "mobx-react-lite"

export const CreateRoomForm = observer(() => {
  const roomForm = useRoomFormStore()

  return (
    <Dialog>
      <DialogTrigger>
        <Button size={"lg"} className={"w-full"}>
          Создать канбан-доску
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание комнаты</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder={"Название..."}
            value={roomForm.roomName}
            onChange={(e) => roomForm.setRoomName(e.target.value)}
          />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Отмена
            </Button>
          </DialogClose>
          <Button type="submit" onSubmit={roomForm.createRoom}>
            Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})

export default CreateRoomForm
