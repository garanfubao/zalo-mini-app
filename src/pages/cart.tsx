import React from "react";
import { Page, Header, Box, Text, Button } from "zmp-ui";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, orderHistoryState } from "../store";
import { cartTotalState } from "../state";
import { Order } from "../types";

const CartPage: React.FC = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [orders, setOrders] = useRecoilState(orderHistoryState);
  const total = useRecoilValue(cartTotalState);

  const checkout = () => {
    const order: Order = {
      id: Date.now(),
      items: cart,
      orderInfo: {
        name: "Khách Zalo",
        phone: "0123456789",
        address: "Địa chỉ demo",
        paymentMethod: "cod",
      },
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setOrders([order, ...orders]);
    setCart([]);
    alert("Đặt hàng thành công!");
  };

  return (
    <Page className="page">
      <Header title="Giỏ hàng" />
      <Box p={4}>
        {cart.length === 0 ? (
          <Text>Giỏ hàng trống.</Text>
        ) : (
          <Box>
            {cart.map((item) => (
              <Box
                key={item.id}
                className="rounded-2xl shadow-md bg-white flex items-center mb-3 overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />
                <Box p={3} flex column grow>
                  <Text.Header size="small">{item.name}</Text.Header>
                  <Text size="small">{item.price.toLocaleString()}đ</Text>
                  <Box flex justifyContent="space-between" mt={2}>
                    <Button
                      size="small"
                      onClick={() =>
                        setCart(
                          cart
                            .map((c) =>
                              c.id === item.id
                                ? { ...c, quantity: c.quantity - 1 }
                                : c
                            )
                            .filter((c) => c.quantity > 0)
                        )
                      }
                    >
                      -
                    </Button>
                    <Text>{item.quantity}</Text>
                    <Button
                      size="small"
                      onClick={() =>
                        setCart(
                          cart.map((c) =>
                            c.id === item.id
                              ? { ...c, quantity: c.quantity + 1 }
                              : c
                          )
                        )
                      }
                    >
                      +
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
            <Box mt={4}>
              <Text size="large" className="font-bold">
                Tổng: {total.toLocaleString()}đ
              </Text>
              <Button
                fullWidth
                variant="primary"
                className="mt-3"
                onClick={checkout}
              >
                Đặt hàng
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default CartPage;
