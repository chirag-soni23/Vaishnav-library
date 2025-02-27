import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/register'element={<Register/>}/>
        <Route path='/login'element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App