import { useState } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './routes/signUp'
import Login from './routes/Login'
import LandingPage from './routes/LandingPage'
import Home from './routes/Home'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/landingpage" element={<LandingPage/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
