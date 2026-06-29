import type { ReactElement, ReactNode } from "react"

interface IMainLayoutProps {
  header: ReactElement
  children: ReactNode
}

export const MainLayout = ({ header, children }: IMainLayoutProps) => {
  return (
    <div className="relative flex h-screen w-screen flex-col">
      {header}
      <div className="flex h-full flex-col gap-6">{children}</div>
    </div>
  )
}

export default MainLayout
