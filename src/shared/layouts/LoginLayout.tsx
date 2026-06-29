import type { ReactNode } from "react"

interface ILoginLayoutProps {
  children: ReactNode
}

export const LoginLayout = ({ children }: ILoginLayoutProps) => {
  return (
    <div className="relative flex h-screen w-screen flex-col">{children}</div>
  )
}

export default LoginLayout
