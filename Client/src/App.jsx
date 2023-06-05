import { useState } from 'react'
import './App.css'
import LoginForm from './pages/Login/LoginForm.jsx'
import EmailConfirmationForm from './pages/UpdatePassword/EmailConfirmation/EmailConfirmationForm'
import UpdatePasswordForm from './pages/UpdatePassword/UpdatePassword/UpdatePasswordForm'
import MyTickets from './pages/My Tickets/MyTickets'



function App() {
  const [count, setCount] = useState(0)

  return (
      <MyTickets />
  )
}

export default App