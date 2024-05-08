import { Typography, Image, Flex } from "antd";
import style from "./qna.module.css";

function QandA() {
  const { Title, Paragraph } = Typography;
  const { qna, content_display_para, content_wrapper, img_qna_wrapper } = style;
  return (
    <div className={qna}>
      <div className="container">
        <Title level={5} className="main_title" style={{ textAlign: "center", marginBottom: '30px'}}>Giải đáp thắc mắc</Title>
        <div className={`row ${content_wrapper}`}>
          <div className="col-12 col-md-5 col-sm-12 h-100">
            <div className={img_qna_wrapper}>
              <Image
                src="public/img/team.jpg"
                style={{ height: "100%" }}
              ></Image>
            </div>
          </div>
          <div className="col-12 col-md-7 col-sm-12 h-100">
            <Flex vertical={true} gap={20} className="h-100">
              <div className={content_display_para}>
                <Paragraph style={{ fontSize: "22px", fontWeight: 600, textAlign: 'center' }}>
                  Photographer, Designer, Filmmaker, Printing Studio, Creative
                  Studio, người làm việc với nhiều màn hình cùng lúc và tất cả
                  ai đang có nhu cầu làm việc với màu sắc.
                </Paragraph>
              </div>
              <div className={img_qna_wrapper}>
                <Image src="public/img/work.jpg"></Image>
              </div>
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QandA;
