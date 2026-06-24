import { Header } from "@/widgets/Header"
import RoomSection from "@/pages/MainPage/ui/RoomSection/RoomSection.tsx"

export const MainPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <RoomSection />
    </div>
  )
}

export default MainPage
