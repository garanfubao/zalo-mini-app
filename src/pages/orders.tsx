import React from "react";
import { Page, Header, Box, Text } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { orderHistoryState } from "../store";

const OrdersPage: React.FC = () => {
  const orders = useRecoilValue(orderHistoryState);

  return (
    <Page className="page">
      <Header title="Lịch sử đơn hàng" />
      <Box p={4}>
        {orders.length === 0 ? (
          <Text>Chưa có đơn hàng nào.</Text>
        ) : (
          orders.map((o) => (
            <Box key={o.id} className="rounded-2xl shadow-md bg-white mb-3 p-4">
              <Text.Header size="small">Đơn #{o.id}</Text.Header>
              <Text size="small" className="text-gray-500">
                {new Date(o.createdAt).toLocaleString()}
              </Text>
              <Text size="small">Tổng: {o.total.toLocaleString()}đ</Text>
              <Text size="small">Trạng thái: {o.status}</Text>
            </Box>
          ))
        )}
      </Box>
    </Page>
  );
};

export default OrdersPage;
