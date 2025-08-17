import React from 'react';
import { App, ZMPRouter, SnackbarProvider } from 'zmp-ui';
import { RecoilRoot } from 'recoil';

// Import pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import BottomNavigation from './components/BottomNavigation';

// Import styles
import './styles/app.css';

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <HomePage path="/" />
            <ProductsPage path="/products" />
            <CartPage path="/cart" />
            <ProfilePage path="/profile" />
            <OrderHistoryPage path="/orders" />
          </ZMPRouter>
          <BottomNavigation />
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};

export default MyApp;