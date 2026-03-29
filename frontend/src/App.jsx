import React from 'react'
import { Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/signup" element={<h1>Sign Up</h1>} />
      <Route path="/signin" element={<h1>Sign In</h1>} />
    </Routes>
  )
}

export default App