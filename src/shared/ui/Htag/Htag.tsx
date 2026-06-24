import { type JSX, memo, type ReactNode } from "react"

interface IHtagProps {
  tag: "h1" | "h2" | "h3" | "h4"
  children: ReactNode
  className?: string
  id?: string
}

export const Htag = memo(
  ({ tag, children, id, className }: IHtagProps): JSX.Element => {
    switch (tag) {
      case "h1":
        return (
          <h1
            className={`text-heading text-3xl font-bold tracking-wide md:text-5xl ${className}`.trim()}
            id={id}
          >
            {children}
          </h1>
        )
      case "h2":
        return (
          <h2
            className={`text-accent-htag text-[24px] font-bold tracking-wide md:text-[38px] ${className}`.trim()}
            id={id}
          >
            {children}
          </h2>
        )
      case "h3":
        return (
          <h3
            className={`text-heading text-xl font-bold tracking-wide md:text-2xl ${className}`.trim()}
            id={id}
          >
            {children}
          </h3>
        )
      case "h4":
        return (
          <h4
            className={`text-heading text-lg font-bold tracking-wide md:text-xl ${className}`.trim()}
            id={id}
          >
            {children}
          </h4>
        )
      default:
        return <></>
    }
  }
)
