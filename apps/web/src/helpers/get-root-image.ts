import imageOne from '../public/paint_image_1.png'
import imageTwo from '../public/paint_image_2.png'
import imageThree from '../public/paint_image_3.png'
import imageFour from '../public/paint_image_4.png'
import imageFive from '../public/paint_image_5.png'
import imageSix from '../public/paint_image_6.png'
import imageSeven from '../public/paint_image_7.png'
import imageEight from '../public/paint_image_8.png'

const MAP = {
  '1': imageOne,
  '2': imageTwo,
  '3': imageThree,
  '4': imageFour,
  '5': imageFive,
  '6': imageSix,
  '7': imageSeven,
  '8': imageEight
}

const images = Object.values(MAP)

export function getRootImage (id?: string | null): string {
  const imageId = id || (Math.floor(Math.random() * 8) + 1).toString()
  const imageIndex = MAP[imageId as keyof typeof MAP]

  return images[imageIndex as keyof typeof MAP]
}
