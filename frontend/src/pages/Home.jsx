import React from 'react'
import Hero from '../components/Hero'
import Images from '../components/Images'
import Attendance from '../components/Attendance'
import Card from '../components/Card'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Images/>
      <Attendance/>
      <Card/>
    </div>
  )
}

export default Home