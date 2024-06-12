import {
  EnvironmentOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row, Switch, Form, Modal } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import {
  mapperRegex,
  regexObject,
  updateProfile,
  validateMessages,
} from "./formTableHandler.js";
import { useSelector } from "react-redux";
import { decodePass } from "../../services/check_pass.js";
import { getValue, setLocal } from "../../services/local_storage.js";
import {
  TOKEN_LOGIN,
  USER_PROFILE,
  SECURE_PASS,
} from "../../constants/constant.js";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function FormProfile() {
  const selector = useSelector((state) => state.profileSlice.user);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueUpdate, setValueUpdate] = useState(null);
  if (!selector) {
    return <div>error</div>;
  }
  const dateFormat = "YYYY/MM/DD";
  const dobInit = new Date(selector?.dob);
  let dateFormater = {};
  if(dobInit){
    const data = selector?.dob.split("T");
    const fullDate = data[0];
    const dateArray = fullDate.split("-");
    const dateFormaterFromArray = {
      year: dateArray[0],
      month: dateArray[1],
      date: dateArray[2]
    }
    dateFormater = {
      ...dateFormaterFromArray
    }
  }else{
    dateFormater = {
     year: dobInit.getFullYear(),
     month:
       dobInit.getMonth() + 1 < 10
         ? `0${dobInit.getMonth() + 1}`
         : dobInit.getMonth() + 1,
     date: dobInit.getDate(),
   };
  }
  const initProfileData = {
    address: selector?.address,
    dayCreated: "",
    dob: dayjs(
      `${dateFormater?.year}/${dateFormater?.month}/${dateFormater?.date}`,
      dateFormat
    ),
    password: SECURE_PASS,
    phone: selector?.phone,
    roleID: selector?.roleID,
    userName: selector?.userName,
  };
  // console.log("defaut render form profile: ", initProfileData);

  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const switchChange = (e) => {
    setDisabled(!e);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onFinish = (values) => {
    console.log("values", values);
    setValueUpdate(values);
    setIsModalOpen(true);
  };
  const onFinishFailed = (errors) => {
    console.log("errors", errors);
  };

  const onFinishModel = async (values) => {
    const passInputCurrent = values.passwordModel;
    const isValid = await decodePass(selector?.password, passInputCurrent);
    let needToLogOut = false;
    if (isValid) {
      console.log(valueUpdate.password);
      if (valueUpdate.password === SECURE_PASS) {
        valueUpdate.password = passInputCurrent;
      } else {
        needToLogOut = true;
      }
      const token = getValue(TOKEN_LOGIN);
      const dobGetter = valueUpdate.dob;
      const dateUpdate = {
        day: dobGetter.$D < 10 ? `0${dobGetter.$D}` : dobGetter.$D,
        month:
          dobGetter.$M + 1 < 10 ? `0${dobGetter.$M + 1}` : dobGetter.$M + 1,
        year: dobGetter.$y,
      };
      const valDateModifier = `${dateUpdate.year}-${dateUpdate.month}-${dateUpdate.day}T08:35:29.000Z`;
      const data = {
        ...valueUpdate,
        dob: valDateModifier,
      };
      const rs = await updateProfile(data, token);
      setIsModalOpen(false);
      setLocal(rs?.data.content.data, USER_PROFILE);
      setLocal(rs?.data.content.token, TOKEN_LOGIN);

      if (needToLogOut) {
        swal(
          "Thành công!",
          `Bạn đã cập nhật, hãy đăng nhập để bắt đầu !`,
          "success"
        );
        navigate("/logOut");
      } else {
        swal("Thành công!", `Bạn đã cập nhật !`, "success");
        navigate("/");
      }
    } else {
      swal("Thất bại!", `Sai mật khẩu !`, "error");
    }
  };
  const onFinishFailedModel = (errors) => {
    console.log("errors", errors);
    // setIsModalOpen(false);
  };

  return (
    <Form
      initialValues={initProfileData}
      form={form}
      validateMessages={validateMessages}
      name="trigger"
      autoComplete="off"
      style={{ width: "100%" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {(values, formInstance) => {
        return (
          <Row style={{ gap: "10px", justifyContent: "center" }}>
            <Modal
              title="Hãy nhập mật khẩu:"
              open={isModalOpen}
              okButtonProps={{ style: { display: "none" } }}
              cancelButtonProps={{ style: { display: "none" } }}
              onCancel={() => {
                setIsModalOpen(false);
              }}
            >
              <Form
                onFinish={onFinishModel}
                onFinishFailed={onFinishFailedModel}
                validateMessages={validateMessages}
              >
                <Form.Item
                  hasFeedback
                  name="passwordModel"
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
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    prefix={<LockOutlined />}
                    size="large"
                    placeholder="input password"
                    disabled={disabled}
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Gửi
                </Button>
              </Form>
            </Modal>
            <Col span={24} sm={10}>
              <Form.Item name="userName" className="mb-2">
                <Input
                  size="large"
                  placeholder="User Name"
                  prefix={<UserOutlined />}
                  disabled={true}
                  onInput={(e) => {
                    e.target.value = selector?.userName;
                  }}
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
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  prefix={<LockOutlined />}
                  size="large"
                  placeholder="input password"
                  disabled={disabled}
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
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
                  <Button disabled={disabled} type="primary" htmlType="submit">
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
