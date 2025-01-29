import { Camera, CameraResultType } from '@capacitor/camera'

export async function pickPicture() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
  })
  return image.webPath
}

export default pickPicture
