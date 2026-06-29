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
import {
  useRoomDetailsStore,
  useRoomFormStore,
} from "@/app/providers/StoreProvider/StoresRegister.ts"
import { observer } from "mobx-react-lite"
import { useCallback } from "react"
import { getRouteRoom } from "@/shared/const/router.ts"
import { useNavigate } from "react-router-dom"

export const CreateRoomForm = observer(() => {
  const roomForm = useRoomFormStore()
  const roomDetailsStore = useRoomDetailsStore()
  const navigate = useNavigate()

  const handleSubmit = useCallback(async () => {
    const result = await roomForm.createRoom()
    if (result.guestId) {
      roomDetailsStore.setGuestId(result.guestId)
    }

    navigate(getRouteRoom(result.room.id))
  }, [roomForm, navigate, roomDetailsStore])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>Создать канбан-доску</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание комнаты</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="space-y-4"
        >
          <Input
            placeholder="Название комнаты..."
            value={roomForm.roomName}
            onChange={(e) => roomForm.setRoomName(e.target.value)}
            autoFocus
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Отмена
              </Button>
            </DialogClose>

            <Button type="submit" disabled={!roomForm.roomName.trim()}>
              Создать
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
})

export default CreateRoomForm
