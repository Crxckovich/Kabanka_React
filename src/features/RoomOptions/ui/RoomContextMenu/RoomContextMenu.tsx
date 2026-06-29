import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu.tsx"
import { Button } from "@/shared/ui/Button"
import { HugeiconsIcon } from "@hugeicons/react"
import { useRoomStore } from "@/app/providers/StoreProvider/StoresRegister.ts"
import { observer } from "mobx-react-lite"
import type { MouseEvent } from "react"
import { EllipsisIcon } from "@hugeicons/core-free-icons"

interface IRoomContextMenuProps {
  roomId?: string
  roomOwnerId?: number
  userId: number
}

export const RoomContextMenu = observer(
  ({ roomId, roomOwnerId, userId }: IRoomContextMenuProps) => {
    const roomStore = useRoomStore()
    const isOwner = roomOwnerId === userId

    const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (isOwner) {
        if (confirm("Удалить комнату и все данные?")) {
          roomStore.deleteRoomHttp(roomId)
        }
      } else {
        if (confirm("Выйти из комнаты?")) {
          roomStore.leaveRoomHttp(roomId)
        }
      }
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <HugeiconsIcon icon={EllipsisIcon} className="size-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className={"w-fit"}>
          <DropdownMenuItem
            variant="destructive"
            onClick={(e) => handleLeave(e)}
          >
            {isOwner ? "Удалить комнату" : "Выйти из комнаты"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

export default RoomContextMenu
