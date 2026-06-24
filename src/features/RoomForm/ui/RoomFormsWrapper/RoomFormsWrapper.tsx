import CreateRoomForm from "../CreateRoomForm/CreateRoomForm"
import JoinByInviteForm from "../JoinByInviteForm/JoinByInviteForm"
import { cn } from "@/shared/lib/utils"

interface IRoomFormsWrapperProps {
  orientation?: "vertical" | "horizontal"
}

export const RoomFormsWrapper = ({
  orientation = "vertical",
}: IRoomFormsWrapperProps) => {
  return (
    <div
      className={cn(
        "flex justify-center gap-2",
        orientation === "horizontal" ? "w-full flex-row" : "flex-col"
      )}
    >
      <CreateRoomForm />
      <JoinByInviteForm />
    </div>
  )
}

export default RoomFormsWrapper
