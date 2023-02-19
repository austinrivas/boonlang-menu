import dotenv from 'dotenv'
import MockData from '../src/data/mock-gsheet.json'
import { isAppState } from '../src/models/app-state'
import convertImageToBase64 from './image-to-base64'
import { DrinksCollection } from '../src/models/drinks'
import { EntresCollection } from '../src/models/entres'
import { IGSheetQueryResponse, IGSheetRow } from '../src/models/gsheet'
import { resizeImage } from './resize-image'
import { downloadImage } from './download-image'
import { saveAppState } from './save-app-state'
import { GSheet } from "../src/models/gsheet"
dotenv.config()

const EntresSheet = new GSheet(process.env.REACT_APP_GSHEET_ID as string, 'Entres')
const DrinksSheet = new GSheet(process.env.REACT_APP_GSHEET_ID as string, 'Drinks')

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
    const rawDest = `./images/${id}.jpg`
    const processedDest = `./build/images/${id}.jpg`
    await downloadImage(downloadSrc, rawDest)
    await resizeImage(rawDest, processedDest)
    row.c[2].v = await convertImageToBase64(processedDest)
    return row
}

async function main() {
    let entres: IGSheetQueryResponse
    let drinks: IGSheetQueryResponse
    if (process.env.USE_MOCK_DATA && isAppState(MockData)) {
        entres = MockData.entres
        drinks = MockData.drinks
    } else {
        entres = await EntresSheet.query()
        drinks = await DrinksSheet.query()
    }
    entres.table.rows = await Promise.all(entres.table.rows.map(formatRow))
    drinks.table.rows = await Promise.all(drinks.table.rows.map(formatRow))
    await saveAppState({
        entres: new EntresCollection(entres),
        drinks: new DrinksCollection(drinks)
    }, `./src/data/app-state.json`)
}

main()

