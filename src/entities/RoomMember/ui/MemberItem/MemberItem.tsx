import type { IRoomMember } from "@/entities/RoomMember/model/types/roomMember.types.ts"
import { observer } from "mobx-react-lite"
import { type ReactElement } from "react"

interface IMemberItemProps {
  memberData: IRoomMember
  contextMenu?: ReactElement
}

const MemberItem = observer(({ memberData, contextMenu }: IMemberItemProps) => {
  return (
    // TODO: Цвет для слова Админ, Цвет для конкретного пользователя
    <li
      key={memberData.id}
      className="flex items-center justify-between rounded rounded-lg p-2 hover:bg-accent"
    >
      <div className="flex items-center gap-2">
        <div
          className={`h-2 w-2 rounded-full ${memberData.isOnline ? "bg-green-500" : "bg-gray-400"}`}
        />
        <span>{memberData.displayName}</span>
        {memberData.isAdmin && (
          <span className="text-xs text-amber-600">(Админ)</span>
        )}
      </div>
      {contextMenu}
    </li>
  )
})

export default MemberItem
