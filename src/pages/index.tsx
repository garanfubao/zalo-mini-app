import React from 'react';
import { 
  Page, 
  Header, 
  Box, 
  Grid, 
  Text, 
  Button
} from 'zmp-ui';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { hotCombosState, cartState } from '../store';
import { MenuItem, Product } from '../types';
import { useSnackbar } from 'zmp-ui';

// ✅ Thêm Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const hotCombos = useRecoilValue(hotCombosState);
  const [cart, setCart] = useRecoilState(cartState);
  const { openSnackbar } = useSnackbar();

  const menuItems: MenuItem[] = [
    { icon: '🎯', title: 'Tích điểm', path: '/profile' },
    { icon: '🛍️', title: 'Đặt hàng', path: '/products' },
    { icon: '📞', title: 'Liên hệ', action: 'contact' },
    { icon: '🎁', title: 'Voucher', path: '/promotions' },
    { icon: '⭐', title: 'Hàng thành viên', path: '/member' },
    { icon: '🔥', title: 'Khuyến mãi', path: '/promotions' },
    { icon: '📋', title: 'Lịch sử', path: '/orders' }
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.action === 'contact') {
      try {
        (window as any).ZaloJavaScriptInterface?.openChat({
          type: 'oa',
          id: 'your-oa-id'
        });
      } catch (error) {
        alert('Liên hệ: 0123456789');
      }
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleComboClick = (combo: Product) => {
    navigate('/products', { state: { selectedProduct: combo } });
  };

  const addToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    openSnackbar({
      text: `Đã thêm ${product.name} vào giỏ hàng`,
      type: 'success'
    });
  };

  return (
    <Page className="page">
      <Header title="Gà Rán FKT" showBackIcon={false} />
      
      {/* Banner Swiper */}
      <Box p={0}>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
        >
          <SwiperSlide>
            <img 
              src="/assets/banner1.jpg" 
              alt="Banner 1" 
              className="w-full h-[200px] object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img 
              src="/assets/banner2.jpg" 
              alt="Banner 2" 
              className="w-full h-[200px] object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
      </Box>

      {/* Menu icons */}
      <Box p={4}>
        <Grid columnCount={4} columnGap={12} rowGap={16}>
          {menuItems.slice(0, 4).map((item, index) => (
            <div 
              key={index} 
              className="menu-item text-center cursor-pointer p-3"
              onClick={() => handleMenuClick(item)}
            >
              <div className="menu-icon text-2xl mb-2">{item.icon}</div>
              <Text size="xSmall" className="menu-title">{item.title}</Text>
            </div>
          ))}
        </Grid>

        <Grid columnCount={3} columnGap={12} rowGap={16} style={{marginTop: '16px'}}>
          {menuItems.slice(4).map((item, index) => (
            <div 
              key={index + 4} 
              className="menu-item text-center cursor-pointer p-3"
              onClick={() => handleMenuClick(item)}
            >
              <div className="menu-icon text-2xl mb-2">{item.icon}</div>
              <Text size="xSmall" className="menu-title">{item.title}</Text>
            </div>
          ))}
        </Grid>
      </Box>

      {/* Quan tâm OA */}
      <Box p={4} className="follow-section">
        <Box className="rounded-2xl shadow-md bg-white" p={4}>
          <Text.Header size="small">
            Quan tâm OA để nhận các chương trình đặc quyền ưu đãi
          </Text.Header>
          <Box flex justifyContent="space-between" alignItems="center" mt={3}>
            <Box flex alignItems="center">
              <div className="oa-avatar w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl">🍗</div>
              <Box ml={3}>
                <Text.Header size="small">Gà Rán FKT</Text.Header>
                <Text size="xSmall" className="text-gray-500">Official Account</Text>
              </Box>
            </Box>
            <Button size="small" variant="primary">Quan tâm</Button>
          </Box>
        </Box>
      </Box>

      {/* Hot combo */}
      <Box p={4}>
        <Box flex justifyContent="space-between" alignItems="center" mb={3}>
          <Text.Header>COMBO SIÊU HÓT - CHIẾN LÀ MÊ 🔥</Text.Header>
          <Text 
            size="small" 
            className="text-primary cursor-pointer"
            onClick={() => navigate('/products')}
          >
            Tất cả
          </Text>
        </Box>
        
        <Grid columnCount={2} columnGap={16}>
          {hotCombos.map(combo => (
            <Box 
              key={combo.id} 
              className="rounded-2xl shadow-md bg-white cursor-pointer"
              onClick={() => handleComboClick(combo)}
            >
              <Box p={0}>
                <img 
                  src={combo.image} 
                  alt={combo.name}
                  className="product-image w-full h-32 object-cover rounded-t-2xl"
                />
                <Box p={3}>
                  <Text.Header size="small">{combo.name}</Text.Header>
                  <Text size="xSmall" className="text-gray-500 mb-2">
                    {combo.description}
                  </Text>
                  <Text size="large" className="text-primary font-bold">
                    {combo.price.toLocaleString()}đ
                  </Text>
                  <Button 
                    size="small" 
                    variant="primary" 
                    fullWidth 
                    className="mt-2"
                    onClick={(e) => addToCart(combo, e)}
                  >
                    Đặt ngay
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Page>
  );
};

export default HomePage;
