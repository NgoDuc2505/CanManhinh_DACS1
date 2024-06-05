import {
  EnvironmentOutlined,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row, Switch, Form } from "antd";
import { useState } from "react";
function FormProfile() {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const switchChange = (e) => {
    setDisabled(!e);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const validateMessages = {
    required: "${VnName} không được để trống !",
    string: {
      max: "Tối đa 12 ký tự !",
      min: "Tối đa 8 ký tự !",
    },
    pattern: {
      mismatch: "${regexMsg}",
    },
  };
  const mapperRegex = {
    password:
      "Mật khẩu: tối thiểu 8 kí tự, tối đa 15 ký tự, chưa ít nhất 1 ký tự thường, 1 in hoa, 1 số, 1 ký tự đặc biệt.",
    birthday: "Vui lòng chọn ngày sinh.",
    phone: "Phải là số điện thoại.",
  };
  const regexObject = {
    regexPass:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
    phone: /^[0-9]{9,12}$/,
  };

  return (
    <Form
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
              <Input
                size="large"
                placeholder="User Name"
                prefix={<UserOutlined />}
                disabled={true}
              />
              <Form.Item
                help={
                  <p className={disabled ? "d-none" : ""}>
                    {formInstance.getFieldError("Password")}
                  </p>
                }
                hasFeedback
                name="Password"
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
                    {formInstance.getFieldError("Dob")}
                  </p>
                }
                hasFeedback
                name="Dob"
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
                />
              </Form.Item>
            </Col>
            <Col span={24} sm={10}>
              <Form.Item
                help={
                  <p className={disabled ? "d-none" : ""}>
                    {formInstance.getFieldError("Phone")}
                  </p>
                }
                hasFeedback
                name="Phone"
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
                    {formInstance.getFieldError("Adress")}
                  </p>
                }
                hasFeedback
                name="Adress"
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
                    Update
                  </Button>
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                  <Switch
                    checkedChildren="update"
                    unCheckedChildren="disabled"
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
