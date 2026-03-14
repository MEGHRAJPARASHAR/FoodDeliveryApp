# 🍔 Food Delivery App — Complete Project Notes

> **What is this?** This is a full-stack (frontend + backend) Food Delivery Application — think of it like building your own mini Zomato/Swiggy from scratch!
>
> These notes explain **everything** step by step so that even if you've never written code before, you can follow along and understand what's happening and **why**.

---

## 📋 Table of Contents

1. [What Are We Building?](#-what-are-we-building)
2. [Tech Stack — The Tools We Use](#-tech-stack--the-tools-we-use)
3. [How the App Works (Big Picture)](#-how-the-app-works-big-picture)
4. [PHASE 1 — Project Setup & Dependencies](#-phase-1--project-setup--dependencies)
5. [PHASE 2 — The Backend Server (Express)](#-phase-2--the-backend-server-express)
6. [PHASE 3 — Database Connection (MongoDB)](#-phase-3--database-connection-mongodb)
7. [PHASE 4 — User Model (Blueprint)](#-phase-4--user-model-blueprint)
8. [PHASE 5 — Authentication (SignUp, SignIn, Logout)](#-phase-5--authentication-signup-signin-logout)
9. [PHASE 6 — Middlewares (Security Guards)](#-phase-6--middlewares-security-guards)
10. [PHASE 7 — Routes (URL Paths)](#-phase-7--routes-url-paths)
11. [PHASE 8 — Utility Helpers (Token & Email)](#-phase-8--utility-helpers-token--email)
12. [PHASE 9 — Forgot Password & OTP](#-phase-9--forgot-password--otp)
13. [PHASE 10 — Frontend Setup (React + Vite)](#-phase-10--frontend-setup-react--vite)
14. [PHASE 11 — SignUp & SignIn Page (Frontend)](#-phase-11--signup--signin-page-frontend)
15. [What's Coming Next?](#-whats-coming-next)
16. [Folder Structure Cheat Sheet](#-folder-structure-cheat-sheet)
17. [Quick Glossary (Jargon Buster)](#-quick-glossary-jargon-buster)

---

## 🎯 What Are We Building?

A **Food Delivery App** with three types of users:

| Role | What They Do |
|---|---|
| 🧑 **User (Customer)** | Browse restaurants, order food, track delivery |
| 🏪 **Owner (Restaurant)** | Add their restaurant, manage menu & orders |
| 🚴 **Delivery Boy** | Accept delivery requests, deliver food |

The app has two halves:

- **Backend** (the brain) — handles all the logic, stores data, manages users
- **Frontend** (the face) — what users actually see and click on in the browser

---

## 🛠 Tech Stack — The Tools We Use

### Backend (Server Side)

| Tool | What It Does | Real-Life Analogy |
|---|---|---|
| **Node.js** | Lets us run JavaScript outside the browser | The engine of a car |
| **Express.js** | A framework that makes building servers easy | The steering wheel — makes driving (coding) easier |
| **MongoDB** | A database — stores all our data (users, orders, etc.) | A giant filing cabinet |
| **Mongoose** | Helps us talk to MongoDB easily from our code | The filing clerk who organizes the cabinet |
| **bcryptjs** | Encrypts (hashes) passwords so nobody can read them | A paper shredder for passwords — one-way only |
| **jsonwebtoken (JWT)** | Creates a "pass" (token) that proves a user is logged in | A movie ticket — proves you paid |
| **dotenv** | Loads secret keys from a `.env` file | A secret diary — only you can read it |
| **cookie-parser** | Reads cookies sent by the browser | Reading the stamp on your hand at a club |
| **cors** | Allows the frontend (different address) to talk to backend | A guest pass that lets your friend into your building |
| **nodemailer** | Sends emails (like OTP for password reset) | The app's personal postman |
| **nodemon** | Auto-restarts the server when you save a file | A watchdog that says "something changed, restart!" |

### Frontend (Client Side)

| Tool | What It Does | Real-Life Analogy |
|---|---|---|
| **React** | A library for building user interfaces | LEGO blocks — you build pages from small pieces |
| **Vite** | Super-fast development server & build tool | A turbo engine for React — makes development fast |
| **Tailwind CSS** | Lets you style HTML with small class names | A wardrobe where each piece of clothing = one style |
| **Axios** | Makes HTTP requests to the backend | A messenger pigeon carrying data back and forth |
| **React Router DOM** | Enables page navigation without reloading | A teleportation door — switches pages instantly |

---

## 🌐 How the App Works (Big Picture)

```
┌──────────────────┐         HTTP Requests        ┌──────────────────┐
│                  │  ─────────────────────────▶  │                  │
│   FRONTEND       │     (e.g., "Sign me up!")     │   BACKEND        │
│   (React App)    │                               │   (Express API)  │
│                  │  ◀─────────────────────────  │                  │
│   localhost:5173  │     JSON Response             │   localhost:3000  │
└──────────────────┘    (e.g., {user: ...})        └────────┬─────────┘
                                                            │
                                                            │ Mongoose
                                                            ▼
                                                   ┌──────────────────┐
                                                   │   MONGODB        │
                                                   │   (Database)     │
                                                   │   Cloud Atlas    │
                                                   └──────────────────┘
```

**In simple words:**
1. The user clicks a button on the **Frontend** (React)
2. React sends a request to the **Backend** (Express server)
3. The Backend processes it (checks password, saves data, etc.)
4. It talks to **MongoDB** (the database) to store/retrieve data
5. The Backend sends a response back to the Frontend
6. The Frontend shows the result to the user

---

## 📦 PHASE 1 — Project Setup & Dependencies

### What Are We Doing?
Setting up two separate projects — one for backend, one for frontend — and installing all the tools (packages) we need.

---

### Step 1: Create the Backend Folder & Initialize

Open your **terminal** (Command Prompt / PowerShell / VS Code terminal) and run:

```bash
mkdir backend
cd backend
npm init -y
```

**What these commands do:**
- `mkdir backend` → Creates a new folder called "backend"
- `cd backend` → Goes inside that folder
- `npm init -y` → Creates a `package.json` file (a recipe card that lists all the tools our project uses). The `-y` flag means "say yes to all default options"

---

### Step 2: Install Required Packages

```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cors cookie-parser nodemailer
npm install --save-dev nodemon
```

**What this installs:**
- The first line installs all the tools our app needs to **run**
- The second line installs `nodemon` as a **dev dependency** (only needed while developing, not in production)

---

### Step 3: Enable ES Modules

In `package.json`, we added:

```json
"type": "module"
```

**Why?** By default, Node.js uses an older way to import files (`require()`). Adding `"type": "module"` lets us use the modern way: `import ... from ...` — which is cleaner and matches how React works.

---

### Step 4: Add Start Scripts

In `package.json`, inside `"scripts"`:

```json
"scripts": {
  "dev": "nodemon index.js"
}
```

Now when you run `npm run dev`, it starts the server using **nodemon**, which auto-restarts every time you save a file. No need to manually stop and restart!

---

### Our `package.json` looks like this:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongodb": "^7.1.0",
    "mongoose": "^9.1.5",
    "nodemailer": "^8.0.1",
    "nodemon": "^3.1.11"
  }
}
```

---

## 🖥 PHASE 2 — The Backend Server (Express)

### What is Express?
Express is a **framework** — it gives us ready-made tools to create a web server without writing hundreds of lines of code. Think of it as a **recipe template**: you just fill in your own ingredients (routes, logic, etc.).

### File: `backend/index.js`

This is the **main entry point** — the first file that runs when you start the server.

```javascript
// ─── Fix for DNS issues ────────────────────────────────────────────────
// If your internet has DNS problems, this forces Node.js to use Google's DNS
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

// ─── Load Environment Variables ────────────────────────────────────────
// dotenv reads the .env file and puts those values into process.env
// MUST be loaded before anything else that uses process.env
import dotenv from 'dotenv';
dotenv.config();

// ─── Import Libraries ──────────────────────────────────────────────────
import express from 'express';        // The web framework
import cors from 'cors';              // Allows frontend to talk to backend
import cookieParser from 'cookie-parser'; // Reads cookies from requests
import connectDB from './config/db.js';    // Our database connection function
import authRoutes from './routes/auth.routes.js'; // All auth-related routes

// ─── Create the App ────────────────────────────────────────────────────
const app = express();

// ─── Middleware Setup ──────────────────────────────────────────────────
// These run on EVERY request before it reaches our routes

// CORS: Only allow requests from our React frontend (localhost:5173)
// credentials: true → allows cookies to be sent across origins
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// This tells Express: "Hey, when someone sends JSON data, parse it so
// I can read it in req.body"
app.use(express.json());

// This reads cookies from the incoming request so we can access them
// via req.cookies
app.use(cookieParser());

// ─── Define the Port ───────────────────────────────────────────────────
// Use the port from .env file, or default to 5000
const port = process.env.PORT || 5000;

// ─── Test Route ────────────────────────────────────────────────────────
// If you go to http://localhost:3000/ in your browser, you'll see this message
app.get('/', (req, res) => {
    res.send("API is running....");
});

// ─── Connect Auth Routes ───────────────────────────────────────────────
// All routes starting with /api/ will be handled by authRoutes
// e.g., /api/signup, /api/signin, /api/me, /api/logout
app.use("/api/", authRoutes);

// ─── Start the Server ──────────────────────────────────────────────────
app.listen(port, () => {
    connectDB();  // Connect to MongoDB when server starts
    console.log(`Server is listening on port ${port}`);
});
```

### Line-by-Line Breakdown:

| Line | What It Does |
|---|---|
| `import express from 'express'` | Brings in the Express library |
| `const app = express()` | Creates our server application |
| `app.use(cors({...}))` | Allows our React frontend to send requests |
| `app.use(express.json())` | Lets us read JSON data sent in requests (like form data) |
| `app.use(cookieParser())` | Lets us read cookies (where we store login tokens) |
| `app.get('/', ...)` | Creates a test page at the root URL |
| `app.use("/api/", authRoutes)` | Connects all authentication routes under /api/ |
| `app.listen(port, ...)` | Starts the server and connects to the database |

> **To run:** Type `npm run dev` in the backend folder. Visit `http://localhost:3000/` and you'll see **"API is running...."**

---

## 🗄 PHASE 3 — Database Connection (MongoDB)

### What is MongoDB?
MongoDB is a **NoSQL database** — it stores data in **documents** (like JSON objects) instead of tables. Think of it as a big notebook where each page is a user/order/restaurant.

We use **MongoDB Atlas** (cloud version) so we don't need to install anything on our computer.

### Step 1: Create a `.env` File

In the `backend/` folder, create a file called `.env`:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/foodDelivery?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=your_super_secret_key_change_this
EMAIL=your_email@gmail.com
PASS=your_app_password
```

**What is `.env`?**
- It's a file that stores **secret information** (passwords, API keys, etc.)
- It should **NEVER** be uploaded to GitHub (add it to `.gitignore`)
- `dotenv` reads this file and makes these values available as `process.env.MONGODB_URI`, `process.env.PORT`, etc.

> ⚠️ **Important:** Replace the placeholders with your **actual** MongoDB URI, email, and password!

---

### Step 2: The Database Connection Function

### File: `backend/config/db.js`

```javascript
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // mongoose.connect() connects to the MongoDB database
        // process.env.MONGODB_URI = the connection string from .env file
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("db connect");
    } catch (error) {
        console.log("DB ERROR \n", error);
    }
};

export default connectDB;
```

**What's happening:**
1. We import `mongoose` (the tool that helps us talk to MongoDB)
2. We create an `async` function (because connecting to a database takes time — it's not instant)
3. Inside `try`, we attempt to connect. If it works → "db connect" is printed
4. If it fails, the `catch` block prints the error so we know what went wrong
5. We `export` it so we can use it in `index.js`

> **What is `async/await`?**
> Some things in programming take time (like connecting to a database, fetching data from the internet). `async/await` is a way to say: "Hey, wait for this to finish before moving on." Without it, JavaScript would move on before the connection is made.

---

## 👤 PHASE 4 — User Model (Blueprint)

### What is a Model?
A **model** is like a **blueprint** or **form template**. Just like a school admission form has fixed fields (Name, Age, Address), our User Model defines what information every user must have.

### File: `backend/models/user.model.js`

```javascript
import mongoose from "mongoose";

// ─── Define the Schema (Blueprint) ─────────────────────────────────────
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,      // Text value
        required: true      // Must be provided (can't be empty)
    },
    email: {
        type: String,
        required: true,
        unique: true        // No two users can have the same email
    },
    password: {
        type: String,       // Will store the HASHED (encrypted) password
    },
    mobile: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "owner", "deliveryBoy"],  // Can ONLY be one of these 3
        required: true
    },
    otp: {
        type: String,       // For password reset OTP
    },
    otpExpiry: {
        type: Date,         // When the OTP expires
    }
}, { timestamps: true });
// timestamps: true → automatically adds "createdAt" and "updatedAt" fields

// ─── Create the Model ──────────────────────────────────────────────────
const User = mongoose.model("User", userSchema);
// This creates a "users" collection in MongoDB (it auto-pluralizes "User")

export default User;
```

**Breaking it down:**

| Field | Type | Rule | Why |
|---|---|---|---|
| `fullName` | String | Required | We need the user's name |
| `email` | String | Required + Unique | No duplicate accounts |
| `password` | String | — | Stored as encrypted hash |
| `mobile` | String | Required | Contact number |
| `role` | String | Must be "user", "owner", or "deliveryBoy" | Controls what the user can do |
| `otp` | String | Optional | Stores the OTP for forgot password |
| `otpExpiry` | Date | Optional | When the OTP should stop working |

> **What is `enum`?**
> `enum` means "only these values are allowed." If someone tries to set role to "admin" or "hacker", MongoDB will reject it.

> **What is `timestamps: true`?**
> It automatically adds two fields to every user document:
> - `createdAt` — when the account was created
> - `updatedAt` — when it was last modified

---

## 🔐 PHASE 5 — Authentication (SignUp, SignIn, Logout)

### What is Authentication?
Authentication = **"Who are you?"**
It's the process of verifying a user's identity. When you log in with email + password, the app checks if you're who you claim to be.

### File: `backend/controllers/auth.controller.js`

Controllers contain the **actual logic** — what happens when someone hits a specific URL.

---

### 5A: Sign Up (Register a New User)

```javascript
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { sendOTPEmail } from "../utils/sendEmail.js";

export const signUp = async (req, res) => {
    try {
        // ─── Step 1: Get data from the request ─────────────────────────
        // When the frontend sends a signup form, all the data comes in req.body
        const { fullName, email, password, mobile, role } = req.body;

        // ─── Step 2: Check if user already exists ──────────────────────
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exist." });
        }

        // ─── Step 3: Validate password length ──────────────────────────
        if (password.length < 6) {
            return res.status(401).json({ message: "the password is less than 6" });
        }

        // ─── Step 4: Validate mobile number length ─────────────────────
        if (mobile.length < 10) {
            return res.status(400).json({ message: "the mobile number is less than 10 digits" });
        }

        // ─── Step 5: Hash (encrypt) the password ───────────────────────
        // bcrypt.hash(password, 10) → 10 is the "salt rounds"
        // This turns "mypassword" into something like "$2a$10$X7jZ..."
        // Even if someone steals the database, they can't read passwords!
        const hashedPassword = await bcrypt.hash(password, 10);

        // ─── Step 6: Create the user in the database ───────────────────
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,  // Save the HASHED password, NOT the real one
            mobile,
            role
        });

        // ─── Step 7: Generate a JWT token ──────────────────────────────
        // This is like giving the user a "movie ticket" that proves they're logged in
        const token = generateToken(newUser._id);

        // ─── Step 8: Send the token as a cookie ────────────────────────
        res.cookie("token", token, {
            httpOnly: true,     // JavaScript in browser CANNOT access this cookie (security!)
            secure: false,      // Set to true in production (HTTPS only)
            sameSite: "strict", // Cookie only sent to same site (prevents attacks)
            maxAge: 15 * 24 * 60 * 60 * 1000  // Expires in 15 days (in milliseconds)
        });

        // ─── Step 9: Send response WITHOUT the password ────────────────
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        // This clever trick:
        // 1. Converts the MongoDB document to a plain JS object
        // 2. Pulls out "password" and throws it away (stores in _ which we ignore)
        // 3. Puts everything ELSE into userWithoutPassword
        // Now we can safely send user data to the frontend!

        res.status(201).json({
            message: "User created successfully",
            user: userWithoutPassword
        });

    } catch (error) {
        console.log("error in signUp", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
```

**The SignUp Flow (Visual):**

```
User fills form → Frontend sends data → Backend receives it
                                              │
                                    ┌─────────▼─────────┐
                                    │ Does email exist?  │
                                    └────┬──────────┬────┘
                                    YES  │          │ NO
                                         │          │
                                 Return Error    Continue
                                              │
                                    ┌─────────▼─────────┐
                                    │ Hash the password  │
                                    └─────────┬─────────┘
                                              │
                                    ┌─────────▼─────────┐
                                    │ Save user to DB    │
                                    └─────────┬─────────┘
                                              │
                                    ┌─────────▼─────────┐
                                    │ Generate JWT token │
                                    └─────────┬─────────┘
                                              │
                                    ┌─────────▼─────────┐
                                    │ Send cookie + data │
                                    └───────────────────┘
```

---

### 5B: Sign In (Login)

```javascript
export const signIn = async (req, res) => {
    try {
        // ─── Step 1: Get email and password from the form ──────────────
        const { email, password } = req.body;

        // ─── Step 2: Find the user by email ────────────────────────────
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist." });
        }

        // ─── Step 3: Compare passwords ─────────────────────────────────
        // bcrypt.compare() takes the plain password the user typed
        // and compares it with the hashed password stored in the database
        // It returns true or false
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // ─── Step 4: Generate token and send cookie ────────────────────
        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 15 * 24 * 60 * 60 * 1000
        });

        // ─── Step 5: Send user data (without password) ─────────────────
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({
            message: "User signed in successfully",
            user: userWithoutPassword
        });

    } catch (error) {
        console.log("error in signIn", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
```

> **Note:** We say "Invalid credentials" instead of "Wrong password" — this way hackers can't figure out if the email exists or not!

---

### 5C: Get Me (Get Current User Profile)

```javascript
export const getMe = async (req, res) => {
    try {
        // req.user was set by the protectRoute middleware (see Phase 6)
        // So we just send it back!
        res.status(200).json({ user: req.user });
    } catch (error) {
        console.log("error in getMe", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
```

This is a **protected route** — only logged-in users can access it. The middleware (security guard) checks the token first and attaches the user data to `req.user`.

---

### 5D: Log Out

```javascript
export const logOut = async (req, res) => {
    try {
        // Simply clear the "token" cookie — poof, user is logged out!
        res.clearCookie("token");
        res.status(200).json({ message: "the user logged out successfully" });
    } catch (error) {
        console.log(`the error is in logout function ${error}`);
        res.status(400).json({ message: "error in logout" });
    }
};
```

> **How does logout work?** Remember the "movie ticket" (JWT token) we gave during login? Logout = **throwing the ticket in the trash** (clearing the cookie). The cinema (server) won't let you in without a ticket.

---

### 5E: Forgot Password (Send OTP)

```javascript
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // ─── Step 1: Find the user ────────────────────────────────────
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "user not found" });
        }

        // ─── Step 2: Generate a 6-digit OTP ───────────────────────────
        // Math.random() gives a number between 0 and 1
        // We multiply by 900000 and add 100000 to get a 6-digit number
        const otp = Math.floor(100000 + Math.random() * 900000);

        // ─── Step 3: Save OTP to the user's record in DB ──────────────
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
        await user.save();

        // ─── Step 4: Send the OTP via email ────────────────────────────
        await sendOTPEmail(email, otp);

        res.status(200).json({ message: "otp is sent successfully" });

    } catch (error) {
        return res.status(400).json({ message: "error in forgot password" });
    }
};
```

---

## 🛡 PHASE 6 — Middlewares (Security Guards)

### What is a Middleware?
A **middleware** is like a **security guard** at the entrance of a building. Before any request reaches your actual route (the room), it passes through middleware first. The middleware can:
- ✅ Let it pass (`next()`)
- ❌ Block it (send an error response)
- 📝 Modify it (add extra info to the request)

```
Request → [Middleware 1] → [Middleware 2] → Route Handler → Response
             (CORS)        (Auth Check)     (Your logic)
```

---

### 6A: Auth Middleware (Token Checker)

### File: `backend/middlewares/auth.middleware.js`

```javascript
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // ─── Step 1: Get the token from cookies ────────────────────────
        const token = req.cookies.token;

        // ─── Step 2: If no token, user is not logged in ────────────────
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access, No token found" });
        }

        // ─── Step 3: Verify the token ──────────────────────────────────
        // jwt.verify() checks if the token is valid and not expired
        // If someone tampered with it, this will throw an error
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ─── Step 4: Find the user and attach to request ───────────────
        // .select('-password') means "get everything EXCEPT password"
        const user = await User.findById(decoded.id).select('-password');

        // ─── Step 5: Attach user to request ────────────────────────────
        req.user = user;

        // ─── Step 6: Pass to the next middleware or route ──────────────
        next();

    } catch (error) {
        console.log(`error in server ${error}`);
        res.status(401).json({ message: "error in protected routes" });
    }
};
```

**How it works (Visual):**

```
Request with cookie → protectRoute middleware
                           │
                ┌──────────▼──────────┐
                │ Has a token cookie?  │
                └───┬─────────────┬───┘
                NO  │             │ YES
                    │             │
            Send 401 Error    Verify token
                              │
                    ┌─────────▼─────────┐
                    │ Token is valid?    │
                    └──┬────────────┬───┘
                   NO  │            │ YES
                       │            │
               Send 401 Error    Find user in DB
                                 │
                       ┌─────────▼──────────┐
                       │ Attach user to req  │
                       │ Call next()         │
                       └────────────────────┘
```

---

### 6B: Role Checker Middleware

### File: `backend/middlewares/checkRole.middleware.js`

```javascript
export const checkRole = (role) => {        // Outer function: receives the required role
    return (req, res, next) => {             // Inner function: the actual middleware
        if (req.user.role !== role) {
            return res.status(403).json({ message: "forbidden" });
        }
        next();  // Role matches, let them through!
    };
};
```

**What's the trick here?**
This is a **function that returns a function** (called a "Higher Order Function"). Here's why:

- Middlewares always look like `(req, res, next) => { ... }`
- But we also need to pass a **role** parameter
- So we wrap it: `checkRole("owner")` returns a middleware function that checks for the "owner" role

**Example usage:**
```javascript
// Only users with role "user" can access /me
router.get("/me", protectRoute, checkRole("user"), getMe);

// Only restaurant owners can access /add-restaurant
router.post("/add-restaurant", protectRoute, checkRole("owner"), addRestaurant);
```

---

## 🛣 PHASE 7 — Routes (URL Paths)

### What are Routes?
Routes are the **URLs** your API responds to. Think of them as **doors** in a building — each door leads to a different room (function).

### File: `backend/routes/auth.routes.js`

```javascript
import express from "express";
import { signIn, signUp, getMe, logOut, forgotPassword } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";

const router = express.Router();

// ─── Public Routes (No login needed) ──────────────────────────────────
router.post("/signup", signUp);              // POST /api/signup
router.post("/signin", signIn);              // POST /api/signin
router.post("/forgot-password", forgotPassword); // POST /api/forgot-password

// ─── Protected Routes (Must be logged in) ─────────────────────────────
router.get("/me", protectRoute, checkRole("user"), getMe);  // GET /api/me
router.post("/logout", logOut);              // POST /api/logout

export default router;
```

### Route Summary Table:

| Method | URL | Auth Needed? | Role | What It Does |
|---|---|---|---|---|
| POST | `/api/signup` | ❌ No | Any | Create a new account |
| POST | `/api/signin` | ❌ No | Any | Login to existing account |
| GET | `/api/me` | ✅ Yes | User | Get logged-in user's profile |
| POST | `/api/logout` | ❌ No | Any | Logout (clear cookie) |
| POST | `/api/forgot-password` | ❌ No | Any | Send OTP to email |

> **POST vs GET:**
> - **GET** = "Give me data" (like reading a book)
> - **POST** = "Here's some data, process it" (like submitting a form)

---

## 🔧 PHASE 8 — Utility Helpers (Token & Email)

### 8A: JWT Token Generator

### File: `backend/utils/generateToken.js`

```javascript
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },         // Payload: data stored inside the token
        process.env.JWT_SECRET,  // Secret key: used to sign/verify the token
        { expiresIn: "3d" }      // Expires in 3 days
    );
};

