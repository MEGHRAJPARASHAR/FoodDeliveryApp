import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import ProtectedRoute from './components/ProtectedRoute'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><h1>Home</h1></ProtectedRoute>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  )
}

export default App