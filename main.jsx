import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import { StatsProvider } from './context/StatsContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <StatsProvider>
            <App />
            <Toaster position="top-right" />
          </StatsProvider>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);