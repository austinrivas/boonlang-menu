import { MenuCollection } from "./menu-collection"
import { GSheet, IGSheetQueryResponse } from "./gsheet"

interface IDrinksSheetResponse extends IGSheetQueryResponse {}

const sheet = new GSheet<IDrinksSheetResponse>('Drinks')

export class DrinksCollection extends MenuCollection<IDrinksSheetResponse> {
    name = sheet.sheetName
    sheet = sheet
}