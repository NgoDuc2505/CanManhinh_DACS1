import React, { Suspense, useEffect } from "react";
import {
  LaptopOutlined,
  LogoutOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import style from "./adminTemplate.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { getValue } from "../../services/local_storage";
import {
  ADMIN_CODE,
  TOKEN_LOGIN,
  USER_PROFILE,
} from "../../constants/constant";
import { setCurrentUser, setIsAdmin } from "../../redux/Slices/profileSlice";
import { useDispatch } from "react-redux";
import { decodeToken } from "../../services/check_pass";
const AdminTemplate = () => {
  const { admin_sider } = style;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Header, Content, Sider } = Layout;
  const sideBarTitleMapping = [
    "User Manage",
    "Booking Manage",
    "Income",
    "Feature",
  ];

  const sideBarNavPathMapping = ["", "bookingManage", "income", "feature"];
  const menuItem = ["PRO DISPLAY", "Home", "Dash Board", "Log Out"].map(
    (item, index) => {
      return {
        key: index,
        label: item,
        icon: index == 3 ? <LogoutOutlined /> : <></>,
      };
    }
  );
  const items2 = [
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    LaptopOutlined,
  ].map((icon, index) => {
    return {
      key: `${sideBarNavPathMapping[index]}`,
      icon: React.createElement(icon),
      label: sideBarTitleMapping[index],
    };
  });
  const menuHandleClick = (e) => {
    const { key } = e;
    switch (key) {
      case "1":
        navigate("/");
        break;

      default:
        break;
    }
  };

  const sibarHandleClick = (e) => {
    const { key } = e;
    console.log(key);
    navigate(`${key}`);
  };
  const data = getValue(TOKEN_LOGIN);
  const profile = getValue(USER_PROFILE);
  const tokenDecode = decodeToken(data);
  useEffect(() => {
    dispatch(setCurrentUser(profile));
    if (tokenDecode?.roleID == ADMIN_CODE) {
      dispatch(setIsAdmin(true));
    } else {
      dispatch(setIsAdmin(false));
    }
  }, []);
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={menuItem}
          onClick={menuHandleClick}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
          className={admin_sider}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
            onClick={sibarHandleClick}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: "600px",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Suspense>
              <Outlet></Outlet>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
