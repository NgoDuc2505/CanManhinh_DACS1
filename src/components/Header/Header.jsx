import { Flex, Image, Typography, Menu, Button } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import style from "./header.module.css";
import { useState } from "react";

function Header() {
  const [collapsed, setCollapsed] = useState(false);
  const [hiddenState, setHidden] = useState(true);
  const { Title } = Typography;
  const { title_h3_logo, btn_collapse, menu2_display, menu2_hidden } = style;
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

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    setHidden(!hiddenState);
  };
  return (
    <div className="headerr">
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
        <Button
          type="default"
          onClick={toggleCollapsed}
          className={btn_collapse}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          onClick={onClick}
          mode="horizontal"
          items={items}
          theme="dark"
          className={style["menu_header"]}
        />
        <Menu
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={hiddenState}
          items={items}
          className={hiddenState ? menu2_hidden : menu2_display}
        />
        <div className={style["user_logo"]}>
          <UserOutlined />
        </div>
      </Flex>
    </div>
  );
}

export default Header;
