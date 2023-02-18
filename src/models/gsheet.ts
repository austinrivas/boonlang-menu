import fetch from 'node-fetch'

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

export class GSheet {
  private queryString: string = encodeURIComponent('Select *')
  public sheetName: string
  public id: string

  constructor(id: string, sheetName: string) {
    this.id = id
    this.sheetName = sheetName
  }

  private async formatResponse(resp: string): Promise<IGSheetQueryResponse> {
    console.log(resp)
    const jsonData = JSON.parse(resp.substring(47).slice(0, -2))
    return jsonData as IGSheetQueryResponse
  }

  public async query(): Promise<IGSheetQueryResponse> {
    const base = `https://docs.google.com/spreadsheets/d/${this.id}/gviz/tq?`
    const url = `${base}&sheet=${this.sheetName}&tq=${this.queryString}`
    return await fetch(url)
      .then(res => res.text())
      .then(this.formatResponse)
  }
}