export default generateToken;
```

**What is a JWT Token?**
JWT = **JSON Web Token**. It's like a **stamped wristband** at a concert:
- When you enter (login), you get a wristband (token)
- Every time you go to the VIP area (protected route), security checks your wristband
- After 3 days, the wristband expires and you need a new one (login again)

A JWT has 3 parts: `header.payload.signature`
- **Header**: Says it's a JWT and what algorithm is used
- **Payload**: Contains `{ id: userId }` — the user's ID
- **Signature**: A secret stamp that proves the token wasn't tampered with

---

### 8B: Email Sender (Nodemailer)

### File: `backend/utils/sendEmail.js`

```javascript
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// ─── Create a Transporter (the email sender) ──────────────────────────
const transporter = nodemailer.createTransport({
    service: "Gmail",         // Using Gmail to send emails
    auth: {
        user: process.env.EMAIL,  // Your Gmail address (from .env)
        pass: process.env.PASS    // Your App Password (from .env)
    }
});

// ─── Function to Send OTP Email ────────────────────────────────────────
export const sendOTPEmail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL,                    // Sender
        to: to,                                      // Recipient
        subject: "Password Reset OTP",               // Email subject
        text: `Your OTP is: ${otp}. It expires in 10 minutes.`  // Email body
    });
};

