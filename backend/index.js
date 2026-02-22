import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);//my dns is creating problem, so using google dns
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("API is running....")
});

app.listen(port, () => {
    connectDB();
    console.log(`Server is listening on port ${port}`);
});

//24 ->ecommerce exam and oops by java exam
//25 -> .net and ai exam