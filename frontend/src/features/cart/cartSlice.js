import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    // Initial state - empty cart
    initialState: {
        items: [],              // Array of cart items
        totalAmount: 0,         // Total price
        totalItems: 0,          // Total quantity of all items
        shopId: null,           // Current shop (can only order from one shop at a time)
        isLoading: false,       // Loading state for API calls
        error: null             // Error messages
    },
    reducers: {
        // Set entire cart (when fetching from backend)
        setCart: (state, action) => {
            state.items = action.payload.items || []
            state.totalAmount = action.payload.totalAmount || 0
            state.totalItems = action.payload.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
            state.shopId = action.payload.shopId || null
        },
        
        // Add item to cart (or increase quantity if already exists)
        addToCart: (state, action) => {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.itemId === newItem.itemId)
            
            if (existingItem) {
                // Item already in cart - increase quantity
                existingItem.quantity += 1
            } else {
                // New item - add to cart
                state.items.push({ ...newItem, quantity: 1 })
                // Set shopId if this is first item
                if (!state.shopId) {
                    state.shopId = newItem.shopId
                }
            }
            
            // Recalculate totals
            state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
            state.totalAmount = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        },
        
        // Update item quantity
        updateQuantity: (state, action) => {
            const { itemId, quantity } = action.payload
            const item = state.items.find(item => item.itemId === itemId)
            
            if (item) {
                if (quantity <= 0) {
                    // Remove item if quantity is 0 or less
                    state.items = state.items.filter(item => item.itemId !== itemId)
                } else {
                    item.quantity = quantity
                }
                
                // Recalculate totals
                state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
                state.totalAmount = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
                
                // Clear shopId if cart is empty
                if (state.items.length === 0) {
                    state.shopId = null
                }
            }
        },
        
        // Remove item from cart
        removeFromCart: (state, action) => {
            const itemId = action.payload
            state.items = state.items.filter(item => item.itemId !== itemId)
            
            // Recalculate totals
            state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
            state.totalAmount = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            
            // Clear shopId if cart is empty
            if (state.items.length === 0) {
                state.shopId = null
            }
        },
        
        // Clear entire cart
        clearCart: (state) => {
            state.items = []
            state.totalAmount = 0
            state.totalItems = 0
            state.shopId = null
        },
        
        // Set loading state
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        
        // Set error message
        setError: (state, action) => {
            state.error = action.payload
        },
        
        // Clear error message
        clearError: (state) => {
            state.error = null
        }
    }
})

// Export actions
export const {
    setCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    setLoading,
    setError,
    clearError
} = cartSlice.actions

// Export reducer
export default cartSlice.reducer