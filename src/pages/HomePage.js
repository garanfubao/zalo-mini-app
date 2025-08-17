import React from 'react';
import { 
  Page, 
  Header, 
  Box, 
  Grid, 
  Card, 
  Text, 
  Button,
  Carousel
} from 'zmp-ui';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: '🎯', title: 'Tích điểm', path: '/profile' },
    { icon: '🛍️', title: 'Đặt hàng', path: '/products' },
    { icon: '📞', title: 'Liên hệ', action: 'contact' },
    { icon: '🎁', title: 'Voucher', path: '/promotions' },
    { icon: '⭐', title: 'Hàng thành viên', path: '/member' },
    { icon: '🔥', title: 'Khuyến mãi', path: '/promotions' },
    { icon: '📋', title: 'Lịch sử', path: '/orders' }
  ];

  const hotCombos = [
    {
      id: 1,
      name: 'Combo Siêu Hót 1',
      price: 155000,
      image: '/assets/combo1.jpg',
      description: 'Gà rán + Khoai tây + Nước'
    },
    {
      id: 2,
      name: 'Combo Siêu Hót 2', 
      price: 255000,
      image: '/assets/combo2.jpg',
      description: 'Gà rán + Khoai tây + Burger + Nước'
    }
  ];

  const handleMenuClick = (item) => {
    if (item.action === 'contact') {
      // Mở chat với OA
      try {
        window.ZaloJavaScriptInterface?.openChat({
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

  const handleComboClick = (combo) => {
    navigate('/products', { state: { selectedProduct: combo } });
  };

  return (
    <Page className="page">
      <Header title="Gà Rán FKT" showBackIcon={false} />
      
      {/* Banner Carousel */}
      <Box p={0}>
        <Carousel autoplay={3000} duration={500}>
          <div className="carousel-item">
            <img 
              src="/assets/banner1.jpg" 
              alt="Banner 1" 
              className="banner-image"
            />
          </div>
          <div className="carousel-item">
            <img 
              src="/assets/banner2.jpg" 
              alt="Banner 2" 
              className="banner-image"
            />
          </div>
        </Carousel>
      </Box>

      {/* Menu Grid */}
      <Box p={4}>
        <Grid columnCount={4} columnGap={12} rowGap={16}>
          {menuItems.slice(0, 4).map((item, index) => (
            <div 
              key={index} 
              className="menu-item"
              onClick={() => handleMenuClick(item)}
            >
              <div className="menu-icon">{item.icon}</div>
              <Text size="xSmall" className="menu-title">{item.title}</Text>
            </div>
          ))}
        </Grid>

        <Grid columnCount={3} columnGap={12} rowGap={16} style={{marginTop: '16px'}}>
          {menuItems.slice(4).map((item, index) => (
            <div 
              key={index + 4} 
              className="menu-item"
              onClick={() => handleMenuClick(item)}
            >
              <div className="menu-icon">{item.icon}</div>
              <Text size="xSmall" className="menu-title">{item.title}</Text>
            </div>
          ))}
        </Grid>
      </Box>

      {/* Follow OA Section */}
      <Box p={4} className="follow-section">
        <Card>
          <Box p={4}>
            <Text.Header size="small">
              Quan tâm OA để nhận các chương trình đặc quyền ưu đãi
            </Text.Header>
            <Box flex justifyContent="space-between" alignItems="center" mt={3}>
              <Box flex alignItems="center">
                <div className="oa-avatar">🍗</div>
                <Box ml={3}>
                  <Text.Header size="small">Gà Rán FKT</Text.Header>
                  <Text size="xSmall" className="text-gray">Official Account</Text>
                </Box>
              </Box>
              <Button size="small" variant="primary">Quan tâm</Button>
            </Box>
          </Box>
        </Card>
      </Box>

      {/* Hot Combos */}
      <Box p={4}>
        <Box flex justifyContent="space-between" alignItems="center" mb={3}>
          <Text.Header>COMBO SIÊU HÓT - CHIẾN LÀ MÊ 🔥</Text.Header>
          <Text 
            size="small" 
            className="text-primary"
            onClick={() => navigate('/products')}
          >
            Tất cả
          </Text>
        </Box>
        
        <Grid columnCount={2} columnGap={16}>
          {hotCombos.map(combo => (
            <Card key={combo.id} onClick={() => handleComboClick(combo)}>
              <Box p={0}>
                <img 
                  src={combo.image} 
                  alt={combo.name}
                  className="product-image"
                />
                <Box p={3}>
                  <Text.Header size="small">{combo.name}</Text.Header>
                  <Text size="xSmall" className="text-gray mb-2">
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleComboClick(combo);
                    }}
                  >
                    Đặt ngay
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}
        </Grid>
      </Box>
    </Page>
  );
};

export default HomePage;