import React from 'react'
import Navbar from '../component/navbar/Navbar'
import { Outlet } from 'react-router-dom'

function Roots1() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>

  )
}

export default Roots1