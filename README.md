# 🍕 Food Delivery App
 
> A full-stack MERN food delivery app (Zomato/Swiggy clone) with JWT auth, role-based access control, DB-backed cart, and order management.
> **Stack:** MongoDB · Express 5 · React 19 · Node.js
 
---
 
## 📁 Project Structure
 
```
FoodDeliveryApp/
├── backend/
│   ├── config/
│   │   └── db.js                        ✅ done
│   ├── controllers/
│   │   ├── auth.controller.js           ✅ done
│   │   ├── shop.controller.js           ✅ done
│   │   ├── item.controller.js           ✅ done
│   │   ├── cart.controller.js           ✅ done
│   │   └── order.controller.js          ✅ done
│   ├── middlewares/
│   │   ├── auth.middleware.js           ✅ done
│   │   ├── checkRole.middleware.js      ✅ done
│   │   └── rateLimiter.middleware.js    ✅ done
│   ├── models/
│   │   ├── user.model.js                ✅ done
│   │   ├── shop.model.js                ✅ done
│   │   ├── item.model.js                ✅ done
│   │   ├── cart.model.js                ✅ done
│   │   └── order.model.js               ✅ done
│   ├── routes/
│   │   ├── auth.routes.js               ✅ done
│   │   ├── shop.routes.js               ✅ done
│   │   ├── item.routes.js               ✅ done
│   │   ├── cart.routes.js               ✅ done
│   │   └── order.routes.js              ✅ done
│   ├── utils/
│   │   ├── generateToken.js             ✅ done
│   │   └── sendEmail.js                 ✅ done
│   ├── .env                             ✅ done
│   └── index.js                         ✅ done
│
└── frontend/
    └── src/
        ├── api/
        │   └── axios.js                 ✅ done
        ├── app/
        │   └── store.js                 ✅ done
        ├── features/
        │   └── auth/
        │       └── authSlice.js         ✅ done
        ├── components/
        │   └── ProtectedRoute.jsx       ✅ done
        ├── pages/
        │   └── auth/
        │       ├── SignUp.jsx           ✅ done
        │       └── SignIn.jsx           ✅ done
        ├── App.jsx                      ✅ done
        └── main.jsx                     ✅ done
```
 
---
 
## ✅ What's Done So Far
 
### Backend
 
#### Auth System
| Feature | Route | Status |
|--------|-------|--------|
| Sign Up | `POST /api/auth/signup` | ✅ |
| Sign In | `POST /api/auth/signin` | ✅ |
| Logout | `POST /api/auth/logout` | ✅ |
| Get Me | `GET /api/auth/me` | ✅ |
| Forgot Password | `POST /api/auth/forgot-password` | ✅ |
| Verify OTP | `POST /api/auth/verify-otp` | ✅ |
| Reset Password | `POST /api/auth/reset-password` | ✅ |
 
#### Middleware
| Middleware | Purpose | Status |
|-----------|---------|--------|
| `protectRoute` | Verifies JWT from cookie, attaches user to req | ✅ |
| `checkRole(role)` | Verifies logged-in user's role | ✅ |
| `generalRateLimiter` | 100 req / 15 min on all routes | ✅ |
| `authRateLimiter` | 10 req / 15 min on auth routes | ✅ |
 
#### Shop System
| Feature | Route | Status |
|--------|-------|--------|
| Create Shop | `POST /api/shop/create-shop` | ✅ |
| Get All Shops | `GET /api/shop/` | ✅ |
| Get Shop By ID | `GET /api/shop/:id` | ✅ |
| Update Shop | `PUT /api/shop/:id` | ✅ |
| Delete Shop | `DELETE /api/shop/:id` | ✅ |
 
#### Item System
| Feature | Route | Status |
|--------|-------|--------|
| Create Item | `POST /api/item/:shopId/create-item` | ✅ |
| Get All Items | `GET /api/item/` | ✅ |
| Get Item By ID | `GET /api/item/:id` | ✅ |
| Update Item | `PUT /api/item/:id` | ✅ |
| Delete Item | `DELETE /api/item/:id` | ✅ |
 
#### Cart System
| Feature | Route | Status |
|--------|-------|--------|
| Add To Cart | `POST /api/cart/create-cart` | ✅ |
| Get Cart | `GET /api/cart/` | ✅ |
| Update Quantity | `PUT /api/cart/update-cart` | ✅ |
| Remove Item | `DELETE /api/cart/delete-item/:itemId` | ✅ |
| Clear Cart | `DELETE /api/cart/delete-cart` | ✅ |
 
#### Order System
| Feature | Route | Status |
|--------|-------|--------|
| Place Order | `POST /api/order/create-order` | ✅ |
| Get My Orders | `GET /api/order/` | ✅ |
| Get Order By ID | `GET /api/order/:id` | ✅ |
| Update Order Status | `PUT /api/order/:orderId/status` | ✅ |
| Cancel Order | `PUT /api/order/:orderId/cancel` | ✅ |
| Get Shop Orders | `GET /api/order/shop/:shopId` | ✅ |
 
