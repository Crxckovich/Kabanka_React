import type { IRoom } from "../../model/types/room.types"
import { Card, CardHeader } from "@/shared/ui/card.tsx"
import { Link } from "react-router-dom"

export interface IRoomCardProps {
  roomData: IRoom
}

const RoomCard = ({ roomData }: IRoomCardProps) => {
  return (
    <Link to={`/rooms/${roomData.id}`}>
      <Card>
        <CardHeader>{roomData.name}</CardHeader>
      </Card>
    </Link>
  )
}

export default RoomCard
