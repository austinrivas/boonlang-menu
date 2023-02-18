import imageToBase64 from 'image-to-base64'

export default async function convertImageToBase64(url: string): Promise<string> {
    return await imageToBase64(url)
}