// API configuration
const API_BASE = 'https://your-api-domain.com/api';
const OA_ACCESS_TOKEN = 'your-oa-access-token';

// Send order notification to backend and Zalo OA
export const sendOrderNotification = async (orderData) => {
  try {
    // Send to your backend webhook (optional)
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    
    if (response.ok) {
      // Send notification to Zalo OA
      await sendZaloOAMessage(orderData);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error sending order:', error);
    // Không throw error để app vẫn hoạt động khi chưa setup API
    return null;
  }
};

// Send message to Zalo OA
export const sendZaloOAMessage = async (orderData) => {
  try {
    const message = {
      recipient: {
        user_id: "your-admin-user-id" // ID người nhận thông báo
      },
      message: {
        text: formatOrderMessage(orderData)
      }
    };

    const response = await fetch('https://openapi.zalo.me/v2.0/oa/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': OA_ACCESS_TOKEN
      },
      body: JSON.stringify(message)
    });

    return response.json();
  } catch (error) {
    console.error('Error sending Zalo message:', error);
    return null;
  }
};

// Format order message for Zalo OA
const formatOrderMessage = (orderData) => {
  const itemsList = orderData.items
    .map(item => `- ${item.name} x${item.quantity}: ${(item.price * item.quantity).toLocaleString()}đ`)
    .join('\n');

  return `🔔 ĐỠN HÀNG MỚI #${orderData.id}

👤 Khách hàng: ${orderData.orderInfo.name}
📞 SĐT: ${orderData.orderInfo.phone}
📍 Địa chỉ: ${orderData.orderInfo.address}
💰 Tổng tiền: ${orderData.total.toLocaleString()}đ
💳 Thanh toán: ${orderData.orderInfo.paymentMethod === 'cod' ? 'COD' : 'ZaloPay'}

📋 Chi tiết sản phẩm:
${itemsList}

${orderData.orderInfo.note ? `📝 Ghi chú: ${orderData.orderInfo.note}` : ''}

⏰ Thời gian: ${new Date(orderData.createdAt).toLocaleString('vi-VN')}`;
};

// Get user info from Zalo (optional)
export const getZaloUserInfo = async () => {
  try {
    // Use Zalo Mini App SDK
    const userInfo = await window.ZMP?.getUserInfo();
    return userInfo;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
};

// Create ZaloPay order (for future integration)
export const createZaloPayOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE}/zalopay/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: orderData.total,
        description: `Thanh toán đơn hàng FKT #${orderData.id}`,
        orderInfo: orderData
      })
    });
    
    return response.json();
  } catch (error) {
    console.error('Error creating ZaloPay order:', error);
    throw error;
  }
};

// Simple webhook endpoint example (for reference)
export const webhookExample = `
// Webhook endpoint example (Node.js/Express)
app.post('/api/orders', (req, res) => {
  const orderData = req.body;
  
  // Process order
  console.log('New order received:', orderData);
  
  // Save to database
  // Send email notification
  // Update inventory
  
  res.json({ success: true, orderId: orderData.id });
});
`;