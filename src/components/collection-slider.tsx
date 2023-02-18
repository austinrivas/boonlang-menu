import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { MenuCollection } from "../models/menu-collection"
import { ItemSlide } from './item-slide'

interface ICollectionSliderProps {
    collection: MenuCollection
}
  
export function CollectionSlider({ collection }: ICollectionSliderProps) {
    const styleName = CSS.escape(`${collection.name}-swiper`).toLowerCase()
    const items = []
    if (collection.items?.length) {
        for (let i = 0; i < collection.items.length; i++) {
            items.push(<SwiperSlide key={i}><ItemSlide item={collection.items[i]}/></SwiperSlide>);
        }
    }
    return (
        <Swiper
            className={`${styleName} swiper-v`}
            direction={"vertical"}
            spaceBetween={50}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            >
            <SwiperSlide>{collection.name}</SwiperSlide>
            {items}
        </Swiper>
    )
}