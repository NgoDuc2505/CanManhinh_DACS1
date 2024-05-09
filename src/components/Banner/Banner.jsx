// import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./banner.module.css";
import { Typography, Flex, Image, Button } from "antd";

function Banner() {
  const { Title } = Typography;
  const navigate = useNavigate();
  const handleBooking = ()=>{
    navigate("/booking-now");
  }
  return (
    <div className={style["banner"]}>
      <div className={style["layer"]}></div>
      <div className={`${style["main_banner_content"]} container`}>
        <div className={`${style["title_wrapper"]}`}>
          <Title level={1} style={{ fontWeight: 900 }}>
            Cân màu màn hình
          </Title>
          <Title level={5}>Nâng tầm trải nghiệm màn hình của bạn</Title>
        </div>
        <div className="row">
          <div className={`${style["left_content_banner"]} col-12 col-md-6 col-sm-12`}>
            <div className={style["img_wrapper"]}>
              <Image src="/img/demo.png"></Image>
            </div>
          </div>
          <div className={`${style["right_content_banner"]} col-12 col-md-6 col-sm-12`}>
            <div className={style["content_wrapper_layer"]}>
              <Title level={5}>Thiết bị cân màn hình</Title>
              <Flex align="center">
                <div className={style["img_wrapper_xWrite"]}>
                  <img
                    className={style["img_xWriteDisplay"]}
                    src="/img/xWrite.png"
                    alt="...."
                  />
                </div>
                <Title level={4} className="mx-2">I1 DISPLAY PRO</Title>
              </Flex>
              <Title level={5}>Thời gian cân màu: 10-15 phút</Title>
              <Title level={5}>Window/ MacOS</Title>
              <Title level={5}>Giao tiếp: USB/ Type C</Title>
            </div>
          </div>
        </div>
        <div className={style["btn_center"]}>
        <Button type="primary" className={style["booking_service_btn"]} onClick={()=>{handleBooking()}}>Đặt lịch cân</Button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
