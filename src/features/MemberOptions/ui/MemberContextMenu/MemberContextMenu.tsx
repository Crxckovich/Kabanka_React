import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu.tsx"
import { Button } from "@/shared/ui/Button"
import { HugeiconsIcon } from "@hugeicons/react"
import MemberPermissionsDialog from "@/features/MemberOptions/ui/MemberPermissionsDialog/MemberPermissionsDialog.tsx"
import { observer } from "mobx-react-lite"
import { EllipsisIcon } from "@hugeicons/core-free-icons"
import { useMemberOptionsStore } from "@/app/providers/StoreProvider/StoresRegister.ts" // ← добавь импорт

interface IMemberContextMenuProps {
  memberId?: string
  adminId?: string
}

export const MemberContextMenu = observer(
  ({ memberId, adminId }: IMemberContextMenuProps) => {
    const memberOptionsStore = useMemberOptionsStore()

    if (memberId === adminId) return null

    const handleKick = () => {
      if (!memberId) return

      memberOptionsStore.removeMember(memberId)
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <HugeiconsIcon icon={EllipsisIcon} className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <DropdownMenuItem asChild>
            <MemberPermissionsDialog memberId={memberId} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={handleKick}>
            Кикнуть
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

export default MemberContextMenu
