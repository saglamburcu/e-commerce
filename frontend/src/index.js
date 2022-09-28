import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext';
import { OrderProvider } from './context/OrderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <ProductProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </ProductProvider>
  </UserProvider>
);

