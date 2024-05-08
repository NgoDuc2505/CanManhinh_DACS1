// import React from 'react'
import { Typography, Divider } from "antd";
import style from "./introduce.module.css";
import ArchiveItem from "../Other/ArchiveItem";
function Introduce() {
  const { introduce, introduce_layer, introduce_main_content, title_introduce, icons_intro } = style;
  const { Title, Paragraph } = Typography;
  return (
    <div className={introduce}>
        <div className={introduce_layer}></div>
      <div className={`container ${introduce_main_content}`}>
        <div className={title_introduce}>
          <Title level={5} className="main_title" style={{color:'#f2e7d1'}}>Giới Thiệu Về Pro Display</Title>
          <Paragraph style={{textAlign:'center', margin:'40px 0', fontSize: '22px', fontWeight: 600, color: '#f2e7d1'}}>
            Được thành lập từ năm 2020 với mong muốn cung cấp dịch vụ cân chỉnh
            màu màn hình cho khách hàng với chất lượng dịch vụ và chi phí hợp lí
            nhất.
          </Paragraph>
          <Divider style={{height: '3px', backgroundColor: 'aqua', width: '100px'}}></Divider>
        </div>
        <div className={`row ${icons_intro}`}>
            <div className="col-6 col-md-3 col-sm-6  d-flex justify-content-center">
                <ArchiveItem imgSrc={'/img/location.png'} detail={`${['Khu vực', 'TP. Hồ Chí Minh']}`}></ArchiveItem>
            </div>
            <div className="col-6 col-md-3 col-sm-6 d-flex justify-content-center">
                <ArchiveItem imgSrc={'/img/speed.png'} detail={`${['Nhanh chóng', 'Tiện lợi']}`}></ArchiveItem>
            </div>
            <div className="col-6 col-md-3 col-sm-6 d-flex justify-content-center">
                <ArchiveItem imgSrc={'/img/trend.png'} detail={`${['Dịch vụ', 'Chất lượng cao']}`}></ArchiveItem>
            </div>
            <div className="col-6 col-md-3 col-sm-6 d-flex justify-content-center">
                <ArchiveItem imgSrc={'/img/reward.png'} detail={`${['Bảo hành', 'Trọn đời màn hình']}`}></ArchiveItem>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Introduce;
