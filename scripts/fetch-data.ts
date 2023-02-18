import MockData from '../src/data/mock-gsheet.json'
import { isAppState } from '../src/models/app-state'
import convertImageToBase64 from './image-to-base64'
import { DrinksCollection } from '../src/models/drinks'
import { EntresCollection } from '../src/models/entres'
import { IGSheetQueryResponse, IGSheetRow } from '../src/models/gsheet'
import { resizeImage } from './resize-image'
import { downloadImage } from './download-image'
import { saveAppState } from './save-app-state'

function getImageId(src: string): string {
    const parts = src.split('/')
    const id = parts[5]
    if (!id) throw new Error(`Failed to parse: id for ${src}`)
    return id
}

async function formatRow(row: IGSheetRow): Promise<IGSheetRow> {
    const src = row.c[2].v as string
    const id = getImageId(src)
    const downloadSrc = `https://drive.google.com/uc?export=download&id=${id}`
    const rawDest = `./images/raw/${id}.jpg`
    const processedDest = `./images/processed/${id}.jpg`
    await downloadImage(downloadSrc, rawDest)
    await resizeImage(rawDest, processedDest)
    const base64Image = await convertImageToBase64(processedDest)
    row.c[2].v = base64Image
    return row
}

async function main() {
    if (isAppState(MockData)) {
        const entres: IGSheetQueryResponse = MockData.entres
        const drinks: IGSheetQueryResponse = MockData.drinks
        entres.table.rows = await Promise.all(entres.table.rows.map(formatRow))
        drinks.table.rows = await Promise.all(drinks.table.rows.map(formatRow))
        await saveAppState({
            entres: new EntresCollection(entres),
            drinks: new DrinksCollection(drinks)
        }, `./src/data/app-state.json`)
    }
}

main()