export default transporter;
```

> **What is an App Password?**
> Gmail doesn't let apps use your real password for security reasons. Instead, go to Google Account → Security → App Passwords → Generate one. Use THAT password in the `.env` file.

---

## 🔑 PHASE 9 — Forgot Password & OTP

### How Forgot Password Works (Full Flow):

```
User clicks "Forgot Password"
        │
        ▼
Enters their email on the frontend
        │
        ▼
Frontend sends POST /api/forgot-password { email }
        │
        ▼
Backend finds user by email
        │
        ▼
Backend generates 6-digit OTP (e.g., 493821)
        │
        ▼
Saves OTP + expiry (10 min) to user record in DB
        │
        ▼
Sends OTP to user's email via Nodemailer
        │
        ▼
User checks email, enters OTP on frontend
        │
        ▼
(🔜 Coming next: Verify OTP & Reset Password)
```

---

## ⚛️ PHASE 10 — Frontend Setup (React + Vite)

### What is React?
React is a **JavaScript library** for building user interfaces. Instead of building one giant HTML page, you build **small reusable components** (like LEGO blocks) and combine them.

### What is Vite?
Vite is a **build tool** — it starts a super-fast development server and compiles your React code. It's much faster than the older tool (Create React App).

---

### Step 1: Create the Frontend

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

### Step 2: Install Additional Packages

```bash
npm install axios react-router-dom
npm install tailwindcss @tailwindcss/vite
```

### Step 3: Our Frontend `package.json`

```json
{
  "name": "frontend",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.2.0",
    "axios": "^1.13.6",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.13.1",
    "tailwindcss": "^4.2.0"
  }
}
```

---

### Step 4: Entry Point (`main.jsx`)

### File: `frontend/src/main.jsx`

```jsx
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

