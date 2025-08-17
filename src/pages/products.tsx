import React from "react";
import { Page, Header, Box, Text, Button, Tabs } from "zmp-ui";
import { useRecoilValue, useRecoilState } from "recoil";
import { productsState, cartState } from "../store";
import { Product } from "../types";
import { useSnackbar } from "zmp-ui";

const ProductsPage: React.FC = () => {
  const products = useRecoilValue(productsState);
  const [cart, setCart] = useRecoilState(cartState);
  const { openSnackbar } = useSnackbar();

  const addToCart = (product: Product) => {
    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      setCart(cart.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    openSnackbar({ text: `Đã thêm ${product.name}`, type: "success" });
  };

  const renderProducts = (list: Product[]) => (
    <Box className="grid grid-cols-2 gap-4 p-4">
      {list.map((p) => (
        <Box key={p.id} className="rounded-2xl shadow-md bg-white overflow-hidden">
          <img src={p.image} alt={p.name} className="w-full h-32 object-cover" />
          <Box p={3}>
            <Text.Header size="small">{p.name}</Text.Header>
            <Text size="xSmall" className="text-gray-500">{p.description}</Text>
            <Text size="large" className="text-primary font-bold">
              {p.price.toLocaleString()}đ
            </Text>
            <Button size="small" variant="primary" fullWidth className="mt-2"
              onClick={() => addToCart(p)}>
              Đặt ngay
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Page className="page">
      <Header title="Sản phẩm" />
      <Tabs>
        <Tabs.Tab key="combo" label="Combo">
          {renderProducts(products.combo)}
        </Tabs.Tab>
        <Tabs.Tab key="powder" label="Bột chiên">
          {renderProducts(products.powder)}
        </Tabs.Tab>
        <Tabs.Tab key="promotion" label="Khuyến mãi">
          {renderProducts(products.promotion)}
        </Tabs.Tab>
      </Tabs>
    </Page>
  );
};

export default ProductsPage;
