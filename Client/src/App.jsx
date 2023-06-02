import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm.jsx'
import imgtemplate from './assets/loginimg.png';

function App() {
  const [count, setCount] = useState(0)

  return (
      <LoginForm />
  )
}

export default App
