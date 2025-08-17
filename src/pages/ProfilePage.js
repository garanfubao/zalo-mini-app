import React, { useState } from 'react';
import { 
  Page, 
  Header, 
  Box, 
  Card, 
  Text, 
  Button,
  Sheet,
  Input,
  useSnackbar
} from 'zmp-ui';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../store';

const ProfilePage = () => {
  const [user, setUser] = useRecoilState(userState);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  
  const [editForm, setEditForm] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address
  });

  const menuItems = [
    { 
      icon: '👤', 
      title: 'Đăng ký thành viên', 
      subtitle: 'Tích điểm đổi thưởng, mở rộng tiện ích',
      action: 'register',
      show: !user.isRegistered
    },
    { 
      icon: '⚙️', 
      title: 'Chỉnh sửa thông tin', 
      action: 'edit',
      show: true
    },
    { 
      icon: '📋', 
      title: 'Đơn hàng', 
      subtitle: 'Xem tất cả', 
      action: 'orders',
      show: true
    },
    { 
      icon: '🕒', 
      title: 'Lịch sử tích điểm', 
      action: 'points',
      show: user.isRegistered
    },
    { 
      icon: '📍', 
      title: 'Sổ địa chỉ', 
      action: 'address',
      show: true
    }
  ];

  const handleAction = (action) => {
    switch(action) {
      case 'register':
        setUser({...user, isRegistered: true});
        openSnackbar({
          text: 'Đăng ký thành viên thành công! 🎉',
          type: 'success'
        });
        break;
      case 'edit':
        setEditForm({
          name: user.name,
          phone: user.phone,
          address: user.address
        });
        setShowEditProfile(true);
        break;
      case 'orders':
        navigate('/orders');
        break;
      default:
        openSnackbar({
          text: 'Tính năng đang phát triển',
          type: 'info'
        });
    }
  };

  const saveProfile = () => {
    if (!editForm.name.trim()) {
      openSnackbar({ text: 'Vui lòng nhập họ tên', type: 'error' });
      return;
    }
    
    setUser({...user, ...editForm});
    setShowEditProfile(false);
    openSnackbar({
      text: 'Cập nhật thông tin thành công!',
      type: 'success'
    });
  };

  return (
    <Page className="page">
      <Header title="Cá nhân" />
      
      <Box p={4}>
        {/* User Registration Banner */}
        {!user.isRegistered && (
          <Card 
            className="register-banner mb-4"
            onClick={() => handleAction('register')}
          >
            <Box p={4}>
              <Box flex alignItems="center">
                <div className="user-icon">👤</div>
                <Box ml={3} flex={1}>
                  <Text.Header size="small" className="text-white">
                    Đăng ký thành viên
                  </Text.Header>
                  <Text size="small" className="text-white-70">
                    Tích điểm đổi thưởng, mở rộng tiện ích
                  </Text>
                </Box>
                <Text className="arrow text-white">›</Text>
              </Box>
            </Box>
          </Card>
        )}

        {/* Menu Items */}
        {menuItems.filter(item => item.show).map((item, index) => (
          <Card key={index} className="mb-2" onClick={() => handleAction(item.action)}>
            <Box p={4}>
              <Box flex alignItems="center">
                <div className="menu-icon">{item.icon}</div>
                <Box ml={3} flex={1}>
                  <Text.Header size="small">{item.title}</Text.Header>
                  {item.subtitle && (
                    <Text size="small" className="text-gray">{item.subtitle}</Text>
                  )}
                </Box>
                <Text className="arrow">›</Text>
              </Box>
            </Box>
          </Card>
        ))}

        {/* Follow OA Section */}
        <Card className="mt-4">
          <Box p={4}>
            <Text size="small" className="text-center mb-3">
              Quan tâm OA để nhận các chương trình đặc quyền ưu đãi
            </Text>
            <Box flex justifyContent="space-between" alignItems="center">
              <Box flex alignItems="center">
                <div className="oa-avatar">🍗</div>
                <Box ml={3}>
                  <Text.Header size="small">Gà Rán FKT</Text.Header>
                  <Text size="small" className="text-gray">Official Account</Text>
                </Box>
              </Box>
              <Button size="small" variant="primary">Quan tâm</Button>
            </Box>
          </Box>
        </Card>

        {/* QR Code Section */}
        <Box className="text-center mt-4">
          <Text size="small" className="mb-3">
            Chia sẻ mã QR này để kết bạn nhanh chóng, bảo mật
          </Text>
          <div className="qr-container" onClick={() => setShowQR(true)}>
            <div className="qr-logo">🍗</div>
            <Text.Header size="small" className="mt-2">Gà Rán FKT</Text.Header>
            <div className="qr-placeholder">
              <Text size="xSmall">QR Code</Text>
            </div>
          </div>
        </Box>
      </Box>

      {/* Edit Profile Sheet */}
      <Sheet 
        visible={showEditProfile} 
        onClose={() => setShowEditProfile(false)} 
        height="60%"
        title="Chỉnh sửa thông tin"
      >
        <Box p={4}>
          <Input 
            label="Họ tên"
            placeholder="Nhập họ tên"
            value={editForm.name}
            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
            className="mb-3"
          />
          
          <Input 
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            type="tel"
            value={editForm.phone}
            onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
            className="mb-3"
          />
          
          <Input 
            label="Địa chỉ"
            placeholder="Nhập địa chỉ"
            value={editForm.address}
            onChange={(e) => setEditForm({...editForm, address: e.target.value})}
            className="mb-4"
          />

          <Box flex gap={3}>
            <Button 
              variant="secondary" 
              flex={1}
              onClick={() => setShowEditProfile(false)}
            >
              Hủy
            </Button>
            <Button 
              variant="primary" 
              flex={1}
              onClick={saveProfile}
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </Sheet>

      {/* QR Sheet */}
      <Sheet 
        visible={showQR} 
        onClose={() => setShowQR(false)} 
        height="50%"
        title="QR Code chia sẻ"
      >
        <Box p={4} className="text-center">
          <div className="qr-large">
            <div className="qr-code-display">
              <div className="qr-pattern">
                <div className="qr-corner"></div>
                <div className="qr-corner"></div>
                <div className="qr-corner"></div>
                <div className="qr-center">🍗</div>
              </div>
            </div>
          </div>
          <Text className="mt-3">
            Quét mã QR để kết nối với OA Gà Rán FKT
          </Text>
          <Button 
            variant="secondary" 
            size="small" 
            className="mt-3"
            onClick={() => {
              // Copy link to clipboard
              navigator.clipboard?.writeText('https://zalo.me/your-oa-id');
              openSnackbar({ text: 'Đã copy link!', type: 'success' });
            }}
          >
            Copy Link
          </Button>
        </Box>
      </Sheet>
    </Page>
  );
};

export default ProfilePage;