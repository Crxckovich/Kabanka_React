import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useRoomDetailsStore } from "@/app/providers/StoreProvider/StoresRegister.ts"
import { observer } from "mobx-react-lite"
import { StatusList } from "@/entities/Status"
import { CreateTaskButton } from "@/features/TaskManage"
import { Htag } from "@/shared/ui/Htag"
import { RoomSidebar } from "@/widgets/RoomSidebar"

export const RoomPage = observer(() => {
  const { id: roomId } = useParams<{ id: string }>()
  const roomDetailsStore = useRoomDetailsStore()

  useEffect(() => {
    if (roomId) {
      if (roomDetailsStore.guestId) {
        roomDetailsStore.joinRoom(roomId, roomDetailsStore.guestId)
      } else {
        roomDetailsStore.joinRoom(roomId)
      }
    }

    return () => {
      roomDetailsStore.leaveRoom()
    }
  }, [roomDetailsStore, roomId])

  const statuses = roomDetailsStore.roomData?.statuses || []

  return (
    <div className="mr-8 flex h-full flex-col gap-4 overflow-y-hidden">
      <div className="flex w-full items-center justify-between pt-5 pl-10">
        <Htag tag={"h3"}>{roomDetailsStore.roomData?.name}</Htag>
        <RoomSidebar />
      </div>

      <div className="h-full overflow-x-auto pt-3">
        <StatusList
          statusesData={statuses}
          addTaskButton={<CreateTaskButton />}
        />
      </div>
    </div>
  )
})

export default RoomPage
