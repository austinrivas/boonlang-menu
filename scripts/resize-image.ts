import sharp from 'sharp'

export async function resizeImage(src: string, dest: string) {
  try {
    console.log('Resizing File:', src)
    await sharp(src)
      .resize({
        width: 100,
        height: 100
      }).toFile(dest)
  } catch (error) {
    throw error
  }
}
