import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog"
import { Button } from "@/shared/ui/Button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Globe02Icon, ReloadIcon } from "@hugeicons/core-free-icons"
import { Switch } from "@/shared/ui/switch.tsx"
import { Label } from "@/shared/ui/label.tsx"
import { Htag } from "@/shared/ui/Htag"
import {
  useRoomDetailsStore,
  useRoomStore,
} from "@/app/providers/StoreProvider/StoresRegister.ts"
import { observer } from "mobx-react-lite"

export const TogglePublic = observer(() => {
  const roomStore = useRoomStore()
  const roomDetailsStore = useRoomDetailsStore()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon-lg"}
          variant={"ghost"}
          className={"size-12 rounded-lg"}
        >
          <HugeiconsIcon icon={Globe02Icon} className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className={"gap-6"}>
        <DialogHeader>
          <DialogTitle>Поделиться доской</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-wrap items-center justify-between gap-1.5">
          <p>Сделать доску публичной</p>
          <Switch
            defaultChecked={roomDetailsStore.roomData?.isPublic}
            onClick={roomStore.togglePublic}
          />
        </div>
        {roomDetailsStore.roomData?.inviteCode && (
          <div className="flex w-full flex-wrap items-center justify-between gap-1.5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inviteCode">Код (действует 15 минут)</Label>
              <Htag id="inviteCode" tag={"h2"}>
                {roomDetailsStore.roomData?.inviteCode}
              </Htag>
            </div>
            <Button
              size={"icon-lg"}
              className={"rounded-lg"}
              variant={"secondary"}
              onClick={() =>
                roomStore.resetInviteCode(roomDetailsStore.roomData?.id)
              }
            >
              <HugeiconsIcon icon={ReloadIcon} />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
})

export default TogglePublic
