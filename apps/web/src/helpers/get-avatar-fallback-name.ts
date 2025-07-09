export function getAvatarFallbackName (name?: string) {
  if (!name) {
    return ''
  }

  return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()
}
