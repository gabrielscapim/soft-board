export function getRootImage (id?: string | null): string {
  const imageId = id && ['1','2','3','4','5','6','7','8'].includes(id)
    ? id
    : (Math.floor(Math.random() * 8) + 1).toString()

  return `/paint_image_${imageId}.avif`
}
