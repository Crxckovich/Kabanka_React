import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/shared/ui/popover.tsx"
import { Button } from "@/shared/ui/Button"
import { HugeiconsIcon } from "@hugeicons/react"
import { User03Icon } from "@hugeicons/core-free-icons"
import { type IRoomMember, MembersList } from "@/entities/RoomMember"
import { observer } from "mobx-react-lite"
import MemberContextMenu from "@/features/MemberOptions/ui/MemberContextMenu/MemberContextMenu.tsx"
import { useUserStore } from "@/app/providers/StoreProvider/StoresRegister.ts"

interface IMemberOptionsProps {
  membersData: IRoomMember[]
}

export const MemberOptions = observer(
  ({ membersData }: IMemberOptionsProps) => {
    const userStore = useUserStore()
    const adminId = membersData.find((m) => m.isAdmin)?.id
    const currentUserId = userStore.user?.id

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size={"icon-lg"}
            variant={"ghost"}
            className={"size-12 rounded-lg"}
          >
            <HugeiconsIcon icon={User03Icon} className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Участники</PopoverTitle>
          </PopoverHeader>
          <MembersList
            membersData={membersData}
            currentUserId={currentUserId}
            contextMenu={<MemberContextMenu adminId={adminId} />}
          />
        </PopoverContent>
      </Popover>
    )
  }
)

export default MemberOptions
