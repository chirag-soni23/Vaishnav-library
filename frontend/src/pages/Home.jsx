import React from 'react'
import Navbar from '../components/Navbar'
import { UserData } from '../context/UserContext'

const Home = () => {
  const {isAuth} = UserData();
  return (
    <>
    {isAuth && <Navbar/>}
     
    </>
  )
}

export default Home