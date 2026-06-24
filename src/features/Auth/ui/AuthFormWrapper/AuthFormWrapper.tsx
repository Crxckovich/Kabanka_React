import { useState } from "react"
import { LoginForm } from "../LoginForm/LoginForm.tsx"
import { SignUpForm } from "../SignUpForm/SignUpForm"
import { Htag } from "@/shared/ui/Htag"

export const AuthFormWrapper = () => {
  const [form, setForm] = useState<"LoginForm" | "SignUpForm">("LoginForm")

  const handleFormChange = () => {
    setForm((prev) => (prev === "LoginForm" ? "SignUpForm" : "LoginForm"))
  }

  return (
    <div className={"flex h-screen w-screen items-center justify-center"}>
      <div className={"flex w-full flex-col items-center gap-5"}>
        <Htag tag={"h1"}>Кабанка</Htag>
        {form === "LoginForm" && <LoginForm onFormChange={handleFormChange} />}
        {form === "SignUpForm" && (
          <SignUpForm onFormChange={handleFormChange} />
        )}
      </div>
    </div>
  )
}

export default AuthFormWrapper
