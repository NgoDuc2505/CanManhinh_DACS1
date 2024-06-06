import { Typography, Empty, Spin } from "antd";

function PageNoteExits() {
  const { Title } = Typography;
  const envVal = import.meta.env.VITE_BASE_URL_TEST;
  console.log(envVal);
  return (
    <div style={{width:"100vw",height:"100vh", display:"flex",justifyContent:"center", alignItems:"center"}}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<Title level={3} type="danger">Page Not Exit <Spin size="large" /> </Title>}/>
    </div>
  );
}

export default PageNoteExits;
