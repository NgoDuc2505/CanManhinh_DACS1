import { Layout, Typography, theme } from "antd";
// import React from 'react'
import './definition.css'
function DefineContent() {
  const { Content } = Layout;
  const { Title } = Typography;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div className="container definition">
      <Content
      className={"definition_main_content"}
        style={{
          padding: "0 48px",
          margin: "30px 0",
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            borderRadius: borderRadiusLG,
            textAlign: "center",
            fontSize: "25px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
          
        >
          <Title level={2} className="main_title">
            Cân Màu Màn Hình Là Gì ?
          </Title>
          <p style={{ width: "50%", fontWeight: "400" }} className="def_para">
            Cân màu màn hình là việc đo đếm và tác động bằng phần mềm, giúp màn
            hình hiển thị màu sắc chính xác nhất theo một tiêu chuẩn nhất định
          </p>
        </div>
      </Content>
    </div>
  );
}

export default DefineContent;
