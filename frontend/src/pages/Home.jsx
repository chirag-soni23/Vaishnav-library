import React from 'react'
import Hero from '../components/Hero'
import Images from '../components/Images'
import Attendance from '../components/Attendance'
import Card from '../components/Card'
import Rules from '../components/Rules'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Images/>
      <Attendance/>
      <Card/>
      <Rules/>
    </div>
  )
}

export default Home