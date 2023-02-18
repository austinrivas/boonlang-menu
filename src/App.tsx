import React, { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import { EntresCollection } from "./models/entres"
import { DrinksCollection } from "./models/drinks"
import "swiper/css"
import "swiper/css/pagination"
import "./App.css"

interface IAppState {
  entres: EntresCollection,
  drinks: DrinksCollection
}

export default function App() {
  const [data, setData] = useState<IAppState>({ 
    entres: new EntresCollection(), 
    drinks: new DrinksCollection() 
  })

  useEffect(() => {
    const fetchData = async () => {
      const [entres, drinks] = await Promise.all([
        new EntresCollection().fetch(), 
        new DrinksCollection().fetch()
      ])
      setData({ 
        entres, 
        drinks
      })
    }
    fetchData()
  }, [])

  console.log('data', data)
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
          <Swiper
            className="entre-swiper swiper-v"
            direction={"vertical"}
            spaceBetween={50}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            <SwiperSlide>Entre 1</SwiperSlide>
            <SwiperSlide>Entre 2</SwiperSlide>
            <SwiperSlide>Entre 3</SwiperSlide>
            <SwiperSlide>Entre 4</SwiperSlide>
            <SwiperSlide>Entre 5</SwiperSlide>
          </Swiper>
        </SwiperSlide>
        <SwiperSlide>
          <Swiper
            className="drink-swiper swiper-v"
            direction={"vertical"}
            spaceBetween={50}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            <SwiperSlide>Drink 1</SwiperSlide>
            <SwiperSlide>Drink 2</SwiperSlide>
            <SwiperSlide>Drink 3</SwiperSlide>
            <SwiperSlide>Drink 4</SwiperSlide>
            <SwiperSlide>Drink 5</SwiperSlide>
          </Swiper>
        </SwiperSlide>
        <SwiperSlide>Social Screen</SwiperSlide>
        <SwiperSlide>Kate's Place Promo</SwiperSlide>
        <SwiperSlide>Other Services</SwiperSlide>
      </Swiper>
    </div>
  )
}
