import React, { useEffect, useState } from "react";
import { Page, Header, Box, Text, Avatar } from "zmp-ui";
import { getUserInfo } from "zmp-sdk";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUserInfo({
      success: (data) => setUser(data.userInfo),
      fail: () => setUser({ name: "Khách Zalo" }),
    });
  }, []);

  return (
    <Page className="page">
      <Header title="Cá nhân" />
      <Box p={4}>
        <Box className="rounded-2xl shadow-md bg-white p-4 flex items-center">
          <Avatar size={64} src={user?.avatar} />
          <Box ml={3}>
            <Text.Header size="small">{user?.name}</Text.Header>
            <Text size="small" className="text-gray-500">{user?.id}</Text>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default ProfilePage;
