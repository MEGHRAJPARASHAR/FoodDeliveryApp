import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();
const app = express();
    
const port = process.env.PORT || 5000;
console.log("hi my name is meghraj")
app.get('/',(req,res)=>{
    res.send("API is running....")
})
app.listen(port,()=>{
    connectDB()
    console.log(`Server is listening on port ${port}`)
})