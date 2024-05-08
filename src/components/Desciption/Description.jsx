import { Typography } from "antd";
import CardItem from "../Other/CardItem";
import style from "./description.module.css"

function Description() {
  const { Title } = Typography;
  return (
    <div className={`${style["description"]} py-5`}>
      <div className={`${style["layer_bg"]}`}></div>
      <div className="container">
        <Title level={5} className="main_title">
          Tại Sao Cần Phải Cân Màu Màn Hình ?
        </Title>
        <div className="row">
          <div className="col-12 col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center mt-3">
            <CardItem imgSrc="/img/p1.jpg"></CardItem>
          </div>
          <div className="col-12 col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center mt-3">
            <CardItem imgSrc="/img/p2.jpg"></CardItem>
          </div>
          <div className="col-12 col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center mt-3">
            <CardItem imgSrc="/img/p3.jpg"></CardItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
