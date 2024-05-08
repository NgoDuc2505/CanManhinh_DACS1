import { Flex, Image, Typography, Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import style from "./header.module.css";

function Header() {
  const { Title } = Typography;
  const { title_h3_logo } = style;
  const items = [
    {
      label: "Giới thiệu",
      key: "intro",
      icon: <MailOutlined />,
    },
    {
      label: "Dịch vụ",
      key: "services",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Hỗ trợ",
      key: "support",
      icon: <SettingOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:1",
            },
            {
              label: "Option 2",
              key: "setting:2",
            },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            {
              label: "Option 3",
              key: "setting:3",
            },
            {
              label: "Option 4",
              key: "setting:4",
            },
          ],
        },
      ],
    },
    {
      label: "Khác",
      key: "other",
      icon: <MailOutlined />,
    },
  ];
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <Flex
      vertical={false}
      align="center"
      justify="space-between"
      className={`${style["header"]} px-4`}
    >
      <Flex align="center">
        <Image src="/logo.svg"></Image>
        <Title
          className={title_h3_logo}
          level={3}
          style={{ color: "white", marginLeft: "10px", marginBottom: "0" }}
        >
          Pro Display
        </Title>
      </Flex>
      <Menu
        onClick={onClick}
        mode="horizontal"
        items={items}
        theme="dark"
        className={style["menu_header"]}
      />
      <div className={style["user_logo"]}>
        <UserOutlined />
      </div>
    </Flex>
  );
}

export default Header;
