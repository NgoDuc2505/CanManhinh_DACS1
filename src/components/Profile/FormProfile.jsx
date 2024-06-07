import {
  EnvironmentOutlined,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row, Switch, Form } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import {
  mapperRegex,
  regexObject,
  validateMessages,
} from "./formTableHandler.js";
import { useSelector } from "react-redux";

function FormProfile() {
  const selector = useSelector((state) => state.profileSlice.user);
  if (!selector) {
    return <div>error</div>;
  }
  const dateFormat = "YYYY/MM/DD";
  const dobInit = new Date(selector?.dob);
  const dateFormater = {
    year: dobInit.getFullYear(),
    month:
      dobInit.getMonth() + 1 < 10
        ? `0${dobInit.getMonth() + 1}`
        : dobInit.getMonth() + 1,
    date: dobInit.getDate(),
  };
  const initProfileData = {
    address: selector?.address,
    dayCreated: "",
    dob: dayjs(
      `${dateFormater?.year}/${dateFormater?.month}/${dateFormater?.date}`,
      dateFormat
    ),
    password: "P**p**8**",
    phone: selector?.phone,
    roleID: selector?.roleID,
    userName: selector?.userName,
  };

  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const switchChange = (e) => {
    setDisabled(!e);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Form
      initialValues={initProfileData}
      form={form}
      validateMessages={validateMessages}
      name="trigger"
      autoComplete="off"
      style={{ width: "100%" }}
    >
      {(values, formInstance) => {
        return (
          <Row style={{ gap: "10px", justifyContent: "center" }}>
            <Col span={24} sm={10}>
              <Form.Item name="userName" className="mb-2">
                <Input
                  size="large"
                  placeholder="User Name"
                  prefix={<UserOutlined />}
                  disabled={true}
                />
              </Form.Item>
              <Form.Item
                help={
                  <p className={disabled ? "d-none" : ""}>
                    {formInstance.getFieldError("password")}
                  </p>
                }
                hasFeedback
                name="password"
                messageVariables={{
                  regexMsg: mapperRegex.password,
                  VnName: "Mật khẩu",
                }}
                validateTrigger="onBlur"
                rules={[
                  {
                    max: 15,
                    min: 8,
                    required: true,
                    pattern: regexObject.regexPass,
                  },
                ]}
                className="my-2"
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  size="large"
                  placeholder="input password"
                  disabled={disabled}
                />
              </Form.Item>
              <Form.Item
                help={
                  <p className={disabled ? "d-none" : ""}>
                    {formInstance.getFieldError("dob")}
                  </p>
                }
                hasFeedback
                name="dob"
                messageVariables={{
                  regexMsg: mapperRegex.birthday,
                  VnName: "Ngày sinh",
                }}
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                  },
                ]}
                className="my-2"
              >
                <DatePicker
                  disabled={disabled}
                  onChange={onChange}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>
            <Col span={24} sm={10}>
              <Form.Item
                help={
                  <p className={disabled ? "d-none" : ""}>
                    {formInstance.getFieldError("phone")}
                  </p>
                }
                hasFeedback
                name="phone"
                messageVariables={{
                  regexMsg: mapperRegex.phone,
                  VnName: "Số điện thoại",
                }}
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    pattern: regexObject.phone,
                  },
                ]}
                className="mb-2"
              >
                <Input
                  size="large"
                  placeholder="Phone"
                  prefix={<PhoneOutlined />}
                  disabled={disabled}
                />
              </Form.Item>
              <Form.Item
                help={
                  <p className={disabled ? "d-none" : ""}>
                    {formInstance.getFieldError("address")}
                  </p>
                }
                hasFeedback
                name="address"
                messageVariables={{
                  VnName: "Địa chỉ",
                }}
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                  },
                ]}
                className="my-2"
              >
                <Input
                  size="large"
                  placeholder="Address"
                  prefix={<EnvironmentOutlined />}
                  disabled={disabled}
                />
              </Form.Item>
              <div className="row my-2">
                <div className="col-6">
                  <Button disabled={disabled} type="primary">
                    Cập nhật
                  </Button>
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                  <Switch
                    checkedChildren="Chỉnh sửa"
                    unCheckedChildren="Khóa"
                    defaultChecked={false}
                    onChange={switchChange}
                  />
                </div>
              </div>
            </Col>
          </Row>
        );
      }}
    </Form>
  );
}

export default FormProfile;
