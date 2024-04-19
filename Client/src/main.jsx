import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'tailwindcss/tailwind.css';
import App from './App';

import { UserProvider } from './Context/userContext';

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <UserProvider>
    <App />
  </UserProvider>
);