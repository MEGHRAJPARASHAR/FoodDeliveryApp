import React, { useState, useEffect } from 'react'
import api from '../../api/axios'
import { Link } from 'react-router-dom'

function Home() {
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const getShops = async () => {
      try {
        const response = await api.get('/api/shop/')
        setShops(response.data.shops)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch shops')
      } finally {
        setLoading(false)
      }
    }
    getShops()
  }, [])

  if (loading) return <div className="p-6">Loading shops...</div>
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Home Page</h1>
      <Link to="/cart" className="mt-2 inline-block rounded border border-black px-4 py-2">
        Go To Cart
      </Link>
      
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shops.map((shop) => (
          <div key={shop._id} className="rounded border p-4 shadow">
            <h2 className="text-xl font-medium">{shop.name}</h2>
            <p className="mt-2 text-gray-600">{shop.description}</p>
            <Link to={`/shop/${shop._id}`} className="mt-3 inline-block text-blue-600">
              View Menu →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
