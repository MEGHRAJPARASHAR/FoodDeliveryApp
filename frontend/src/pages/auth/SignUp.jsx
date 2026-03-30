import React, { useState } from 'react'
import { useDispatch} from "react-redux"
import api from "../../api/axios"
import {setUser,setLoading,setError} from "../../features/auth/authSlice"
function SignUp() {
    const [fullName, setfullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [role, setRole] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            alert("Passwords do not match")
            return
        }
        const formData = {
            fullName,
            email,
            password,
            mobile,
            role
        }
        console.log(formData)
        dispatch(setLoading(true))
        try {
            const res = await api.post("/api/auth/signup", formData)
            console.log(res.data)
            dispatch(setUser(res.data.user))
        } catch (err) {
            console.error(err.message)
            dispatch(setError(err.response?.data?.message || "An error occurred"))
        } finally{
            dispatch(setLoading(false))
        }
    }

  return (
    <div className="signup bg-black text-white h-screen flex flex-col items-center justify-center">
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 border-[1px] border-gray-500 p-4 rounded linear-gradient-to-r from-gray-100 to-gray-900'>
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
      <button type="submit" className='border-1 rounded-2xl bg-gray-900'>Sign Up</button>
    </form>
    
    </div>
  )
}

export default SignUp