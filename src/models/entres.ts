import { MenuCollection } from "./menu-collection"
import { GSheet, IGSheetQueryResponse } from "./gsheet"

interface IEntresSheetResponse extends IGSheetQueryResponse {}

const sheet = new GSheet<IEntresSheetResponse>('Entres')

export class EntresCollection extends MenuCollection<IEntresSheetResponse> {
    name = sheet.sheetName
    sheet = sheet
}