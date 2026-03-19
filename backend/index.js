//my dns is creating problem, so using google dns
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
//dotenv is used for .env file
import dotenv from 'dotenv';
//config is used to load the .env file
dotenv.config();
import express from 'express';
//cors is used to allow cross-origin requests for my frontend
import cors from 'cors';
import cookieParser from 'cookie-parser';
//connectDB is used to connect to the database
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import shopRoutes from './routes/shop.routes.js'
import itemRouter from './routes/item.routes.js';
import { authRateLimiter, generalRateLimiter } from './middlewares/rateLimiter.middleware.js';
//signUp is used for user registration
// import { signUp,signIn } from './controllers/auth.controllers.js';

const app = express();
//allowing cross-origin requests from my frontend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
//parsing the incoming request body as json otherwise cannot read the json data from the request body
app.use(express.json());
//parsing the cookies from the incoming request
app.use(cookieParser())
app.use(generalRateLimiter)
//my port 
const port = process.env.PORT || 5000;
//
app.get('/', (req, res) => {
    res.send("API is running....")
});
// //routes for signUp and signIn
// app.post('/api/signup', signUp);
// app.post('/api/signin', signIn);

app.use("/api/auth",authRateLimiter, authRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/item", itemRouter);


//starting the server and connecting to the database
app.listen(port, () => {
    connectDB();
    console.log(`Server is listening on port ${port}`);
});

//24 ->ecommerce exam and oops by java exam
//25 -> .net and ai exam