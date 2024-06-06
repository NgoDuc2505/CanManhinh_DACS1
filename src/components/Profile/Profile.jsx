import {
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Col,
  Row,
  Space,
  Typography,
  Button,
} from "antd";
import TableProfile from "./TableProfile";
import "./profile.css";
import FormProfile from "./FormProfile";

function Profile() {
  const { Title } = Typography;
  const isAdmin = true;
  return (
    <div className="profile container my-5" style={{ height: "" }}>
      <Row style={{ marginTop: "50px", gap: "10px", justifyContent: "center", }}>
        <Col span={24}  sm={8} style={{ overflow: "hidden" }}>
          <Space
            direction="vertical"
            align="center"
            style={{
              backgroundColor: "#8080801f",
              width: "100%",
              padding: "20px 0",
              height: "100%",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Avatar
              shape={isAdmin ? "circle" : "square"}
              size={64}
              icon={!isAdmin ? <UserOutlined /> : <ToolOutlined />}
              style={{ width: "100px", height: "100px" }}
            />
            <Title level={3}>User name</Title>
            <Title level={3}>Birthday</Title>
            <Title level={3}>Phone</Title>
            <Title level={3}>Bronze Account</Title>
            <Button type="primary">Log out</Button>
          </Space>
        </Col>
        <Col span={24} sm={15}  style={{ borderRadius: "8px", overflow: "hidden" }}>
          <Space
            direction="vertical"
            align="center"
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              height: "45vh",
              borderRadius: "8px",
              justifyContent: "center"
            }}
            className="space_form_profile"
          >
            <Title level={1}>About</Title>
            <FormProfile ></FormProfile>
          </Space>
          <Space
            direction="vertical"
            align="center"
            style={{
              backgroundColor: "#d9dfe5",
              width: "100%",
              height: "50%",
              borderRadius: "8px",
              marginTop: "10px",
            }}
            className="space_item_table"
          >
            <Title level={5} style={{textAlign:"center", marginBottom: "0"}}>History Booking</Title>
            <TableProfile></TableProfile>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