**What's happening:**
- `createRoot` → Creates the root of our React app
- `BrowserRouter` → Wraps the app to enable page navigation (routing)
- `document.getElementById('root')` → Finds the `<div id="root">` in `index.html` and puts our React app inside it

---

### Step 5: App Component (`App.jsx`)

### File: `frontend/src/App.jsx`

```jsx
import './App.css';
import SignUp from './PAGES/SignUp';
import { Routes, Route } from 'react-router-dom';

// The base URL for all API calls to our backend
export const API_URL = "http://localhost:3000/api";

function App() {
  return (
    <>
      <Routes>
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
```

**What's happening:**
- `API_URL` → A constant that holds our backend URL so we don't repeat it everywhere
- `Routes` + `Route` → Defines which component shows at which URL
- When user visits `/signUp`, the `<SignUp />` component is displayed

---

## 📝 PHASE 11 — SignUp & SignIn Page (Frontend)

### File: `frontend/src/PAGES/SignUp.jsx`

This is the most complex frontend file so far. It has **both SignUp and SignIn** forms in one page, switched by a toggle button.

```jsx
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../App";

export default function SignUp() {
  // ─── State Variables ─────────────────────────────────────────────────
  // useState is React's way of storing data that can change
  // When state changes, the page automatically re-renders (updates)

  const [active, setActive] = useState(true);        // true = SignUp form, false = SignIn form
  const [email, setEmail] = useState("");              // Stores email input
  const [password, setPassword] = useState("");        // Stores password input
  const [fullName, setFullName] = useState("");        // Stores name input
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password
  const [mobile, setMobile] = useState("");            // Stores mobile input
  const [role, setRole] = useState("user");            // Default role is "user"

  // ─── Sign Up Function ────────────────────────────────────────────────
  const handleSignUp = async () => {
    try {
      // Check if passwords match
      if (password !== confirmPassword) return alert("Passwords do not match");

      // Send POST request to backend /api/signup
      const result = await axios.post(`${API_URL}/signup`, {
        email, password, fullName, mobile, role
      }, { withCredentials: true });
      // withCredentials: true → sends and receives cookies

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // ─── Sign In Function ────────────────────────────────────────────────
  const handleSignIn = async () => {
    try {
      const result = await axios.post(`${API_URL}/signin`, {
        email, password
      }, { withCredentials: true });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // ─── The UI (What the User Sees) ─────────────────────────────────────
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-b from-black to-purple-900">
      <div className="bg-neutral-800 w-full max-w-md rounded-2xl p-4 flex flex-col gap-4">

        {/* ── Toggle Buttons (SignUp / SignIn) ─────────────── */}
        <div className="nav flex justify-between px-3 items-center">
          <div className="flex border-2 border-black p-1 rounded-2xl gap-2 bg-black text-white">
            <button
              className={active ? "bg-white p-1 text-black rounded-2xl" : ""}
              onClick={() => setActive(true)}
            >
              signup
            </button>
            <button
              className={!active ? "bg-white p-1 text-black rounded-2xl" : ""}
              onClick={() => setActive(false)}
            >
              signin
            </button>
          </div>
          <button className="bg-neutral-600 rounded-full w-7 h-7 text-white text-sm">✕</button>
        </div>

        {/* ── Conditional Rendering ───────────────────────── */}
        {/* If active is true → show SignUp form */}
        {/* If active is false → show SignIn form */}

        {active ? (
          <>
            <h1 className="text-white text-xl">Create an Account</h1>
            {/* Full Name, Email, Password, Confirm Password, Mobile, Role inputs */}
            {/* ... (all the input fields) ... */}
            <button onClick={handleSignUp}>Create an account</button>
            {/* Google & Apple sign-in buttons */}
          </>
        ) : (
          <>
            <h1 className="text-white text-xl">Already have an Account</h1>
            {/* Email & Password inputs only */}
            {/* ... (sign in fields) ... */}
            <button onClick={handleSignIn}>Sign in</button>
          </>
        )}
      </div>
    </div>
  );
}
```

