import { atom } from 'recoil';

// Cart state - Giỏ hàng
export const cartState = atom({
  key: 'cartState',
  default: []
});

// User state - Thông tin người dùng
export const userState = atom({
  key: 'userState',
  default: {
    name: '',
    phone: '',
    address: '',
    isRegistered: false
  }
});

// Order history state - Lịch sử đơn hàng
export const orderHistoryState = atom({
  key: 'orderHistoryState',
  default: []
});

// Loading state - Trạng thái loading
export const loadingState = atom({
  key: 'loadingState',
  default: false
});