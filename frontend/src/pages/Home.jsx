import React from 'react'
import Hero from '../components/Hero'
import Images from '../components/Images'
import Attendance from '../components/Attendance'
import Card from '../components/Card'
import Rules from '../components/Rules'
import Contact from '../components/Contact'
import Video from '../components/Video'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <Images />
      <Attendance />
      <Card />
      <Rules />
      <Video />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home