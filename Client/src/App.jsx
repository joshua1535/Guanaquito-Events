import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './pages/Login/LoginForm.jsx';
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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/emailconfirmation" element={<EmailConfirmationForm />} />
          <Route path="/updatepassword" element={<UpdatePasswordForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/addtiers" element={<AddTiers />} />
          <Route path="/modifyevent" element={<ModifyEvent />} />
          <Route path="/qr" element={<QRPage />} />
          <Route path="/transferticket" element={<TransferTicket />} />
          <Route path="/modifystaff" element={<ModifyStaff />} />
          <Route path="/ticketvalidation" element={<TicketValidationPage />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="*" element={<Error404Form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;