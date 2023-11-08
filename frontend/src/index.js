import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SidebarProvider } from './sidebar/SidebarContext';
import { AppProvider } from './AppContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
				<SidebarProvider>
						<App />
				</SidebarProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
