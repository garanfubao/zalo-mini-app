import React, { useState } from 'react';
import { 
  Page, 
  Header, 
  Box, 
  Tabs, 
  Grid, 
  Card, 
  Text, 
  Button,
  useSnackbar
} from 'zmp-ui';
import { useRecoilState } from 'recoil';
import { cartState } from '../store';

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('combo');
  const [cart, setCart] = useRecoilState(cartState);
  const { openSnackbar } = useSnackbar();

  const products = {
    combo: [
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
    ],
    powder: [
      {
        id: 3,
        name: 'Bột Chiên Gà 10kg',
        price: 650000,
        image: '/assets/powder1.jpg',
        description: 'Bột chiên gà cao cấp, tặng thêm gia vị'
      },
      {
        id: 4,
        name: 'Bột Chiên Gà 5kg + Bột Chiên Khoai',
        price: 650000,
        image: '/assets/powder2.jpg', 
        description: 'Combo bột chiên đa dạng'
      }
    ],
    promotion: [
      {
        id: 5,
        name: 'Combo Khuyến Mãi 1',
        price: 99000,
        originalPrice: 150000,
        image: '/assets/promo1.jpg',
        description: 'Giảm giá đặc biệt - Số lượng có hạn'
      }
    ]
  };

  const addToCart = (product) => {
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

  const tabs = [
    { key: 'combo', title: 'Combo' },
    { key: 'powder', title: 'Bột chiên' },
    { key: 'promotion', title: 'Khuyến mãi' }
  ];

  return (
    <Page className="page">
      <Header title="Sản phẩm" />
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {tabs.map(tab => (
          <Tabs.Tab key={tab.key} label={tab.title}>
            <Box p={4}>
              <Grid columnCount={2} columnGap={16} rowGap={16}>
                {products[tab.key]?.map(product => (
                  <Card key={product.id}>
                    <Box p={0}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-image"
                      />
                      <Box p={3}>
                        <Text.Header size="small">{product.name}</Text.Header>
                        <Text size="xSmall" className="text-gray mb-2">
                          {product.description}
                        </Text>
                        <Box flex alignItems="center" justifyContent="space-between">
                          <div>
                            <Text size="large" className="text-primary font-bold">
                              {product.price.toLocaleString()}đ
                            </Text>
                            {product.originalPrice && (
                              <Text size="small" className="text-gray line-through">
                                {product.originalPrice.toLocaleString()}đ
                              </Text>
                            )}
                          </div>
                          <Button 
                            size="small" 
                            variant="primary"
                            onClick={() => addToCart(product)}
                          >
                            +
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Grid>
              
              {products[tab.key]?.length === 0 && (
                <Box className="text-center py-8">
                  <Text>Đang cập nhật sản phẩm...</Text>
                </Box>
              )}
            </Box>
          </Tabs.Tab>
        ))}
      </Tabs>
    </Page>
  );
};

export default ProductsPage;