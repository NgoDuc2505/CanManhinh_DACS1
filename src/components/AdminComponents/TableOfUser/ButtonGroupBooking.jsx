import {
  EnvironmentOutlined,
  MobileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Form, Input, Modal, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { getListVoucher } from "../TableOfVoucher/tableOfVoucherHandler";
import {
  giveVoucherToAccount,
  initDataSelect,
  updateRole,
  voucherDataFormater,
} from "./TableBookingHandler";
import { ADMIN_CODE, ALERT } from "../../../constants/constant";
import swal from "sweetalert";

function ButtonGroupBooking(props) {
  const { data } = props;
  const currentRoleData = data?.roleID == ADMIN_CODE ? true : false;
  const [voucherList, setVoucherList] = useState(initDataSelect);
  const [currentRole, setCurrentRole] = useState(currentRoleData);
  const [isRender, setIsRender] = useState(false);
  const [form] = Form.useForm();
  const handleEdit = () => {
    form.setFieldValue("usrName", data.userName);
    showModal();
  };
  const handleDel = () => {
    console.log(data.userName);
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

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    if(values.voucherId){
      const data = await giveVoucherToAccount(values);
      if (data) {
        console.log(data);
        swal(ALERT.success, "Thêm thành công !", "success");
        setIsRender(!isRender);
      } else {
        swal(ALERT.failed, "Voucher đã được thêm !", "error");
      }
    }
    if (currentRoleData != currentRole) {
      console.log("currentRole hs change");
      const setRole = currentRole ? "ADMIN" : "USER";
      const dataInputVal = { usrName: values.usrName, roleName: setRole };
      const dataRs = await updateRole(dataInputVal);
      console.log("Update role: ", dataRs);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleClickSwitch = (val) => {
    console.log(val);
    setCurrentRole(val);
  };
  useEffect(() => {
    const iife = async () => {
      const dataList = await getListVoucher();
      if (dataList) {
        const dataFomater = voucherDataFormater(dataList.content);
        setVoucherList(dataFomater);
      } else {
        setVoucherList(initDataSelect);
      }
    };
    iife();
  }, [isRender]);
  // console.log("userList", userList);
  return (
    <Flex className="gap-2">
      <Modal
        style={{ textAlign: "center" }}
        title="Cập nhật thông tin người dùng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="model_content d-flex flex-column gap-3">
          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              validateTrigger="onBlur"
              name="usrName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Tên đăng nhập"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              validateTrigger="onBlur"
              name="voucherId"
              rules={[
                {
                  required: false,
                  message: "Vui lòng không để trống!",
                },
              ]}
            >
              <Select
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
                options={voucherList}
              />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <Switch
                style={{ width: "15%" }}
                checkedChildren="Admin"
                unCheckedChildren="User"
                defaultChecked={currentRole}
                onClick={handleClickSwitch}
              />
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </div>
          </Form>
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
