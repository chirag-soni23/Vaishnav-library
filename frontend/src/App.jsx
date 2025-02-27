import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { UserData } from './context/UserContext'
import Loading from './components/Loading'

const App = () => {
  const { isAuth, loading } = UserData();
  return (
    <div>
      <BrowserRouter>
        {loading ? <Loading /> :
          <Routes>
            <Route path='/' element={isAuth ? <Home /> : <Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={isAuth ? <Home/>:<Login/>} />
          </Routes>}
      </BrowserRouter>
    </div>
  )
}

export default App