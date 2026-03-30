import React from 'react'
import { useState } from 'react'
import { useDispatch} from "react-redux"
import api from "../../api/axios"
import {setUser,setLoading,setError} from "../../features/auth/authSlice"

function SignIn() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = async(e) => {
        try {
            e.preventDefault()
            const formData = {
                email,
                password
            }
            dispatch(setLoading(true))
            const res =await api.post("/api/auth/signin",formData)
            console.log(res)
            dispatch(setUser(res.data.user))
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "An error occurred"))
        }finally{
            dispatch(setLoading(false))
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Sign In</button>
        </form>
    </div>
  )
}

export default SignIn