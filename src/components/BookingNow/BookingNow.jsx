// import React from 'react'
import { Typography, Divider, Flex, Button } from "antd";
import style from "./bookingNow.module.css";

function BookingNow() {
  const { booking_now, btn_group, btn_handle, booking_layer } = style;
  const { Title } = Typography;
  return (
    <div className={booking_now}>
        <div className={booking_layer}></div>
      <div className="container">
        <Title level={5} className="main_title" style={{color:'white'}}>
          Đặt lịch cân tại đây
        </Title>
        <Divider
          style={{ height: "3px", backgroundColor: "aqua", width: "100px" }}
        ></Divider>
        <Flex className={btn_group} justify="space-evenly">
          <Button className={btn_handle}>Đặt lịch cân</Button>
          <Button className={btn_handle}>Đóng góp ý kiến</Button>
        </Flex>
      </div>
    </div>
  );
}

export default BookingNow;
