import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './AppContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ProSidebarProvider>
            <App />
        </ProSidebarProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
