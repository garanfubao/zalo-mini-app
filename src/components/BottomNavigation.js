import React from 'react';
import { BottomNavigation } from 'zmp-ui';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cartState } from '../store';

const AppBottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useRecoilValue(cartState);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const tabs = [
    { key: '/', label: 'Trang chủ', icon: 'zi-home' },
    { key: '/products', label: 'Sản phẩm', icon: 'zi-shop' },
    { 
      key: '/cart', 
      label: 'Giỏ hàng', 
      icon: 'zi-bag',
      badge: cartItemCount > 0 ? cartItemCount : null
    },
    { key: '/profile', label: 'Cá nhân', icon: 'zi-user' }
  ];

  return (
    <BottomNavigation 
      activeKey={location.pathname}
      onChange={(key) => navigate(key)}
    >
      {tabs.map(tab => (
        <BottomNavigation.Item 
          key={tab.key}
          label={tab.label}
          icon={tab.icon}
          badge={tab.badge}
        />
      ))}
    </BottomNavigation>
  );
};

export default AppBottomNavigation;