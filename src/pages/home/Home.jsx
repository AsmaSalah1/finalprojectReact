import React from 'react'
import Categories from '../categore/Categories'
import Swiperr from '../../component/swiper/Swiperr'
import style from './home.module.css'
function Home() {
  return (
    <>
<div className={style.nine}>
  <h1>T-Shop<span>Welcome to our store</span></h1>
</div>

    <Swiperr/>
    <Categories/>

    </>

  )
}

export default Home