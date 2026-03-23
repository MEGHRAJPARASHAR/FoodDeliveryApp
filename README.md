# 🍕 Food Delivery App — Project Documentation

> A full stack MERN app with real-time tracking, payments, and role-based access.
> **Stack:** MongoDB · Express · React · Node.js

---

## 📁 Project Structure

```
FoodDeliveryApp/
├── backend/
│   ├── config/
│   │   └── db.js                   ✅ done
│   ├── controllers/
│   │   ├── auth.controller.js      ✅ done
│   │   ├── shop.controller.js      ✅ done
│   │   ├── item.controller.js      ✅ done
│   │   ├── cart.controller.js      ✅ done
│   │   └── order.controller.js     ❌ pending
│   ├── middlewares/
│   │   ├── auth.middleware.js      ✅ done
│   │   └── checkRole.middleware.js ✅ done
│   ├── models/
│   │   ├── user.model.js           ✅ done
│   │   ├── shop.model.js           ✅ done
│   │   ├── item.model.js           ✅ done
│   │   ├── cart.model.js           ✅ done
│   │   └── order.model.js          ❌ pending
│   ├── routes/
│   │   ├── auth.routes.js          ✅ done
│   │   ├── shop.routes.js          ✅ done
│   │   ├── item.routes.js          ✅ done
│   │   ├── cart.routes.js          ✅ done
│   │   └── order.routes.js         ❌ pending
│   ├── utils/
│   │   ├── generateToken.js        ✅ done
│   │   └── sendEmail.js            ✅ done
│   ├── .env                        ✅ done
│   └── index.js                    ✅ done
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
- Express server running on port `3000`
- MongoDB connected via Mongoose
- CORS configured for frontend (`http://localhost:5173`)
- Cookie Parser and dotenv configured
- Google DNS fix for local development issues

### 2. Auth System
| Feature | Route | Status |
|--------|-------|--------|
| Sign Up | `POST /api/auth/signup` | ✅ |
| Sign In | `POST /api/auth/signin` | ✅ |
| Logout | `POST /api/auth/logout` | ✅ |
| Get Me | `GET /api/auth/me` | ✅ |
| Forgot Password | `POST /api/auth/forgot-password` | ✅ |
| Verify OTP | `POST /api/auth/verify-otp` | ✅ |
| Reset Password | `POST /api/auth/reset-password` | ✅ |

### 3. Middleware
| Middleware | Purpose | Status |
|-----------|---------|--------|
| `protectRoute` | Verifies JWT token from cookie, attaches user to req | ✅ |
| `checkRole(role)` | Checks if logged in user has the required role | ✅ |

### 4. Shop System
| Feature | Route | Status |
|--------|-------|--------|
| Create Shop | `POST /api/shop/create-shop` | ✅ |
| Get All Shops | `GET /api/shop/` | ✅ |
| Get Shop By ID | `GET /api/shop/:id` | ✅ |
| Update Shop | `PUT /api/shop/:id` | ✅ |
| Delete Shop | `DELETE /api/shop/:id` | ✅ |

### 5. Item System
| Feature | Route | Status |
|--------|-------|--------|
| Create Item | `POST /api/item/:shopId/create-item` | ✅ |
| Get All Items | `GET /api/item/` | ✅ |
| Get Item By ID | `GET /api/item/:id` | ✅ |
| Update Item | `PUT /api/item/:id` | ✅ |
| Delete Item | `DELETE /api/item/:id` | ✅ |

### 6. Cart System
| Feature | Route | Status |
|--------|-------|--------|
| Add To Cart | `POST /api/cart/add` | ✅ |
| Get Cart | `GET /api/cart/` | ✅ |
| Update Quantity | `PUT /api/cart/update` | ✅ |
| Remove Item | `DELETE /api/cart/remove/:itemId` | ✅ |
| Clear Cart | `DELETE /api/cart/clear` | ✅ |

### 7. Frontend
- React + Vite setup
- Tailwind CSS v4 configured
- React Router DOM installed
- SignUp page UI built

---

## 🔲 What's Remaining

### Orders
- ✅ `order.model.js`
- ✅ `order.controller.js`
- [ ] `order.routes.js`

### Advanced Features
- [ ] Multer + Cloudinary (image uploads)
- [ ] Payment integration (Razorpay)
- [ ] Socket.io (real-time order updates)
- [ ] Live map tracking (Leaflet + GeoJSON)

### Frontend
- [ ] Sign In page UI
- [ ] Auth state (Redux / Context)
- [ ] Protected routes
- [ ] User dashboard (browse shops + food)
- [ ] Cart page
- [ ] Checkout page with map
- [ ] Order history page
- [ ] Owner dashboard (manage shop + items + orders)
- [ ] Delivery boy dashboard

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
  otp: String,          // for forgot password flow
  otpExpiry: Date,      // OTP expires in 10 minutes
  timestamps: true
}
```

### Shop Model
```js
{
  name: String,         // required
  image: String,        // shop image URL
  owner: ObjectId,      // ref: "User" (must be role: owner)
  city: String,         // required
  state: String,        // required
  address: String,      // required
  items: [ObjectId],    // ref: "Item" array
  timestamps: true
}
```

### Item Model
```js
{
  name: String,         // required
  image: String,        // required, item image URL
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
    {
      item: ObjectId,   // ref: "Item"
      quantity: Number  // default: 1
    }
  ],
  timestamps: true
  // totalPrice is NOT stored — calculated on the fly using item.price * quantity
}
```

### Order Model ❌ pending
```js
{
  // coming soon
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
| `cookie-parser` | Parse cookies from requests |
| `cors` | Allow frontend to talk to backend |
| `dotenv` | Load environment variables |
| `nodemailer` | Send OTP emails |
| `nodemon` | Auto restart server on changes |
| `express-rate-limit` | Prevent brute force attacks |

### Frontend
| Package | Purpose |
|---------|---------|
| `react` | UI library |
| `react-router-dom` | Page routing |
| `axios` | API calls to backend |
| `tailwindcss` | Styling |

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

## 🚗 User Flow

```
1. User signs up / signs in
2. User sees list of shops based on their city
3. User clicks shop → sees menu items
4. User adds items to cart
5. User places order with delivery address on map
6. User pays via Razorpay or Cash on Delivery
7. Owner updates order status (Pending → Preparing → Out for Delivery)
8. Delivery boy accepts order → live map tracking starts
9. Delivery boy delivers → OTP confirmation → order marked Delivered
```

## 🏪 Owner Flow

```
1. Owner signs up with role "owner"
2. Owner creates their shop (name, address, city, image)
3. Owner adds menu items (name, price, category, image)
4. Owner sees incoming orders on dashboard
5. Owner updates order status
```

## 🛵 Delivery Boy Flow

```
1. Delivery boy signs up with role "deliveryBoy"
2. Receives broadcast when order is "Out for Delivery" nearby
3. Accepts the order
4. Live location tracked on map
5. Enters OTP from customer to mark as Delivered
```

---

## 🚀 How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 👨‍💻 Made by
[Meghraj Parashar](https://github.com/MEGHRAJPARASHAR)

---
*Last updated: March 2026*
