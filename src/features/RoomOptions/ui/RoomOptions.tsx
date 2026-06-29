import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/shared/ui/popover.tsx"
import { Button } from "@/shared/ui/Button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Setting07Icon } from "@hugeicons/core-free-icons"
import { Label } from "@/shared/ui/label.tsx"
import { Input } from "@/shared/ui/Input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog.tsx"
import {
  useRoomDetailsStore,
  useRoomStore,
} from "@/app/providers/StoreProvider/StoresRegister.ts"
import { useState } from "react"
import { observer } from "mobx-react-lite"

export const RoomOptions = observer(() => {
  const roomStore = useRoomStore()
  const roomDetailsStore = useRoomDetailsStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    roomStore.updateRoomName()
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size={"icon-lg"}
          variant={"ghost"}
          className={"size-12 rounded-lg"}
        >
          <HugeiconsIcon icon={Setting07Icon} className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"gap-6"}>
        <PopoverHeader>
          <PopoverTitle>Настройки комнаты</PopoverTitle>
        </PopoverHeader>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="roomName">Название комнаты</Label>
          <Input
            id="roomName"
            value={roomStore.newRoomName}
            onChange={(e) => roomStore.setNewRoomName(e.target.value)}
            placeholder="Введите новое название"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <Button
            onClick={handleSave}
            disabled={
              !roomStore.newRoomName ||
              roomDetailsStore.roomData?.name === roomStore.newRoomName
            }
          >
            Сохранить
          </Button>
        </div>
        <div className="flex flex-col gap-1.5">
          <AlertDialog>
            <AlertDialogTrigger asChild id={"removeRoom"}>
              <Button variant={"destructive"}>Удалить комнату</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это действие невозможно отменить. В результате ваша доска, её
                  участники и задачи будут безвозвратно удалены.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction
                  variant={"destructive"}
                  onClick={() => roomStore.deleteRoom()}
                >
                  Удалить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PopoverContent>
    </Popover>
  )
})

export default RoomOptions