### Key Concepts Used:

| Concept | Explanation |
|---|---|
| `useState` | Stores changeable data. When data changes, React re-renders the component |
| `axios.post(url, data)` | Sends data to the backend (like submitting a form) |
| `withCredentials: true` | Allows cookies to be sent with the request (needed for auth) |
| Conditional Rendering `{active ? (...) : (...)}` | Shows different content based on a condition |
| `onChange={(e) => setEmail(e.target.value)}` | Updates state every time the user types in the input |
| Tailwind classes | `bg-neutral-800` = dark background, `rounded-2xl` = rounded corners, etc. |

---

## 🔮 What's Coming Next?

Here's the roadmap of features still to be built:

### 🟡 Backend — Coming Up

| # | Feature | Description |
|---|---|---|
| 1 | **Verify OTP & Reset Password** | User enters OTP, backend verifies it, allows password change |
| 2 | **Restaurant Model** | Blueprint for restaurants (name, address, menu, owner, image, etc.) |
| 3 | **Menu Item Model** | Blueprint for food items (name, price, category, image, restaurant) |
| 4 | **Order Model** | Blueprint for orders (user, items, total, status, deliveryBoy) |
| 5 | **Restaurant Controller** | Create, Read, Update, Delete (CRUD) restaurants — only owners |
| 6 | **Menu Controller** | Add/edit/delete menu items — only owners |
| 7 | **Order Controller** | Place order (user), update status (owner/delivery), track order |
| 8 | **Image Upload** | Upload restaurant/food images (using Cloudinary or Multer) |
| 9 | **Search & Filter** | Search restaurants/food by name, cuisine, rating |
| 10 | **Payment Integration** | Integrate Razorpay/Stripe for online payments |
| 11 | **Rating & Reviews** | Users can rate restaurants and leave reviews |

