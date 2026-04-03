# 🍔 Food Delivery App - Frontend Development Guide

Welcome! This guide will help you understand how to build the frontend for your Food Delivery App. I'll explain everything in simple terms with examples.

---

## 📁 Project Structure Overview

```
frontend/
├── src/
│   ├── api/          → API calls (talking to backend)
│   ├── app/          → Redux store configuration
│   ├── assets/       → Images, icons, fonts
│   ├── components/   → Reusable UI pieces
│   ├── features/     → Redux slices (state management)
│   ├── pages/        → Full page components
│   ├── utils/        → Helper functions
│   ├── App.jsx       → Main app with routes
│   └── main.jsx      → Entry point
```

---

## 🧠 Key Concepts Explained Simply

### 1. **React Components** - Building Blocks
Think of components like LEGO blocks. Each piece does one thing, and you combine them to build your app.

```jsx
// A simple component - just a function that returns HTML-like code (JSX)
function FoodCard({ name, price, image }) {
  return (
    <div className="food-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>₹{price}</p>
      <button>Add to Cart</button>
    </div>
  );
}
```

### 2. **useState** - Remember Things
`useState` is like a variable that React watches. When it changes, the screen updates automatically.

```jsx
function Counter() {
  const [count, setCount] = useState(0);  // count starts at 0
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

### 3. **useEffect** - Do Things at the Right Time
`useEffect` runs code when something happens (like when page loads or data changes).

```jsx
useEffect(() => {
  // This runs ONCE when the page loads (empty [])
  fetchRestaurants();
}, []);

useEffect(() => {
  // This runs EVERY TIME 'searchTerm' changes
  searchItems(searchTerm);
}, [searchTerm]);
```

### 4. **Redux** - Global State (Share Data Everywhere)
Redux is like a shared notebook that all components can read and write to.

**Without Redux:**
```
App → Header → CartIcon (need to pass data through each level 😫)
```

**With Redux:**
```
Any component can directly read/write to the store 😊
```

#### How Redux Works in Your App:

**Step 1: Store** (`src/app/store.js`) - The central "notebook"
```js
export const store = configureStore({
  reducer: {
    auth: authReducer,    // User login data
    cart: cartReducer,    // Shopping cart
    shop: shopReducer,    // Restaurant data
  },
});
```

**Step 2: Slice** (`src/features/auth/authSlice.js`) - A section of the notebook
```js
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,           // Like: let user = null
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {    // Like: function setUser()
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});
```

**Step 3: Use in Components**
```jsx
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logOut } from './features/auth/authSlice';

function Profile() {
  // READ from Redux
  const user = useSelector((state) => state.auth.user);
  
  // WRITE to Redux
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logOut());  // This updates the global state!
  };
  
  return <h1>Welcome, {user?.fullName}</h1>;
}
```

### 5. **React Router** - Moving Between Pages
```jsx
// In App.jsx - Define your routes
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/signin" element={<SignIn />} />
  <Route path="/restaurant/:id" element={<RestaurantPage />} />
  <Route path="/cart" element={<Cart />} />
</Routes>

// In any component - Navigate between pages
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  
  return (
    <nav>
      <Link to="/">Home</Link>              {/* Click to go */}
      <Link to="/cart">Cart</Link>
      <button onClick={() => navigate('/signin')}>  {/* Programmatic */}
        Sign In
      </button>
    </nav>
  );
}
```

### 6. **Axios** - Talk to Your Backend
Already set up in `src/api/axios.js`:
```js
import api from '../api/axios';

// GET data
const response = await api.get('/api/items');

// POST data
const response = await api.post('/api/auth/signup', { name, email, password });

// PUT (update)
await api.put('/api/cart/update-cart', { itemId, quantity });

