import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './pages/Login/LoginForm.jsx';
import RegisterForm from './pages/Register/RegisterForm.jsx';
import EmailConfirmationForm from './pages/UpdatePassword/EmailConfirmation/EmailConfirmationForm';
import UpdatePasswordForm from './pages/UpdatePassword/UpdatePassword/UpdatePasswordForm';
import HomePage from './pages/HomePage/HomePage';
import EventsPage from './pages/EventsPage/EventsPage';
import MyOrders from './pages/My Orders/MyOrders';
import CreateEvent from './pages/Create Event/CreateEvent';
import AddTiers from './pages/Add Tiers/AddTiers';
import ModifyEvent from './pages/Modify Event/ModifyEvent';
import QRPage from './pages/QRPage/QR';
import TransferTicket from './pages/Transfer Ticket/TransferTicket';
import ModifyStaff from './pages/Modify Staff/ModifyStaff';
import TicketValidationPage from './pages/Ticket Validation/TicketValidation';
import Error404Form from './pages/Error404/Error404Form';
import AdminUsers from './pages/Admin Users/AdminUsers';
import EditPermitUsers from './pages/Edit Permit Users/EditPermitUsers';
import MyTickets from './pages/My Tickets/MyTickets';
import BuyTicket from './pages/BuyTicketPage/BuyTicketPage';
import EmailConfirmationFormRegister from './pages/Register/EmailConfirmation/EmailConfirmationForm';
import PasswordConfirmationForm from './pages/Register/PasswordConfirmation/PasswordConfirmationForm';
import AdminEvents from './pages/Admin Events/AdminEvents';
import EventsPermit from './pages/Event Permits/EventPermits';
import AdminGraphs from './pages/Admin Graphs/AdminGraphs';
import StatsPage from './pages/Stats/Stats';
import MyEvents from './pages/My Events/MyEvents';
import Private from './Components/Private/Private';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/emailconfirmation" element={<Private role="Client"> <EmailConfirmationForm /> </Private>} />
          <Route path="/emailregister" element={<EmailConfirmationFormRegister />} />
          <Route path="/passwordconfirmation" element={<Private role="Client"> <PasswordConfirmationForm /> </Private>} />
          <Route path="/updatepassword" element={<Private role="Client">  <UpdatePasswordForm /> </Private>} />
          <Route path="/home" element={<Private role="Client">  <HomePage /> </Private>} />
          <Route path="/events" element={<Private role="Client">  <EventsPage /> </Private>} />
          <Route path="/myorders" element={<Private role="Client"> <MyOrders /> </Private>} />
          <Route path="/mytickets" element={<Private role="Client"> <MyTickets /> </Private>} />
          <Route path="/buytickets/:code" element={<Private role="Client"> <BuyTicket /> </Private>} />
          <Route path="/admin-event/createevent" element={<Private role="Event Administrator"> <CreateEvent /> </Private>} />
          <Route path="/admin-event/modifyevent/:eventCode" element={<Private role="Event Administrator"> <ModifyEvent /> </Private>} />
          <Route path="/admin-event/addtiers/:eventCode" element={<Private role="Event Administrator"> <AddTiers /> </Private>} />
          <Route path="/admin-event/" element={<Private role="Event Administrator"> <AdminEvents /> </Private>} />
          <Route path="/admin-event/modifyevent/addtier" element={<Private role="Event Administrator"> <AddTiers /> </Private>} />
          <Route path="/admin-event/eventpermit/:eventCode" element={<Private role="Event Administrator"> <EventsPermit /> </Private>} />
          <Route path="/admin-event/modifystaff/:eventCode" element={<Private role="Event Administrator"> <ModifyStaff /> </Private>} />
          <Route path="/qr" element={<Private role="Client"> <QRPage /> </Private>} />
          <Route path="/transferticket" element={<Private role="Client"><TransferTicket /> </Private>} />  
          <Route path="/admin-users" element={<Private role="Admin"> <AdminUsers /> </Private>} />
          <Route path="/admin-users/permits-user/:userCode" element={<Private role="Admin"> <EditPermitUsers /> </Private>} />
          <Route path="/admin-graphs" element={<Private role="Stadistics"> <AdminGraphs /> </Private>} />
          <Route path="/admin-scanner" element={<Private role="Ticket Validator"> <TicketValidationPage /> </Private>} />
          <Route path="/admin-graphs/graph" element={<Private role="Stadistics"> <StatsPage/> </Private>} />
          <Route path="/historyevents" element={<Private role="Client"> <MyEvents /> </Private>} />
          <Route path="/permits-user" element={<Private role="Admin"> <EditPermitUsers /> </Private>} />
          <Route path="*" element={<Error404Form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;