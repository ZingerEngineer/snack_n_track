import { Camera, CameraResultType } from '@capacitor/camera';
export async function pickPicture() {
    try {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri,
        });
        return image.webPath;
    }
    catch (error) {
        console.error('Error picking picture:', error);
        throw error;
    }
}
export default pickPicture;
