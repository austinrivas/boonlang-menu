import { GSheet, IGSheetColumn, IGSheetQueryResponse, IGSheetRow } from './gsheet'

export abstract class MenuCollection {
    public headers: Array<IGSheetColumn>
    public items: Array<IGSheetRow>
    public abstract name: string
    public abstract sheet: GSheet

    constructor(data: IGSheetQueryResponse) {
        this.headers = data.table.cols
        this.items = data.table.rows
    }
}