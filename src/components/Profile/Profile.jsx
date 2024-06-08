import {
  GiftOutlined,
  PhoneOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Row, Space, Typography, Button } from "antd";
import TableProfile from "./TableProfile";
import "./profile.css";
import FormProfile from "./FormProfile";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { ADMIN_CODE } from "../../constants/constant";

function Profile() {
  const selector = useSelector((state) => state.profileSlice.user);
  console.log(selector);
  const navigate = useNavigate();
  const { Title } = Typography;
  const [isAdmin, setIsAdmin] = useState(false);
  const roleList = ["Tài khoản quản trị", "Tài khoản người dùng"];
  useEffect(() => {
    if (!selector) {
      swal("Thất bại!", `Vui lòng đăng nhập !`, "error");
      navigate("/login");
    } else {
      if (selector?.roleID == ADMIN_CODE) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, []);
  if (!selector) {
    return <div>error</div>;
  }
  const handleLogOut = ()=>{
    navigate("/logOut")
  }
  return (
    <div className="profile container my-5" style={{ height: "" }}>
      <Row style={{ marginTop: "50px", gap: "10px", justifyContent: "center" }}>
        <Col span={24} sm={8} style={{ overflow: "hidden" }}>
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
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            <Avatar
              shape={isAdmin ? "circle" : "square"}
              size={64}
              icon={!isAdmin ? <UserOutlined /> : <ToolOutlined />}
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#2196f36e",
              }}
            />
            <Title level={3}>
              <UserOutlined className="mx-2" />
              {selector?.userName}
            </Title>
            <Title level={3}>
              <GiftOutlined className="mx-2" />
              {selector?.dob}
            </Title>
            <Title level={3}>
              <PhoneOutlined className="mx-2" />
              {selector?.phone}
            </Title>
            <Title level={3} type={isAdmin ? "danger" : "secondary"}>
              {roleList[selector?.roleID - 1]}
            </Title>
            <Button type="primary" onClick={handleLogOut}>Đăng xuất</Button>
          </Space>
        </Col>
        <Col
          span={24}
          sm={15}
          style={{ borderRadius: "8px", overflow: "hidden" }}
        >
          <Space
            direction="vertical"
            align="center"
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              height: "45vh",
              borderRadius: "8px",
              justifyContent: "center",
            }}
            className="space_form_profile"
          >
            <Title level={1}>Chi tiết</Title>
            <FormProfile data={selector}></FormProfile>
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
            <Title level={5} style={{ textAlign: "center", marginBottom: "0" }}>
              Lịch sử đơn
            </Title>
            <TableProfile></TableProfile>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
