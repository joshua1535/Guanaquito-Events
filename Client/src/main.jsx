import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'tailwindcss/tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from '@material-tailwind/react';

import { UserProvider } from './Context/userContext';

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
    <ThemeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
);