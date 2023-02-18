import { GSheet, IGSheetColumn, IGSheetQueryResponse, IGSheetRow } from './gsheet'

export abstract class MenuCollection<T extends IGSheetQueryResponse> {
    public ready: boolean = false
    public headers: null | Array<IGSheetColumn>
    public items: null | Array<IGSheetRow>
    public abstract name: string
    public abstract sheet: GSheet<T>

    constructor() {
        this.headers = null
        this.items = null
    }

    public async fetch(): Promise<this> {
        const data = await this.sheet.query()
        this.headers = data.table.cols
        this.items = data.table.rows
        this.ready = !!this.items && !!this.headers
        return this
    }
}