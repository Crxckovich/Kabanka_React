import type { IRoom } from "../../model/types/room.types.ts"
import RoomCard from "../RoomCard/RoomCard.tsx"
import { observer } from "mobx-react-lite"
import { cloneElement, type ReactElement } from "react"

interface IRoomListProps {
  roomsData: IRoom[]
  contextMenu?: ReactElement<{ roomId: string; roomOwnerId: number }>
}

export const RoomList = observer(
  ({ roomsData, contextMenu }: IRoomListProps) => {
    if (roomsData.length === 0) {
      return <p>У вас пока что нет канбан-досок</p>
    }

    return (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
        {roomsData.map((room) => (
          <RoomCard
            roomData={room}
            key={room.id}
            contextMenu={
              contextMenu
                ? cloneElement(contextMenu, {
                    roomId: room.id,
                    roomOwnerId: room.ownerId,
                  })
                : undefined
            }
          />
        ))}
      </div>
    )
  }
)

export default RoomList
