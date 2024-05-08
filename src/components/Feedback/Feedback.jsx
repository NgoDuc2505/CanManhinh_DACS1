// import React from 'react'
import { Image, Typography } from "antd";
import style from "./feedback.module.css";
function Feedback() {
  const { feedback, img_feedback_item } = style;
  const { Title } = Typography;
  return (
    <div className={feedback}>
      <div className="container">
        <Title
          level={5}
          className="main_title"
          style={{ marginBottom: "30px" }}
        >
          Feedbacks
        </Title>
        <div className="row">
          <div className={`col-12 col-xl-4 col-md-6 col-sm-12 ${img_feedback_item}`}>
            <Image src="public/img/fb1.jpg"></Image>
          </div>
          <div className={`col-12 col-xl-4 col-md-6 col-sm-12 ${img_feedback_item}`}>
            <Image src="public/img/bgImg.jpg"></Image>
          </div>
          <div className={`col-12 col-xl-4 col-md-6 col-sm-12 ${img_feedback_item}`}>
            <Image src="public/img/fb2.png"></Image>
          </div>
          <div className={`col-12 col-xl-4 col-md-6 col-sm-12 ${img_feedback_item}`}>
            <Image src="public/img/fb3.jpg"></Image>
          </div>
          <div className={`col-12 col-xl-4 col-md-6 col-sm-12 ${img_feedback_item}`}>
            <Image src="public/img/fb4.png"></Image>
          </div>
          <div className={`col-12 col-xl-4 col-md-6 col-sm-12 ${img_feedback_item}`}>
            <Image src="public/img/fb5.png"></Image>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
