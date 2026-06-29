import { RoomOptions } from "@/features/RoomOptions"
import { MemberOptions } from "@/features/MemberOptions"
import { useRoomDetailsStore } from "@/app/providers/StoreProvider/StoresRegister.ts"
import { observer } from "mobx-react-lite"
import TogglePublic from "@/features/RoomOptions/ui/TogglePublic.tsx"

export const RoomSidebar = observer(() => {
  const roomDetailsStore = useRoomDetailsStore()

  const membersData = roomDetailsStore.roomData?.members || []

  return (
    <div className="flex h-fit w-fit gap-0.5 rounded-lg border border-border bg-card shadow-lg">
      <MemberOptions membersData={membersData} />
      <RoomOptions />
      <TogglePublic />
    </div>
  )
})

export default RoomSidebar