// DELETE
await api.delete('/api/cart/delete-item/123');
```

---

## 🏗️ What You Need to Build

Based on your backend APIs, here's what pages/features you need:

### 📱 Pages to Create

#### 1. **Authentication Pages** (✅ Partially Done)
- [x] `SignUp.jsx` - Register new users
- [x] `SignIn.jsx` - Login
- [ ] `ForgotPassword.jsx` - Request password reset
- [ ] `VerifyOTP.jsx` - Enter OTP
- [ ] `ResetPassword.jsx` - Set new password

#### 2. **User Pages** (For regular customers)
```
src/pages/user/
├── Home.jsx           → Browse all restaurants/items
├── RestaurantPage.jsx → View single restaurant & menu
├── Cart.jsx           → Shopping cart
├── Checkout.jsx       → Place order
├── Orders.jsx         → View past orders
├── OrderDetails.jsx   → Single order tracking
└── Profile.jsx        → User settings
```

#### 3. **Owner Pages** (For restaurant owners)
```
src/pages/owner/
├── Dashboard.jsx      → Overview
├── MyShops.jsx        → List of owner's restaurants
├── CreateShop.jsx     → Add new restaurant
├── EditShop.jsx       → Update restaurant details
├── MenuManager.jsx    → Add/edit/delete food items
├── Orders.jsx         → View incoming orders
└── OrderDetails.jsx   → Manage single order
```

### 🧩 Components to Create

```
src/components/
├── layout/
│   ├── Navbar.jsx         → Top navigation
│   ├── Footer.jsx         → Bottom section
│   └── Sidebar.jsx        → Owner dashboard sidebar
├── common/
│   ├── Button.jsx         → Reusable button
│   ├── Input.jsx          → Styled input field
│   ├── Loading.jsx        → Loading spinner
│   ├── Modal.jsx          → Popup dialogs
│   └── ErrorMessage.jsx   → Error display
├── home/
│   ├── Hero.jsx           → Landing banner
│   ├── SearchBar.jsx      → Search items
│   ├── CategoryFilter.jsx → Filter by food type
│   └── RestaurantCard.jsx → Restaurant preview card
├── restaurant/
│   ├── FoodCard.jsx       → Individual food item
│   ├── FoodModal.jsx      → Food details popup
│   └── RestaurantInfo.jsx → Restaurant header
├── cart/
│   ├── CartItem.jsx       → Single item in cart
│   ├── CartSummary.jsx    → Total, delivery fee, etc.
│   └── EmptyCart.jsx      → Show when cart is empty
└── order/
    ├── OrderCard.jsx      → Order preview
    └── OrderTimeline.jsx  → Order status steps
```

### 🗂️ Redux Slices to Create

```
src/features/
├── auth/
│   └── authSlice.js    ✅ Done
├── cart/
│   └── cartSlice.js    → Manage cart state
├── item/
│   └── itemSlice.js    → Food items data
├── shop/
│   └── shopSlice.js    → Restaurant data
└── order/
    └── orderSlice.js   → Orders data
```

---

## 🔨 Step-by-Step: Building a Feature

Let's build the **Cart Feature** as an example:

### Step 1: Create the Slice (`src/features/cart/cartSlice.js`)

```js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],        // Array of cart items
    totalAmount: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        item => item.itemId === action.payload.itemId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => item.itemId !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(
        item => item.itemId === action.payload.itemId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setCart, 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  setLoading,
  setError 
} = cartSlice.actions;

