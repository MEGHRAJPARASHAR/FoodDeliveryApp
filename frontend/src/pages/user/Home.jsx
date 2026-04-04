import React from 'react'
import api from '../../api/axios'

function Home() {
    const getShops = async () => {
        const response = await api.get('/api/shop/');
        console.log(response.data);

    }
  return (
    <div>
        <h1>Home Page</h1>
        <button onClick={getShops}>Get Shops</button>

    </div>
  )
}

export default Home
