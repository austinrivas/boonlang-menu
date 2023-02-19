import sharp from 'sharp'

export async function resizeImage(src: string, dest: string) {
  try {
    console.log('Resizing File:', src)
    await sharp(src)
      .resize({
        width: 1340,
        height: 800
      }).toFile(dest)
  } catch (error) {
    throw error
  }
}
