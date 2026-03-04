# 🍕 Food Delivery App — Project Documentation

> A full stack MERN app with real-time tracking, payments, and role-based access.
> **Stack:** MongoDB · Express · React · Node.js

---

## 📁 Project Structure

```
FoodDeliveryApp/
├── backend/
│   ├── config/
│   │   └── db.js                  ✅ done
│   ├── controllers/
│   │   ├── auth.controller.js     ✅ done
│   │   └── user.controller.js     ✅ done
│   ├── middlewares/
│   │   ├── auth.middleware.js     ✅ done
│   │   └── checkRole.middleware.js ✅ done
│   ├── models/
│   │   └── user.model.js          ✅ done
│   ├── routes/
│   │   └── auth.routes.js         ✅ done
│   ├── utils/
│   │   ├── generateToken.js       ✅ done
│   │   └── sendEmail.js           ✅ done
│   ├── .env                       ✅ done 
│   └── index.js                   ✅ done
│
└── frontend/
    ├── src/
    │   ├── PAGES/
    │   │   └── SignUp.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## ✅ What's Done So Far

### 1. Backend Setup
- Express server running on port `5000`
- MongoDB connected via Mongoose
- CORS configured for frontend (`http://localhost:5173`)
- Cookie Parser and dotenv configured
- Google DNS fix for local development issues

### 2. Auth System
| Feature | Route | Status |
|--------|-------|--------|
| Sign Up | `POST /api/signup` | ✅ |
| Sign In | `POST /api/signin` | ✅ |
| Logout | `POST /api/logout` | ✅ |
| Get Me | `GET /api/me` | ✅ |
| Forgot Password | `POST /api/forgot-password` | ✅ |
| Verify OTP | `POST /api/verify-otp` | 🔲 |
| Reset Password | `POST /api/reset-password` | 🔲 |

### 3. Middleware
| Middleware | Purpose | Status |
|-----------|---------|--------|
| `protectRoute` | Checks JWT token from cookie | ✅ |
| `checkRole(role)` | Checks if user has correct role | ✅ |

### 4. User Profile
| Feature | Route | Status |
|--------|-------|--------|
| Get Profile | `GET /api/user/profile` | ✅ |
| Update Profile | `PUT /api/user/profile` | ✅ |

### 5. Frontend
- React + Vite setup
- Tailwind CSS configured
- React Router DOM installed
- SignUp page UI built

---

## 🔲 What's Remaining

### Auth (almost done!)
- [ ] `verifyOTP` controller
- [ ] `resetPassword` controller

### Restaurant
- [ ] `restaurant.model.js`
- [ ] `restaurant.controller.js`
- [ ] `restaurant.routes.js`

### Menu Items
- [ ] `menuItem.model.js`
- [ ] `menuItem.controller.js`

### Cart
- [ ] `cart.model.js`
- [ ] `cart.controller.js`

### Orders
- [ ] `order.model.js`
- [ ] `order.controller.js`

### Advanced Features
- [ ] Payment integration (Razorpay)
- [ ] Socket.io (real-time order updates)
- [ ] Live map tracking (delivery boy)

### Frontend
- [ ] Connect SignUp/SignIn to backend with Axios
- [ ] Auth context / global state
- [ ] Protected routes (`PrivateRoute`, `OwnerRoute`)
- [ ] Restaurant listing page
- [ ] Menu page
- [ ] Cart page
- [ ] Order tracking page
- [ ] Owner dashboard

---


## 🗃️ Database Models

### User Model
```js
{
  fullName: String,     required
  email: String,        required, unique
  password: String,     hashed with bcrypt
  mobile: String,       required
  role: String,         enum: ["user", "owner", "deliveryBoy"]
  otp: String,          for forgot password
  otpExpiry: Date,      expires in 10 minutes
  timestamps: true
}
```

### Restaurant Model (next)
```js
{
  name: String,         required
  description: String,
  image: String,
  cuisineType: String,
  address: String,      required
  isOpen: Boolean,
  owner: ObjectId,      ref: "User"
  timestamps: true
}
```

---

## 📦 Packages Used

### Backend
| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `mongoose` | MongoDB ODM |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT tokens |
| `cookie-parser` | Parse cookies |
| `cors` | Cross-origin requests |
| `dotenv` | Environment variables |
| `nodemailer` | Send emails |
| `nodemon` | Auto restart server |

### Frontend
| Package | Purpose |
|---------|---------|
| `react` | UI library |
| `react-router-dom` | Page routing |
| `axios` | API calls |
| `tailwindcss` | Styling |

---

## 🔐 Environment Variables (.env)

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
EMAIL=youremail@gmail.com
PASS=your_gmail_app_password
```

---

## 🚗 Upcoming: User Flow (Minimum Working App)

```
1. User signs up / signs in
2. User sees list of restaurants
3. User clicks restaurant → sees menu
4. User adds items to cart
5. User places order
6. User sees order status (real-time with Socket.io)
7. Delivery boy picks up → map tracking starts
```

## 🏪 Upcoming: Owner Flow

```
1. Owner signs up with role "owner"
2. Owner creates restaurant
3. Owner adds menu items
4. Owner sees incoming orders
5. Owner updates order status
```



---

*Last updated: March 2026*
