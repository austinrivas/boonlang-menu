const sheetId = process.env.REACT_APP_GSHEET_ID
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`
const sheetName = 'Entres'
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`
//document.addEventListener('DOMContentLoaded', init)

export default async function init() {
  return await fetch(url)
    .then(res => res.text())
    .then(res => {
      const jsonData = JSON.parse(res.substring(47).slice(0, -2));
      console.log(jsonData)
      return jsonData
    })
}