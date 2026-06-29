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
import { useRoomDetailsStore } from "@/app/providers/StoreProvider/StoresRegister"
import { observer } from "mobx-react-lite"

const JoinByInviteForm = observer(() => {
  const roomDetailsStore = useRoomDetailsStore()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>Присоединиться к канбан-доске</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ввод инвайт-кода</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder={"Код..."}
            value={roomDetailsStore.inviteCode}
            onChange={(e) => roomDetailsStore.setInviteCode(e.target.value)}
          />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Отмена
            </Button>
          </DialogClose>
          <Button type="submit" onClick={roomDetailsStore.joinRoomByInvite}>
            Присоединиться
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})

export default JoinByInviteForm
