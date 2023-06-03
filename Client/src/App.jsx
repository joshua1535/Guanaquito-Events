import { useState } from 'react'
import './App.css'
import LoginForm from './pages/Login/LoginForm'
import HomePage from './pages/HomePage/HomePage'


function App() {
  const [count, setCount] = useState(0)

  return (
      <HomePage />
  )
}

export default App
