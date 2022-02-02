import {
  IImage,
  IFixedImage,
  imageRatio,
  IRawImage,
} from "components/Image/image.types"
import { Viewport } from "hooks/hooks.types"

export function getImage(image: IRawImage, vp: Viewport | null) {
  const img: IImage = {
    ...image,
  }

  switch (vp) {
    case Viewport.DESKTOP:
    case Viewport.TABLET_LANDSCAPE_UP:
      const fixedTabletImage: IFixedImage = img
      fixedTabletImage.width = 900
      fixedTabletImage.height = Math.round(900 * imageRatio)
      return fixedTabletImage
    case Viewport.TABLET_PORTRAIT_UP:
      const fixedTabletPortraitImage: IFixedImage = img
      fixedTabletPortraitImage.width = 400
      fixedTabletPortraitImage.height = Math.round(400 * imageRatio)
      return fixedTabletPortraitImage
    case Viewport.PHONE_ONLY:
    default:
      const fixedImage: IFixedImage = img
      fixedImage.width = 400
      fixedImage.height = Math.round(400 * imageRatio)
      return fixedImage
  }
}
