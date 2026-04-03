import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import ProtectedRoute from './components/ProtectedRoute'
import { useDispatch } from 'react-redux'
import api from './api/axios'
import { setUser } from './features/auth/authSlice'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    api.get("/api/auth/me")
    .then((res) => dispatch(setUser(res.data.user)))
    .catch((err) => console.error(err.message))
  }, [])
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><h1>Home</h1></ProtectedRoute>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  )
}

export default App