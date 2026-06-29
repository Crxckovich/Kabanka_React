import type { IRoomMember } from "@/entities/RoomMember/model/types/roomMember.types.ts"
import MemberItem from "@/entities/RoomMember/ui/MemberItem/MemberItem.tsx"
import { observer } from "mobx-react-lite"
import { cloneElement, type ReactElement } from "react"

interface IMembersListProps {
  membersData: IRoomMember[]
  currentUserId?: number
  contextMenu?: ReactElement<{ memberId: string }>
}

export const MembersList = observer(
  ({ membersData, contextMenu }: IMembersListProps) => {
    if (membersData.length === 0) return <p>Нет участников(</p>

    // const isCurrentUserAdmin = membersData.some(
    //   (m) => m.userId === currentUserId && m.isAdmin
    // )

    return (
      <ul className={"flex h-fit w-full flex-col gap-1"}>
        {membersData.map((member) => (
          <MemberItem
            memberData={member}
            key={member.id}
            contextMenu={
              contextMenu
                ? cloneElement(contextMenu, { memberId: member.id })
                : undefined
            }
          />
        ))}
      </ul>
    )
  }
)

export default MembersList
