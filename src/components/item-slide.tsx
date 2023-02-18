import { IGSheetRow } from "../models/gsheet"

interface IItemSlideProps {
    item: IGSheetRow
}
  
export function ItemSlide({ item }: IItemSlideProps) {
    const values = []
    if (item.c.length) {
        for (let i = 0; i < item.c.length; i++) {
            const cellValue = item.c[i]
            values.push(<p key={i}>{cellValue.v}</p>)
        }
    }
    const name = item.c[0].v as string
    const price = item.c[1].v as string
    const imageBase64 = item.c[2].v as string
    const imgSrc = `data:image/png;base64,${imageBase64}`
    const style = {height: `100px`, width: `100px`}
    return (
        <>
            <h1>{name} - {price}THB</h1>
            <img src={imgSrc} alt={name} style={style} />
        </>
    )
}