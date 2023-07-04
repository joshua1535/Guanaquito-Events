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



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/emailconfirmation" element={<EmailConfirmationForm />} />
          <Route path="/emailregister" element={<EmailConfirmationFormRegister />} />
          <Route path="/passwordconfirmation" element={<PasswordConfirmationForm />} />
          <Route path="/updatepassword" element={<UpdatePasswordForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/mytickets" element={<MyTickets />} />
          <Route path="/buytickets/:code" element={<BuyTicket />} />
          <Route path="/admin-event/createevent" element={<CreateEvent />} />
          <Route path="/admin-event/modifyevent/:eventCode" element={<ModifyEvent />} />
          <Route path="/admin-event/addtiers/:eventCode" element={<AddTiers />} />
          <Route path="/admin-event/" element={<AdminEvents />} />
          <Route path="/admin-event/modifyevent/addtier" element={<AddTiers />} />
          <Route path="/admin-event/eventpermit/:eventCode" element={<EventsPermit />} />
          <Route path="/admin-event/modifystaff" element={<ModifyStaff />} />
          <Route path="/qr" element={<QRPage />} />
          <Route path="/transferticket" element={<TransferTicket />} />  
          <Route path="/ticketvalidation" element={<TicketValidationPage />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/admin-users/permits-user/:userCode" element={<EditPermitUsers />} />
          <Route path="/admin-graphs" element={<AdminGraphs />} />
          <Route path="/admin-scanner" element={<TicketValidationPage />} />
          <Route path="/admin-graphs/graph" element={<StatsPage/>} />
          <Route path="/historyevents" element={<MyEvents />} />
          <Route path="/permits-user" element={<EditPermitUsers />} />
          <Route path="*" element={<Error404Form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;