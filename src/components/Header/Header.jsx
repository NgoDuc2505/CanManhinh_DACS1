import { Flex, Image, Typography, Menu, Button } from "antd";
import {
  AppstoreOutlined,
  EditOutlined,
  LoginOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import style from "./header.module.css";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN, REGISTER, HOME, ADMIN } from "../../constants/constant";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const refBtn = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const [hiddenState, setHidden] = useState(true);
  const { Title } = Typography;
  const { title_h3_logo, btn_collapse, menu2_display, menu2_hidden } = style;
  const items = [
    {
      label: "Giới thiệu",
      key: HOME,
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
    },
    {
      label: "Khác",
      key: "other",
      icon: <MailOutlined />,
      children: [
        {
          label: "Đăng ký",
          key: REGISTER,
          icon: <EditOutlined />,
        },
        {
          label: "Đăng nhập",
          key: LOGIN,
          icon: <LoginOutlined />,
        },
        {
          label: "Admin",
          key: ADMIN,
          icon: <UserOutlined />,
        },
      ],
    },
  ];

  useEffect(() => {
    if(!hiddenState){
      refBtn.current.click();
    }
  }, [location.pathname]);
  
  const handleClickMenu1 = (e) => {
    const { key } = e;
    navigate(`${key}`);
  };
  const handleClickMenu2 = (e) => {
    const { key } = e;
    navigate(`${key}`);
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
          ref={refBtn}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          onClick={handleClickMenu1}
          mode="horizontal"
          items={items}
          theme="dark"
          className={style["menu_header"]}
        />
        <Menu
          onClick={handleClickMenu2}
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
