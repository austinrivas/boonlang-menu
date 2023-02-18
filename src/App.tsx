import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import { isAppState } from "./models/app-state"
import { CollectionSlider } from "./components/collection-slider"
import "swiper/css"
import "swiper/css/pagination"
import "./App.css"

import AppState from './data/app-state.json'

export default function App() {
  if (!isAppState(AppState)) throw new Error('Invalid AppState')
  console.log('AppState', AppState)
  return (
    <div id="app">
      <Swiper
        className="menu-swiper swiper-h"
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        <SwiperSlide>Demo - Welcome Screen</SwiperSlide>
        <SwiperSlide>
          <CollectionSlider collection={AppState.entres} />
        </SwiperSlide>
        <SwiperSlide>
          <CollectionSlider collection={AppState.drinks} />
        </SwiperSlide>
        <SwiperSlide>Social Screen</SwiperSlide>
        <SwiperSlide>Kate's Place Promo</SwiperSlide>
        <SwiperSlide>Other Services</SwiperSlide>
      </Swiper>
    </div>
  )
}
