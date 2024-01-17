import React from 'react'
import { NavFooter } from '../components/NavBar/NavFooter'
import { NavHeader } from '../components/NavBar/NavHeader'
import { HomeBody } from '../components/HomeBody'

export const Home = () => {
  return (
    <>
        <NavHeader />
        <HomeBody />
        <NavFooter />
    </>
  )
}
