import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    //these are like useState() ,like for user,isAuthenticated,isLoading
    initialState:{
        user:null,
        isAuthenticated:false,
        isLoading:false,
        error:null
    },
    reducers:{
        //these are like functions like setUsers,logOut,setLoading
        setUser:(state,action)=>{
            
            state.user=action.payload
            state.isAuthenticated=true
        },
        logOut:(state,)=>{
            state.user=null
            state.isAuthenticated=false
        },
        setLoading:(state,action)=>{
            state.isLoading=action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
})

export const{setUser,setLoading,setError,logOut}=authSlice.actions
export default authSlice.reducer
