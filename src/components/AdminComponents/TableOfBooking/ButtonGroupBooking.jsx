import {
  EnvironmentOutlined,
  KeyOutlined,
  MobileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Flex, Input, Modal, Switch } from "antd";
import { useState } from "react";



function ButtonGroupBooking({ idUser }) {


  const handleEdit = () => {
    console.log(idUser);
    showModal();
  };
  const handleDel = () => {
    console.log(idUser);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };
  
  
  // console.log("userList", userList);
  return (
    <Flex className="gap-2">
      <Modal
        style={{ textAlign: "center" }}
        title="Cập nhật thông tin người dùng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="model_content d-flex flex-column gap-3">
          <Input
            size="large"
            placeholder="Username"
            prefix={<UserOutlined />}
          />
          <Input.Password placeholder="Password" prefix={<KeyOutlined />} />
          <Input
            size="large"
            placeholder="Address"
            prefix={<EnvironmentOutlined />}
          />
          <Input size="large" placeholder="Phone" prefix={<MobileOutlined />} />
          <DatePicker onChange={onChangeDate} />
          <Switch
            style={{ width: "15%" }}
            checkedChildren="User"
            unCheckedChildren="Admin"
            defaultChecked
          />
        </div>
      </Modal>
      <Button type="primary" onClick={handleEdit}>
        Sửa
      </Button>
      <Button type="primary" danger onClick={handleDel}>
        Xóa
      </Button>
    </Flex>
  );
}

export default ButtonGroupBooking;
