import { useState } from 'react'
import './App.css'
import LoginForm from './pages/Login/LoginForm.jsx'
import EmailConfirmationForm from './pages/UpdatePassword/EmailConfirmation/EmailConfirmationForm'
import UpdatePasswordForm from './pages/UpdatePassword/UpdatePassword/UpdatePasswordForm'
import Error404Form from './pages/Error404/Error404Form'



function App() {
  const [count, setCount] = useState(0)

  return (
      <Error404Form />
  )
}

export default App
