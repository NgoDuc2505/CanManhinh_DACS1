import { Typography, Divider } from "antd";
// import React from 'react'
import style from "./needer.module.css";
export default function Needer() {
  const { Title, Paragraph } = Typography;
  const { needer, needer_content } = style;
  return (
    <div className={needer}>
      <div className="container">
        <Title level={5} className="main_title">
          Ai sẽ có nhu cầu cân màn hình ?
        </Title>
        <div className={`row ${needer_content}`}>
          <div className="col-6">
            <Title level={5}>
              Màn hình, Laptop mua mới có cần phải cân màu màn hình không?
            </Title>
            <Paragraph type="secondary" strong={true}>
              Các loại màn hình đời mới khi được xuất xưởng, một số dòng sẽ được
              nhà sản xuất cân chỉnh màu sắc. Tuy nhiên không có màn hình nào là
              chuẩn xác màu 100%, ngay cả màn hình Mac cũng bị sai lệch với tỉ
              lệ nhất định.
            </Paragraph>
            <Title level={5}>
              Vì sao ảnh khi in ra không giống ảnh đang hiển thị trên màn hình?
            </Title>
            <Paragraph type="secondary" strong={true}>
              Về bản chất, máy in và máy ảnh có chơ chế hoàn toàn ngược nhau khi
              nói về ảnh đen trắng. Nếu như máy ảnh có xu hướng tô trắng lên nền
              đen thì ngược lại, máy in có xu hướng tô đen lên giấy trắng.
            </Paragraph>
          </div>
          <div className="col-6">
            <Title level={5}>
              Vì sao việc cân màu màn hình nên được thực hiện thường xuyên?
            </Title>
            <Paragraph type="secondary" strong={true}>
              Sau một thời gian dài sử dụng, các bóng đèn màn hình xuống cấp sẽ
              dẫn đến hiện tượng sai màu. Vì vậy việc cân chỉnh màn hình là một
              việc nên làm thường xuyên.Nhiều người không để ý đến việc đèn nền
              màn hình khi sáng tỏa ra một lượng nhiệt rất lớn ảnh hưởng đến
              tuổi thọ của tấm nền. Do đó bạn nên cân màu để bảo trì và sửa sai
              các màu sắc thể hiện không đúng và đạt được độ chính xác cao nhất
              có thể trong quá trình làm việc
            </Paragraph>
          </div>
        </div>
      <Divider style={{marginTop: '80px'}}></Divider>
      </div>
    </div>
  );
}
