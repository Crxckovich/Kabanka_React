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

const JoinByInviteForm = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size={"lg"} className={"w-full"}>
          Присоединиться к канбан-доске
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ввод инвайт-кода</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input placeholder={"Код..."} />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Отмена
            </Button>
          </DialogClose>
          <Button type="submit">Присоединиться</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default JoinByInviteForm
