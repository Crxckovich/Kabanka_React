import type { IRoom } from "../../model/types/room.types"
import { Card, CardAction, CardHeader } from "@/shared/ui/card.tsx"
import { Link } from "react-router-dom"
import { getRouteRoom } from "@/shared/const/router.ts"
import { Htag } from "@/shared/ui/Htag"
import { HugeiconsIcon } from "@hugeicons/react"
import { KanbanIcon } from "@hugeicons/core-free-icons"
import type { ReactElement } from "react"

export interface IRoomCardProps {
  roomData: IRoom
  contextMenu?: ReactElement
}

const RoomCard = ({ roomData, contextMenu }: IRoomCardProps) => {
  return (
    <Link to={getRouteRoom(roomData.id)}>
      <Card className={"rounded-xl"}>
        <CardHeader className={"mb-0"}>
          <div className="flex flex-wrap items-center gap-2">
            <HugeiconsIcon icon={KanbanIcon} />
            <Htag tag={"h4"}>{roomData.name}</Htag>
          </div>
          {contextMenu && <CardAction>{contextMenu}</CardAction>}
        </CardHeader>
      </Card>
    </Link>
  )
}

export default RoomCard
