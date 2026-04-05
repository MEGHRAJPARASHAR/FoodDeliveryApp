import React from 'react'
import api from '../../api/axios'
import { Link } from 'react-router-dom'

function Home() {
    const getShops = async () => {
        try {
          const response = await api.get('/api/shop/')
          console.log(response.data)
        } catch (error) {
          console.error(error.response?.data?.message || 'Failed to fetch shops')
        }
    }
  return (
    <div className="p-6">
        <h1 className="text-2xl font-semibold">Home Page</h1>
        <div className="mt-4 flex gap-3">
          <button onClick={getShops} className="rounded bg-black px-4 py-2 text-white">Get Shops</button>
          <Link to="/cart" className="rounded border border-black px-4 py-2">Go To Cart</Link>
        </div>
    </div>
  )
}

export default Home
