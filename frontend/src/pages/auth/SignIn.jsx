import React from 'react'
import { useState } from 'react'
import { useDispatch} from "react-redux"
import api from "../../api/axios"
import {setUser,setLoading,setError} from "../../features/auth/authSlice"
import { useNavigate } from 'react-router-dom'

function SignIn() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch() //Dispatch is used to update auth state in Redux.
    const navigate = useNavigate() //Navigate user after successful authentication.
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            // Keep request payload explicit to avoid sending unintended fields.
            const formData = {
                email,
                password
            }
            // Turn on loading before starting network call.
            dispatch(setLoading(true))
            const res =await api.post("/api/auth/signin",formData)
            // Store authenticated user details globally.
            dispatch(setUser(res.data.user))
            navigate('/') //redirect to dashboard after successful sign-in
        } catch (error) {
            // Prefer backend-provided message for clearer feedback.
            dispatch(setError(error.response?.data?.message || "An error occurred"))
        }finally{
            dispatch(setLoading(false)) //setting loading state to false after API call is completed, regardless of success or failure
        }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-500">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-[300px] gap-2 bg-purple-900">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Sign In</button>
        </form>
    </div>
  )
}

export default SignIn