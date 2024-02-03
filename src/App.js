import React, { useState } from 'react'
import Login from './components/Login'
import Upload from './components/Upload'
import profile from './assets/profile.png'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [pro,setPro]=useState(profile)
  
  const handleLogin = () => {
    setLoggedIn(true)
  }
  const handlePro=(ele)=>{
    setPro(ele)
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin}  onProfile={handlePro}/>} />
        <Route path="/home" element={<Upload loggedIn={loggedIn} onLogin={handleLogin} profile={pro}/>} />
      </Routes>
    </div>
  )
}

export default App
