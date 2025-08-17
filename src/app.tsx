import React from "react";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

// Pages
import HomePage from "./pages/index";
import ProductsPage from "./pages/products";
import CartPage from "./pages/cart";
import OrderHistoryPage from "./pages/orders";
import ProfilePage from "./pages/profile";

// CSS
import "./css/app.css";

const MyApp: React.FC = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<HomePage />} />
              <Route path="/index" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};

export default MyApp;