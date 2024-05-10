import React from "react";
import {
  LaptopOutlined,
  LogoutOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import TableBooking from "../../components/AdminComponents/TableOfBooking/TableBooking";
import style from "./adminTemplate.module.css";
import { useNavigate  } from "react-router-dom";
const AdminTemplate = () => {
  const { admin_sider } = style;
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Header, Content, Sider } = Layout;
  const sideBarTitleMapping = ["User Manage", "Booking Manage", "Income"];
  const menuItem = ["PRO DISPLAY", "Home", "Dash Board", "Log Out"].map(
    (item, index) => {
      return {
        key: index,
        label: item,
        icon: index == 3 ? <LogoutOutlined /> : <></>,
      };
    }
  );
  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: sideBarTitleMapping[index],
      };
    }
  );
  const menuHandleClick = (e)=>{
    const {key} = e;
    switch (key) {
      case '1':
        navigate('/')
        break;
    
      default:
        break;
    }
  }
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
            <TableBooking></TableBooking>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
