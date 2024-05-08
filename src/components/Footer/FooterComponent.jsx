// import React from 'react'
import { Space, Typography, Input } from "antd";
import style from "./footer.module.css";
import { HomeOutlined, PhoneOutlined } from "@ant-design/icons";

function FooterComponent() {
  const { Title } = Typography;
  const { footer, icon_display, footer_content } = style;
  const { Search } = Input;

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div className={footer}>
      <div className="container">
        <Space
        className={footer_content}
          direction="vertical"
          size="small"
        >
          <Title>PRO DISPLAY</Title>
          <Title level={5}>Đăng nhập để có thể nhận các thông tin và ưu đãi mới nhất</Title>
          <Search
            placeholder="Nhập email của bạn..."
            allowClear
            enterButton="Gửi"
            size="large"
            onSearch={onSearch}
          />
          <Title level={4}><HomeOutlined className={icon_display}/>Địa chỉ văn phòng: 87/19/13 Đường 27 Phường 6 Quận Gò Vấp HCM.</Title>
          <Title level={4}><PhoneOutlined className={icon_display}/>Số điện thoại: +84 96 279 01 60.</Title>
        </Space>
      </div>
    </div>
  );
}

export default FooterComponent;
