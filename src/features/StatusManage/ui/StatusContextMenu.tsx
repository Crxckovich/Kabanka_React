import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu.tsx"
import { Button } from "@/shared/ui/Button"
import { HugeiconsIcon } from "@hugeicons/react"
import { observer } from "mobx-react-lite"
import { useStatusStore } from "@/app/providers/StoreProvider/StoresRegister.ts"
import { EllipsisIcon } from "@hugeicons/core-free-icons"

interface IStatusContextMenuProps {
  statusId: string
}

export const StatusContextMenu = observer(
  ({ statusId }: IStatusContextMenuProps) => {
    const statusStore = useStatusStore()

    const handleDelete = () => {
      if (confirm("Удалить статус и все задачи в нём?")) {
        statusStore.delete(statusId)
      }
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <HugeiconsIcon icon={EllipsisIcon} className="size-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-fit">
          {/*<DropdownMenuGroup>*/}
          {/*  <DropdownMenuItem>Переместить влево</DropdownMenuItem>*/}
          {/*  <DropdownMenuItem>Переместить вправо</DropdownMenuItem>*/}
          {/*</DropdownMenuGroup>*/}

          {/*<DropdownMenuSeparator />*/}

          <DropdownMenuGroup>
            {/*<DropdownMenuItem variant="destructive">*/}
            {/*  Удалить все задачи*/}
            {/*</DropdownMenuItem>*/}
            <DropdownMenuItem variant="destructive" onClick={handleDelete}>
              Удалить статус
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

export default StatusContextMenu
