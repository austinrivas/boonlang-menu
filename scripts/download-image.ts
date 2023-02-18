import {promisify} from 'util'
import stream from 'stream'
import fs from 'fs'
import got from 'got'

export async function downloadImage(src: string, dest: string) {
    const pipeline = promisify(stream.pipeline)
    console.log('Downloading File:', src)
    await pipeline(
        got.stream(src),
        fs.createWriteStream(dest)
    )
    console.log('File Saved:', dest)
}