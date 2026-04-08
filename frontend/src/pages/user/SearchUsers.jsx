import React, { useState } from 'react'
import api from '../../api/axios'
import { Link } from 'react-router-dom'

function SearchUsers() {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setSearched(false)
    try {
      const response = await api.get(`/api/auth/search?q=${encodeURIComponent(query.trim())}`)
      setUsers(response.data.users)
      setSearched(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search users')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      <h1 className="text-2xl font-semibold mt-4 mb-4">Search Users</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter full name to search..."
          className="flex-1 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {searched && users.length === 0 && (
        <p className="text-gray-500">No users found for "{query}".</p>
      )}

      {users.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div key={user._id} className="rounded border p-4 shadow">
              <h2 className="text-xl font-medium">{user.fullName}</h2>
              <p className="text-gray-500 text-sm mt-1">{user.email}</p>
              <span className="mt-2 inline-block text-xs uppercase bg-gray-100 rounded px-2 py-1">
                {user.role}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchUsers
