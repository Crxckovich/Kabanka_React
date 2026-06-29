import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"

export const DropPlaceholder = ({
  isVisible,
  onDragOver,
  onDragLeave,
  onDrop,
}: {
  isVisible: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent) => void
}) => (
  <div
    className={`-my-1 h-2 rounded-xl border-2 border-dashed transition-all ${
      isVisible ? "h-11 border-primary bg-primary/5" : "border-transparent"
    }`}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
  >
    {isVisible && (
      <div className="flex h-full items-center justify-center">
        <HugeiconsIcon icon={PlusSignIcon} className="size-5 text-primary" />
      </div>
    )}
  </div>
)
