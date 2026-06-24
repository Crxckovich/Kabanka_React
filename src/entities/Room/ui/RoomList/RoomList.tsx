import type { IRoom } from "../../model/types/room.types.ts"
import RoomCard from "../RoomCard/RoomCard.tsx"
import { observer } from "mobx-react-lite"

interface IRoomListProps {
  roomsData: IRoom[]
}

export const RoomList = observer(({ roomsData }: IRoomListProps) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {roomsData.map((room) => (
        <RoomCard roomData={room} key={room.id} />
      ))}
    </div>
  )
})

export default RoomList
