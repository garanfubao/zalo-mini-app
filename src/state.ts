
import { atom, selector } from 'recoil';
import type { UserProfile } from './types';
import { cartState } from './store';

export const userState = atom<UserProfile | null>({
  key: 'userState',
  default: {
    id: 'anonymous',
    name: 'Người dùng Zalo',
    avatar: '',
    isRegistered: false,
    phone: '',
    address: ''
  }
});

export const cartCountState = selector<number>({
  key: 'cartCountState',
  get: ({get}) => get(cartState).reduce((sum, i) => sum + i.quantity, 0)
});

export const cartTotalState = selector<number>({
  key: 'cartTotalState',
  get: ({get}) => get(cartState).reduce((sum, i) => sum + i.quantity * i.price, 0)
});
