import { useState } from 'react'
import './App.css'
import LoginForm from './pages/Login/LoginForm.jsx'
import EmailConfirmationForm from './pages/UpdatePassword/EmailConfirmation/EmailConfirmationForm'
import UpdatePasswordForm from './pages/UpdatePassword/UpdatePassword/UpdatePasswordForm'
import HomePage from './pages/HomePage/HomePage'
import EventsPage from './pages/EventsPage/EventsPage'
import BuyTicketPage from './pages/BuyTicketPage/BuyTicketPage'



function App() {
  const [count, setCount] = useState(0)

  return (
      <BuyTicketPage />
  )
}

export default App