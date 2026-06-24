export const getColorFromOwner = (
  ownerId: number,
  userId: number
): string | null => {
  if (userId != ownerId) {
    return null
  }

  return "bg-yellow-500"
}
