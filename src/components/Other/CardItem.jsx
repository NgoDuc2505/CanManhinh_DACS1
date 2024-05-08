import { Card } from "antd";
// import React from "react";

function CardItem({imgSrc}) {
  return (
    <Card
      hoverable
      style={{
        width: "90%",
        objectFit: "cover",
      }}
      cover={
        <img
          alt="example"
          src={imgSrc}
          style={{ width: "100%", height: "300px" }}
        />
      }
    >
      <div className="content">
        <div className="pararagph">
          <h5>Sai lệch màu sắc của các thiết bị</h5>
          Hiện nay trên thị trường có rất nhiều loại màn hình với nhiều công
          nghệ và từ nhiều thương hiệu khác nhau. Bởi vậy mà màu sắc.
        </div>
      </div>
    </Card>
  );
}

export default CardItem;
