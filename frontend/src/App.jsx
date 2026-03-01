
import './App.css'
import SignUp from './PAGES/SignUp'
import {  Routes, Route } from 'react-router-dom'
export const API_URL="http://localhost:3000/api"
function App() {

  return (
    <>
    <Routes>
      <Route path='/signUp' element={<SignUp />} />
    </Routes>

     
    </>
  )
}

export default App
