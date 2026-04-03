import React, { useState } from 'react'
import { useDispatch} from "react-redux"
import api from "../../api/axios"
import {setUser,setLoading,setError} from "../../features/auth/authSlice"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
function SignUp() {
    const [fullName, setfullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async(e) => {
        e.preventDefault() //prevent default form submission behavior
      // Stop request if password confirmation does not match.
        if(password !== confirmPassword){
            alert("Passwords do not match")
            return
        }
      // Send only the fields expected by the signup API.
        const formData = {
            fullName,
            email,
            password,
            mobile,
            role
        }
        console.log(formData)
        dispatch(setLoading(true)) //setting loading state to true before making API call
        try {
            const res = await api.post("/api/auth/signup", formData)
            console.log(res.data)
        // Save user data in Redux store after successful registration.
            dispatch(setUser(res.data.user))
            toast.success("Signed up successfully!")
            navigate('/') //redirect to dashboard after successful sign-up
        } catch (err) {
            console.error(err.message)
        // Prefer backend error details when available for better feedback.
            dispatch(setError(err.response?.data?.message || "An error occurred"))
            toast.error(err.response?.data?.message || "An error occurred during sign-up")
        } finally{
            dispatch(setLoading(false)) //setting loading state to false after API call is completed, regardless of success or failure
        }
    }

  return (
    <div className="signup bg-gray-950 text-white h-screen flex flex-col items-center justify-center">
      <h1 className='text-3xl inline-block bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>SignUp</h1>      <form onSubmit={handleSubmit} className='flex flex-col gap-2 border border-gray-500 p-4 rounded bg-linear-to-b from-gray-700 to-gray-900'>      
        <input type="text" value={fullName} onChange={(e)=>setfullName(e.target.value)} name="fullName" placeholder="fullName" />
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="Email" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" placeholder="Password" />
        <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} name="confirmPassword" placeholder="Confirm Password" />
      <input type="tel" value={mobile} onChange={(e)=>setMobile(e.target.value)} name="mobile" placeholder="Mobile" />
      <select value={role} onChange={(e)=>setRole(e.target.value)} name="role" className='text-black'>
        <option value="">Select Role</option>
        <option value="user">User</option>
        <option value="owner">Owner</option>
        <option value="deliveryBoy">Delivery Boy</option>
      </select>
      <button type="submit" className='border rounded-2xl bg-gray-900'>Sign Up</button>
    </form>
    
    </div>
  )
}

export default SignUp