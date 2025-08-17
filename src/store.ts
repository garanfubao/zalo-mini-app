
import { atom, selector } from 'recoil';
import type { CartItem, Order, Product } from './types';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: []
});

export const orderHistoryState = atom<Order[]>({
  key: 'orderHistoryState',
  default: []
});

const sampleProducts: Record<string, Product[]> = {
  combo: [
    { id: 1, name: 'Combo 1: 2 Miếng gà + Pepsi', description: 'No nê cho 1-2 người', price: 69000, image: '/assets/combo1.jpg', originalPrice: 89000 },
    { id: 2, name: 'Combo 2: 3 Miếng gà + Khoai', description: 'Thêm khoai giòn rụm', price: 99000, image: '/assets/combo2.jpg' },
    { id: 3, name: 'Combo Gia đình', description: '6 miếng gà + 2 nước + khoai', price: 199000, image: '/assets/combo3.jpg', originalPrice: 239000 },
    { id: 4, name: 'Combo Sinh viên', description: '1 gà + 1 nước', price: 39000, image: '/assets/combo4.jpg' }
  ],
  powder: [
    { id: 11, name: 'Bột chiên giòn FKT 200g', description: 'Giòn lâu, thơm béo', price: 19000, image: '/assets/powder1.jpg' },
    { id: 12, name: 'Bột tẩm ướp 200g', description: 'Đậm đà chuẩn vị', price: 22000, image: '/assets/powder2.jpg' }
  ],
  promotion: [
    { id: 21, name: 'Deal 12-14h', description: 'Giảm 20% đơn từ 99k', price: 0, image: '/assets/promo1.jpg' }
  ]
};

export const productsState = atom<Record<string, Product[]>>({
  key: 'productsState',
  default: sampleProducts
});

export const hotCombosState = selector<Product[]>({
  key: 'hotCombosState',
  get: ({get}) => get(productsState).combo.slice(0, 4)
});
