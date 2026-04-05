import React from 'react'
import { useSelector } from 'react-redux'

function Cart() {
  const { items, totalAmount, totalItems, isLoading } = useSelector((state) => state.cart)

  if (isLoading) {
    return <div className="p-6">Loading cart...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Cart ({totalItems} items)</h1>
      <p className="mt-2">Total: Rs {totalAmount}</p>

      <div className="mt-4 space-y-2">
        {items.length === 0 && <p>Your cart is empty.</p>}

        {items.map((item) => (
          <div key={item.itemId} className="rounded border p-3">
            {item.name} - Qty: {item.quantity}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart