import React from 'react';
import { 
  Page, 
  Header, 
  Box, 
  Card, 
  Text, 
  Button,
  useSnackbar
} from 'zmp-ui';
import { useRecoilState } from 'recoil';
import { orderHistoryState } from '../store';

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useRecoilState(orderHistoryState);
  const { openSnackbar } = useSnackbar();

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Đang xử lý',
      confirmed: 'Đã xác nhận',
      shipping: 'Đang giao hàng',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      pending: '#ffa500',
      confirmed: '#007bff',
      shipping: '#17a2b8',
      completed: '#28a745',
      cancelled: '#dc3545'
    };
    return colorMap[status] || '#666';
  };

  const cancelOrder = (orderId) => {
    setOrderHistory(orderHistory.map(order => 
      order.id === orderId 
        ? { ...order, status: 'cancelled' }
        : order
    ));
    openSnackbar({
      text: 'Đã hủy đơn hàng thành công',
      type: 'success'
    });
  };

  if (orderHistory.length === 0) {
    return (
      <Page className="page">
        <Header title="Lịch sử đơn hàng" />
        <Box p={4} className="text-center empty-orders">
          <div className="empty-icon">📋</div>
          <Text className="mb-3">Chưa có đơn hàng nào</Text>
          <Button 
            variant="primary" 
            onClick={() => window.history.back()}
          >
            Đặt hàng ngay
          </Button>
        </Box>
      </Page>
    );
  }

  return (
    <Page className="page">
      <Header title="Lịch sử đơn hàng" />
      
      <Box p={4}>
        {orderHistory.map(order => (
          <Card key={order.id} className="mb-3">
            <Box p={4}>
              {/* Order Header */}
              <Box flex justifyContent="space-between" alignItems="start" className="mb-3">
                <div>
                  <Text.Header size="small">Đơn hàng #{order.id}</Text.Header>
                  <Text size="small" className="text-gray">
                    {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                </div>
                <div 
                  className="status-badge" 
                  style={{
                    color: getStatusColor(order.status),
                    backgroundColor: `${getStatusColor(order.status)}20`
                  }}
                >
                  {getStatusText(order.status)}
                </div>
              </Box>

              {/* Customer Info */}
              <Box className="mb-3">
                <Text size="small" className="text-gray">Thông tin khách hàng:</Text>
                <Text size="small">
                  <strong>{order.orderInfo.name}</strong> - {order.orderInfo.phone}
                </Text>
                <Text size="small" className="text-gray">
                  📍 {order.orderInfo.address}
                </Text>
                {order.orderInfo.note && (
                  <Text size="small" className="text-gray">
                    📝 Ghi chú: {order.orderInfo.note}
                  </Text>
                )}
              </Box>

              {/* Order Items */}
              <Box className="mb-3">
                <Text size="small" className="text-gray mb-2">Sản phẩm:</Text>
                <div className="order-items">
                  {order.items.map(item => (
                    <Box key={item.id} flex justifyContent="space-between" className="order-item">
                      <Box flex alignItems="center">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="order-item-image"
                        />
                        <Box ml={2}>
                          <Text size="small">{item.name}</Text>
                          <Text size="xSmall" className="text-gray">
                            x{item.quantity}
                          </Text>
                        </Box>
                      </Box>
                      <Text size="small" className="font-bold">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </Text>
                    </Box>
                  ))}
                </div>
              </Box>

              {/* Payment Info */}
              <Box className="mb-3">
                <Text size="small" className="text-gray">Thanh toán:</Text>
                <Text size="small">
                  {order.orderInfo.paymentMethod === 'cod' ? 'COD (Thanh toán khi nhận hàng)' : 'ZaloPay'}
                </Text>
              </Box>

              {/* Total and Actions */}
              <Box flex justifyContent="space-between" alignItems="center">
                <Text.Header className="text-primary">
                  Tổng: {order.total.toLocaleString()}đ
                </Text.Header>
                <Box flex gap={2}>
                  {order.status === 'pending' && (
                    <Button 
                      size="small" 
                      variant="secondary"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Hủy đơn
                    </Button>
                  )}
                  <Button size="small" variant="primary">
                    Chi tiết
                  </Button>
                </Box>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Page>
  );
};

export default OrderHistoryPage;