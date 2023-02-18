export interface IGSheetColumn {
  id: string,
  label: string,
  type: string
}

export interface IGSheetCellValue {
  v: number | string,
  f?: string
}

export interface IGSheetRow {
  c: Array<IGSheetCellValue>
}

export interface IGSheetTable {
  cols: Array<IGSheetColumn>,
  parsedNumHeaders: number,
  rows: Array<IGSheetRow>
}

export interface IGSheetQueryResponse {
  reqId: string,
  sig: string,
  status: string,
  version: string,
  table: IGSheetTable
}

export class GSheet<T extends IGSheetQueryResponse> {
  private sheetId: undefined | string = process.env.REACT_APP_GSHEET_ID
  private queryString: string = encodeURIComponent('Select *')
  public sheetName: string
  public data: null | T

  constructor(sheetName: string) {
    this.sheetName = sheetName
    this.data = null
  }

  private async formatResponse(resp: string): Promise<T> {
    const jsonData = JSON.parse(resp.substring(47).slice(0, -2))
    return jsonData as T
  }

  public async query(): Promise<T> {
    const base = `https://docs.google.com/spreadsheets/d/${this.sheetId}/gviz/tq?`
    const url = `${base}&sheet=${this.sheetName}&tq=${this.queryString}`
    return await fetch(url)
      .then(res => res.text())
      .then(this.formatResponse)
  }
}