export default cartSlice.reducer;
```

### Step 2: Add to Store (`src/app/store.js`)

```js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";  // Add this

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,  // Add this
  },
});
```

### Step 3: Create Cart Page (`src/pages/user/Cart.jsx`)

```jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart, removeFromCart, updateQuantity, setLoading } from '../../features/cart/cartSlice';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { items, totalAmount, isLoading } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch cart when page loads
  useEffect(() => {
    const fetchCart = async () => {
      dispatch(setLoading(true));
      try {
        const res = await api.get('/api/cart');
        dispatch(setCart(res.data.cart));
      } catch (err) {
        toast.error('Failed to load cart');
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchCart();
  }, [dispatch]);

  // Handle quantity change
  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await api.put('/api/cart/update-cart', { itemId, quantity: newQuantity });
      dispatch(updateQuantity({ itemId, quantity: newQuantity }));
    } catch (err) {
      toast.error('Failed to update quantity');
    }
  };

  // Handle remove item
  const handleRemove = async (itemId) => {
    try {
      await api.delete(`/api/cart/delete-item/${itemId}`);
      dispatch(removeFromCart(itemId));
      toast.success('Item removed');
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <h2>Your cart is empty!</h2>
        <button onClick={() => navigate('/')}>Browse Food</button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      
      {items.map(item => (
        <div key={item.itemId} className="flex justify-between border-b py-4">
          <div>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => handleQuantityChange(item.itemId, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleQuantityChange(item.itemId, item.quantity + 1)}>+</button>
            <button onClick={() => handleRemove(item.itemId)}>🗑️</button>
          </div>
        </div>
      ))}
      
      <div className="mt-4">
        <p className="text-xl">Total: ₹{totalAmount}</p>
        <button 
          className="bg-green-500 text-white px-6 py-2 rounded mt-2"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
```

---

## 🎨 Styling with Tailwind CSS

Your project uses **Tailwind CSS** - a utility-first CSS framework. Instead of writing CSS files, you add classes directly to elements.

### Common Tailwind Classes

```jsx
// Layout
<div className="flex">           // Flexbox
<div className="grid grid-cols-3"> // Grid with 3 columns
<div className="p-4">            // Padding 1rem (16px)
<div className="m-2">            // Margin 0.5rem (8px)
<div className="gap-4">          // Gap between flex/grid items

// Sizing
<div className="w-full">         // Width 100%
<div className="h-screen">       // Height = viewport height
<div className="max-w-md">       // Maximum width (medium)

// Colors
<div className="bg-blue-500">    // Blue background
<div className="text-white">     // White text
<div className="border-gray-300"> // Gray border

// Typography
<h1 className="text-2xl">        // Font size 1.5rem
<p className="font-bold">        // Bold text
<p className="text-center">      // Center text

// Responsive Design (mobile-first)
<div className="w-full md:w-1/2 lg:w-1/3">
// Full width on mobile, half on medium screens, third on large

// Hover & Focus
<button className="hover:bg-blue-600 focus:ring-2">

// Transitions
<div className="transition duration-300 ease-in-out">
```

### Example: Styled Food Card

```jsx
function FoodCard({ name, price, image, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-green-600 font-bold mt-2">₹{price}</p>
        <button 
          onClick={onAddToCart}
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

---

## 🔐 Protected Routes

You already have `ProtectedRoute.jsx`. Here's how to use it:

```jsx
// src/components/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useSelector(state => state.auth);

  // Not logged in? Go to signin
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // Wrong role? Go to home
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

// Usage in App.jsx
<Routes>
  {/* Public routes */}
  <Route path="/signin" element={<SignIn />} />
  <Route path="/signup" element={<SignUp />} />
  
  {/* Protected routes - any logged in user */}
  <Route path="/" element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  } />
  
  {/* Only for owners */}
  <Route path="/owner/dashboard" element={
    <ProtectedRoute allowedRoles={['owner']}>
      <OwnerDashboard />
    </ProtectedRoute>
  } />
</Routes>
```

---

## 🔔 Toast Notifications

Already set up with `react-hot-toast`:

```jsx
import toast from 'react-hot-toast';

// Success
toast.success('Order placed successfully!');

// Error
toast.error('Something went wrong');

// Loading
const loadingToast = toast.loading('Placing order...');
// ... after API call
toast.dismiss(loadingToast);
toast.success('Done!');

// Custom
toast('Hello!', {
  icon: '👋',
  duration: 3000,
});
```

Add the Toaster component to `App.jsx`:
```jsx
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>...</Routes>
    </>
  );
}
```

---

## 🎬 Animations with Framer Motion

Your project includes `framer-motion` for smooth animations:

```jsx
import { motion } from 'framer-motion';

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content fades in
</motion.div>

// Slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  Slides up from below
</motion.div>

// Stagger children (for lists)
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map(item => (
    <motion.li
      key={item.id}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
      }}
    >
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

---

## 📋 Backend API Reference

Here are all the endpoints your frontend needs to call:

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | ❌ |
| POST | `/signin` | Login | ❌ |
| GET | `/me` | Get current user | ✅ |
| POST | `/logout` | Logout | ✅ |
| POST | `/forgot-password` | Request OTP | ❌ |
| POST | `/verify-otp` | Verify OTP | ❌ |
| POST | `/reset-password` | Set new password | ❌ |

### Shops (`/api/shops`)
| Method | Endpoint | Description | Auth/Role |
|--------|----------|-------------|-----------|
| POST | `/create-shop` | Create restaurant | Owner |
| GET | `/` | Get all shops | Owner |
| GET | `/:id` | Get single shop | Owner |
| PUT | `/:id` | Update shop | Owner |
| DELETE | `/:id` | Delete shop | Owner |

### Items (`/api/items`)
| Method | Endpoint | Description | Auth/Role |
|--------|----------|-------------|-----------|
| GET | `/` | Get all items | Public |
| POST | `/:shopId/create-item` | Create item | Owner |
| GET | `/:id` | Get single item | ✅ |
| PUT | `/:id` | Update item | Owner |
| DELETE | `/:id` | Delete item | Owner |

### Cart (`/api/cart`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get user's cart | ✅ |
| POST | `/create-cart` | Add to cart | ✅ |
| PUT | `/update-cart` | Update quantity | ✅ |
| DELETE | `/delete-item/:itemId` | Remove item | ✅ |
| DELETE | `/delete-cart` | Clear cart | ✅ |

### Orders (`/api/orders`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/create-order` | Place order | ✅ |
| GET | `/` | Get user's orders | ✅ |
| GET | `/shop/:shopId` | Get shop's orders | ✅ |
| GET | `/:id` | Get single order | ✅ |
| PUT | `/:orderId/status` | Update status | ✅ |
| PUT | `/:orderId/cancel` | Cancel order | ✅ |

---

## 🚀 Quick Start Checklist

1. [ ] Set up remaining Redux slices (cart, shop, item, order)
2. [ ] Create layout components (Navbar, Footer)
3. [ ] Build Home page with restaurant listing
4. [ ] Build Restaurant detail page
5. [ ] Complete Cart functionality
6. [ ] Build Order flow (checkout, order history)
7. [ ] Build Owner dashboard
8. [ ] Add loading states and error handling
9. [ ] Make it responsive (mobile-friendly)
10. [ ] Add animations for better UX

---

## 💡 Tips for Success

1. **Start small** - Get one feature working before moving to the next
2. **Console.log is your friend** - Debug by logging data
3. **Check Network tab** - See if API calls are working
4. **Component-first** - Build small components, then combine them
5. **Mobile-first** - Design for mobile, then scale up for desktop

Good luck with your Food Delivery App! 🚀🍕🍔

---

*Created for FoodDeliveryApp Frontend Development*
