import { MenuCollection } from "./menu-collection"
import { GSheet } from "./gsheet"

export const sheet = new GSheet(process.env.REACT_APP_GSHEET_ID as string, 'Entres')

export class EntresCollection extends MenuCollection {
    name = sheet.sheetName
    sheet = sheet
}