### 🟡 Frontend — Coming Up

| # | Feature | Description |
|---|---|---|
| 1 | **Home Page** | List of restaurants with search bar |
| 2 | **Restaurant Page** | Show menu items for a selected restaurant |
| 3 | **Cart System** | Add/remove items, view total |
| 4 | **Checkout Page** | Enter address, choose payment, place order |
| 5 | **Order Tracking** | Real-time order status updates |
| 6 | **Profile Page** | View/edit user profile |
| 7 | **Owner Dashboard** | Manage restaurant, menu, view orders |
| 8 | **Delivery Dashboard** | See available deliveries, accept, update status |
| 9 | **Forgot Password Page** | Enter OTP, reset password |
| 10 | **Protected Routes (Frontend)** | Redirect non-logged-in users to sign in |
| 11 | **State Management** | Context API or Zustand for global state (user, cart) |

---

## 📂 Folder Structure Cheat Sheet

```
FoodDeliveryApp/
├── backend/
│   ├── index.js                  ← 🏠 Main server file (entry point)
│   ├── package.json              ← 📋 Lists all dependencies
│   ├── .env                      ← 🔒 Secret keys (NEVER upload to GitHub!)
│   │
│   ├── config/
│   │   └── db.js                 ← 🗄 Database connection
│   │
│   ├── models/
│   │   └── user.model.js         ← 👤 User blueprint (schema)
│   │
│   ├── controllers/
│   │   └── auth.controller.js    ← 🧠 Logic for signup, signin, logout, etc.
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js     ← 🛡 Checks if user is logged in
│   │   └── checkRole.middleware.js← 🎭 Checks if user has the right role
│   │
│   ├── routes/
│   │   └── auth.routes.js        ← 🛣 Defines URL paths & connects to controllers
│   │
│   └── utils/
│       ├── generateToken.js      ← 🎫 Creates JWT tokens
│       └── sendEmail.js          ← 📧 Sends emails (OTP)
│
└── frontend/
    ├── package.json              ← 📋 Lists frontend dependencies
    ├── index.html                ← 🌐 The one HTML page (React fills it)
    ├── vite.config.js            ← ⚡ Vite configuration
    │
    └── src/
        ├── main.jsx              ← 🚪 Entry point (renders App)
        ├── App.jsx               ← 🏗 Main component with Routes
        ├── App.css               ← 🎨 Global styles
        ├── index.css             ← 🎨 Base styles (Tailwind imports)
        │
        └── PAGES/
            └── SignUp.jsx        ← 📝 SignUp + SignIn page
```

