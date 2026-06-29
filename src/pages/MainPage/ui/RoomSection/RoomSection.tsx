import {
  useAuthStore,
  useUserRoomsStore,
  useUserStore,
} from "@/app/providers/StoreProvider/StoresRegister.ts"
import { RoomList } from "@/entities/Room"
import { RoomFormsWrapper } from "@/features/RoomForm"
import { Htag } from "@/shared/ui/Htag"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { RoomContextMenu } from "@/features/RoomOptions"

export const RoomSection = observer(() => {
  const authStore = useAuthStore()
  const userRoomsStore = useUserRoomsStore() // TODO: Реализовать класс по типу createAsyncThunk из Redux
  const userStore = useUserStore()

  useEffect(() => {
    userRoomsStore.fetchUserRooms()
  }, [userRoomsStore])

  if (authStore.isAuth) {
    return (
      <div className={"space-y-6 px-12 py-5"}>
        <RoomFormsWrapper orientation={"horizontal"} />
        <RoomList
          roomsData={userRoomsStore.roomsData}
          contextMenu={<RoomContextMenu userId={userStore.user.id} />}
        />
      </div>
    )
  }

  return (
    <div
      className={
        "flex h-full w-full flex-col items-center justify-center gap-4"
      }
    >
      <Htag tag={"h1"}>Канбанка</Htag>
      <RoomFormsWrapper />
    </div>
  )
})

export default RoomSection
