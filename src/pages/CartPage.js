import React, { useState } from 'react';
import { 
  Page, 
  Header, 
  Box, 
  Card, 
  Text, 
  Button,
  Input,
  Select,
  Sheet,
  useSnackbar
} from 'zmp-ui';
import { useRecoilState } from 'recoil';
import { cartState, orderHistoryState } from '../store';
import { sendOrderNotification } from '../api';

const CartPage = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [orderHistory, setOrderHistory] = useRecoilState(orderHistoryState);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { openSnackbar } = useSnackbar();
  
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'cod'
  });

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== id));
      openSnackbar({
        text: 'Đã xóa sản phẩm khỏi giỏ hàng',
        type: 'success'
      });
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    // Validation
    if (!orderInfo.name.trim()) {
      openSnackbar({ text: 'Vui lòng nhập họ tên', type: 'error' });
      return;
    }
    if (!orderInfo.phone.trim()) {
      openSnackbar({ text: 'Vui lòng nhập số điện thoại', type: 'error' });
      return;
    }
    if (!orderInfo.address.trim()) {
      openSnackbar({ text: 'Vui lòng nhập địa chỉ', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newOrder = {
        id: Date.now(),
        items: cart,
        orderInfo,
        total: getTotalPrice(),
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Lưu vào lịch sử
      setOrderHistory([newOrder, ...orderHistory]);
      
      // Gửi thông báo (có thể bỏ qua nếu chưa setup API)
      try {
        await sendOrderNotification(newOrder);
      } catch (apiError) {
        console.log('API error (ignored):', apiError);
      }
      
      // Clear giỏ hàng
      setCart([]);
      setShowCheckout(false);
      
      openSnackbar({
        text: 'Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.',
        type: 'success'
      });
      
      // Reset form
      setOrderInfo({
        name: '',
        phone: '',
        address: '',
        note: '',
        paymentMethod: 'cod'
      });
      
    } catch (error) {
      openSnackbar({
        text: 'Có lỗi xảy ra. Vui lòng thử lại!',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Page className="page">
        <Header title="Giỏ hàng" />
        <Box p={4} className="text-center empty-cart">
          <div className="empty-icon">🛒</div>
          <Text className="mb-3">Giỏ hàng trống</Text>
          <Button 
            variant="primary" 
            onClick={() => window.history.back()}
          >
            Tiếp tục mua sắm
          </Button>
        </Box>
      </Page>
    );
  }

  return (
    <Page className="page">
      <Header title="Giỏ hàng" />
      
      <Box p={4}>
        {/* Cart Items */}
        {cart.map(item => (
          <Card key={item.id} className="mb-3">
            <Box p={3}>
              <Box flex>
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="cart-item-image"
                />
                <Box ml={3} flex={1}>
                  <Text.Header size="small">{item.name}</Text.Header>
                  <Text className="text-primary font-bold">
                    {item.price.toLocaleString()}đ
                  </Text>
                  <Box flex alignItems="center" mt={2}>
                    <Button 
                      size="small" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <Text className="quantity-text">{item.quantity}</Text>
                    <Button 
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button 
                      size="small"
                      variant="secondary"
                      className="ml-3"
                      onClick={() => updateQuantity(item.id, 0)}
                    >
                      Xóa
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        ))}

        {/* Total */}
        <Card className="total-card">
          <Box p={4}>
            <Box flex justifyContent="space-between" alignItems="center">
              <Text.Header>Tổng cộng:</Text.Header>
              <Text.Header className="text-primary">
                {getTotalPrice().toLocaleString()}đ
              </Text.Header>
            </Box>
          </Box>
        </Card>

        {/* Checkout Button */}
        <Button 
          variant="primary" 
          fullWidth 
          size="large"
          className="mt-4"
          onClick={() => setShowCheckout(true)}
        >
          Đặt hàng
        </Button>
      </Box>

      {/* Checkout Sheet */}
      <Sheet 
        visible={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        height="80%"
        title="Thông tin đặt hàng"
      >
        <Box p={4}>
          <Input 
            label="Họ tên *"
            placeholder="Nhập họ tên"
            value={orderInfo.name}
            onChange={(e) => setOrderInfo({...orderInfo, name: e.target.value})}
            className="mb-3"
          />
          
          <Input 
            label="Số điện thoại *"
            placeholder="Nhập số điện thoại"
            type="tel"
            value={orderInfo.phone}
            onChange={(e) => setOrderInfo({...orderInfo, phone: e.target.value})}
            className="mb-3"
          />
          
          <Input 
            label="Địa chỉ giao hàng *"
            placeholder="Nhập địa chỉ giao hàng"
            value={orderInfo.address}
            onChange={(e) => setOrderInfo({...orderInfo, address: e.target.value})}
            className="mb-3"
          />
          
          <Input 
            label="Ghi chú"
            placeholder="Ghi chú đơn hàng (tùy chọn)"
            value={orderInfo.note}
            onChange={(e) => setOrderInfo({...orderInfo, note: e.target.value})}
            className="mb-3"
          />

          <Select 
            label="Phương thức thanh toán"
            value={orderInfo.paymentMethod}
            onChange={(value) => setOrderInfo({...orderInfo, paymentMethod: value})}
            className="mb-4"
          >
            <Select.Option 
              value="cod" 
              title="Thanh toán khi nhận hàng (COD)" 
            />
            <Select.Option 
              value="zalopay" 
              title="ZaloPay" 
            />
          </Select>

          {/* Order Summary */}
          <Card className="mb-4">
            <Box p={3}>
              <Text.Header size="small" className="mb-2">Tóm tắt đơn hàng:</Text.Header>
              {cart.map(item => (
                <Box key={item.id} flex justifyContent="space-between" className="mb-1">
                  <Text size="small">{item.name} x{item.quantity}</Text>
                  <Text size="small">{(item.price * item.quantity).toLocaleString()}đ</Text>
                </Box>
              ))}
              <hr className="my-2" />
              <Box flex justifyContent="space-between">
                <Text.Header size="small">Tổng:</Text.Header>
                <Text.Header size="small" className="text-primary">
                  {getTotalPrice().toLocaleString()}đ
                </Text.Header>
              </Box>
            </Box>
          </Card>

          <Box flex gap={3}>
            <Button 
              variant="secondary" 
              flex={1}
              onClick={() => setShowCheckout(false)}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button 
              variant="primary" 
              flex={1}
              onClick={handleCheckout}
              loading={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
            </Button>
          </Box>
        </Box>
      </Sheet>
    </Page>
  );
};

export default CartPage;