---

## 📖 Quick Glossary (Jargon Buster)

| Term | Meaning |
|---|---|
| **API** | Application Programming Interface — a set of URLs the backend provides for the frontend to communicate with |
| **REST API** | A style of API that uses HTTP methods (GET, POST, PUT, DELETE) |
| **req (request)** | The data coming IN from the user/frontend |
| **res (response)** | The data going OUT from the server/backend |
| **req.body** | The data sent in the body of a POST request (like form data) |
| **req.cookies** | Cookies sent by the browser with the request |
| **req.user** | The logged-in user's data (added by auth middleware) |
| **JSON** | JavaScript Object Notation — a format for sending data: `{ "key": "value" }` |
| **Schema** | A blueprint that defines the structure of data in the database |
| **Model** | A JavaScript wrapper around a schema that lets you create, read, update, delete data |
| **Hash / Hashing** | Turning readable text into a scrambled string. One-way — you can't reverse it |
| **Salt Rounds** | Extra randomness added before hashing to make it more secure |
| **Token (JWT)** | A secure string that proves a user is logged in |
| **Cookie** | A small piece of data stored in the browser, sent with every request |
| **Middleware** | A function that runs BETWEEN receiving a request and sending a response |
| **CORS** | Cross-Origin Resource Sharing — allows different domains to communicate |
| **OTP** | One-Time Password — a temporary code sent for verification |
| **Environment Variables** | Secret values stored in `.env` that shouldn't be in the code |
| **npm** | Node Package Manager — installs and manages JavaScript packages |
| **Component (React)** | A reusable piece of UI (like a button, form, or page) |
| **State (React)** | Data that can change over time and triggers re-rendering |
| **Props (React)** | Data passed from a parent component to a child component |
| **CRUD** | Create, Read, Update, Delete — the 4 basic database operations |
| **HTTP Status Codes** | Numbers that indicate the result: 200=OK, 201=Created, 400=Bad Request, 401=Unauthorized, 403=Forbidden, 500=Server Error |

---

## 🚀 How to Run the Project

### Start the Backend:
```bash
cd backend
npm run dev
```
> Server starts at `http://localhost:3000`

### Start the Frontend:
```bash
cd frontend
npm run dev
```
> React app starts at `http://localhost:5173`

### Test with Browser:
- Open `http://localhost:5173/signUp` to see the SignUp/SignIn page
- Open `http://localhost:3000/` to see "API is running...."

---

> 💡 **Tip:** Always start the backend FIRST, then the frontend. The frontend needs the backend to be running to send/receive data!

---

*Last Updated: March 2026*
