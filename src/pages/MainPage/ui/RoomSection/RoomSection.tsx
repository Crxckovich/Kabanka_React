import {
  useAuthStore,
  useRoomStore,
} from "@/app/providers/StoreProvider/StoresRegister.ts"
import { RoomList } from "@/entities/Room"
import { RoomFormsWrapper } from "@/features/RoomForm"
import { Htag } from "@/shared/ui/Htag"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"

export const RoomSection = observer(() => {
  const authStore = useAuthStore()
  const roomStore = useRoomStore()

  useEffect(() => {
    roomStore.fetchAllUsers()
  }, [roomStore])

  if (authStore.isAuth) {
    return (
      <div className="flex flex-col gap-6 p-20">
        <RoomFormsWrapper orientation={"horizontal"} />
        <RoomList roomsData={roomStore.roomsData} />
      </div>
    )
  }

  return (
    <div className={"flex h-full flex-col items-center justify-center gap-4"}>
      <Htag tag={"h1"}>Кабанка</Htag>
      <RoomFormsWrapper />
    </div>
  )
})

export default RoomSection
