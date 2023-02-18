import { MenuCollection } from "./menu-collection"
import { GSheet } from "./gsheet"

const sheet = new GSheet(process.env.REACT_APP_GSHEET_ID as string, 'Drinks')

export class DrinksCollection extends MenuCollection {
    name = sheet.sheetName
    sheet = sheet
}