### Frontend
| Feature | Status |
|--------|--------|
| React + Vite setup | ✅ |
| Tailwind CSS v4 (`@tailwindcss/vite`) | ✅ |
| React Router DOM | ✅ |
| Redux Toolkit + authSlice | ✅ |
| Axios instance (`withCredentials: true`) | ✅ |
| Sign Up page | ✅ |
| Sign In page | ✅ |
| Protected Route (redirect if not logged in) | ✅ |
 
---
 
## 🔲 What's Remaining
 
### Backend
- [ ] Multer + Cloudinary (image uploads for shops & items)
- [ ] Payment integration (Razorpay)
- [ ] Socket.io (real-time order status updates)
- [ ] Live map tracking (Leaflet + GeoJSON)
 
### Frontend — Immediate Priorities
- [ ] **Auth persistence** — call `GET /api/auth/me` on app load to restore user from cookie (critical, page refresh kills Redux state right now)
- [ ] Navbar / Layout component
- [ ] Toast notifications (react-hot-toast or sonner)
- [ ] Home page — browse shops by city
- [ ] Shop detail page — view menu items
- [ ] Cart page — view, update, remove items
- [ ] Checkout / Place order page
- [ ] Order history page (user)
- [ ] Forgot password flow (3 steps: email → OTP → new password)
- [ ] Owner dashboard — manage shop, items, incoming orders
- [ ] Delivery boy dashboard
- [ ] Global loading indicator / skeleton screens
 
---
 
## 🗃️ Database Models
 
### User Model
```js
{
  fullName: String,     // required
  email: String,        // required, unique
  password: String,     // hashed with bcrypt
  mobile: String,       // required
  role: String,         // enum: ["user", "owner", "deliveryBoy"]
  otp: String,
  otpExpiry: Date,
  timestamps: true
}
```
 
### Shop Model
```js
{
  name: String,         // required
  image: String,
  owner: ObjectId,      // ref: "User"
  city: String,         // required
  state: String,        // required
  address: String,      // required
  items: [ObjectId],    // ref: "Item"
  timestamps: true
}
```
 
### Item Model
```js
{
  name: String,         // required
  image: String,        // required
  shop: ObjectId,       // ref: "Shop"
  category: String,     // enum: ["Pizza", "Burgers", "Snacks" ...]
  price: Number,        // required, min: 0
  foodType: String,     // enum: ["veg", "non veg"]
  timestamps: true
}
```
 
### Cart Model
```js
{
  user: ObjectId,       // ref: "User", unique (one cart per user)
  items: [
    { item: ObjectId, quantity: Number }
  ],
  timestamps: true
  // totalPrice calculated on the fly
}
```
 
### Order Model
```js
{
  user: ObjectId,
  shop: ObjectId,
  items: [
    { item: ObjectId, quantity: Number, price: Number }
  ],
  totalPrice: Number,
  status: String,       // enum: ["pending","confirmed","preparing","out_for_delivery","delivered","cancelled"]
  isPaid: Boolean,
  deliveryAddress: String,
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
| `jsonwebtoken` | JWT auth tokens |
| `cookie-parser` | Parse cookies |
| `cors` | Allow frontend origin |
| `dotenv` | Environment variables |
| `nodemailer` | Send OTP emails |
| `nodemon` | Auto-restart on save |
| `express-rate-limit` | Brute force protection |
| `multer` | File upload (ready, not wired) |
| `cloudinary` | Image hosting (ready, not wired) |
 
### Frontend
| Package | Purpose |
|---------|---------|
| `react` | UI library |
| `react-router-dom` | Page routing |
| `axios` | API calls |
| `tailwindcss` | Styling |
| `@reduxjs/toolkit` | Global state management |
| `react-redux` | Redux bindings for React |
| `framer-motion` | Animations |
| `lucide-react` | Icons |
| `react-icons` | Extra icon sets |
 
---
 
## 🔐 Environment Variables (.env)
 
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
EMAIL=youremail@gmail.com
PASS=your_gmail_app_password
```
 
---
 
## 🚗 User Flows
 
### Customer
```
Sign Up / Sign In → Browse shops by city → Open shop → Add items to cart
→ Place order with delivery address → Track order status → View order history
```
 
### Owner
```
Sign Up (role: owner) → Create shop → Add menu items
→ View incoming orders → Update order status
```
 
---
 
## 🚀 How to Run Locally
 
```bash
# Backend
cd backend
npm install
npm run dev        # runs on http://localhost:3000
 
# Frontend
cd frontend
npm install
npm run dev        # runs on http://localhost:5173
```
 
> Always start the backend first, then the frontend.
 
---
 
## 👨‍💻 Made by
[Meghraj Parashar](https://github.com/MEGHRAJPARASHAR)
 
---
*Last updated: April 2026*
