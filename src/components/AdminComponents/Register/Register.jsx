// import React from 'react';
import style from "../Login/login.module.css";
import "./register.css";
import { Button, DatePicker, Flex, Form, Input, Typography } from "antd";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getValue } from "../../../services/local_storage";
import { TOKEN_LOGIN, ALERT, API_RES_MSG } from "../../../constants/constant";
import {
  mapperRegex,
  regexObject,
  validateMessages,
} from "../../Profile/formTableHandler";
import swal from "sweetalert";
import {
  formatAddress,
  formatDatePicker,
  createAccount,
} from "./registerHandler";

function Register() {
  const { main_form_register, register_form, form_register_antd } = style;
  const { Title } = Typography;
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const dateData = formatDatePicker(values.dob);
      const adressData = formatAddress(values);
      const accountData = {
        userName: values.userName,
        phone: values.phone,
        password: values.password,
        dob: dateData.dateResult,
        address: adressData,
      };
      const data = await createAccount(accountData);
      console.log("data rs: ",data);
      swal(ALERT.success, "Đăng ký thành công !", "success");
      navigate("/login");
    } catch (e) {
      console.log(e?.response.data.msg);
      const msgError = e?.response.data.msg;
      if(msgError === API_RES_MSG.failed.usrNameExited){
        swal(ALERT.failed, "Tên đăng nhập đã tồn tại !", "error");
      }else if(msgError === API_RES_MSG.failed.tooLongUsrName){
        swal(ALERT.failed, "Tên đăng nhập giới hạn 10 ký tự !", "error");
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    swal(ALERT.failed, "Hãy điền đầy đủ thông tin !", "error");
  };
  const goToLogin = () => {
    navigate("/login");
  };
  useEffect(() => {
    const data = getValue(TOKEN_LOGIN);
    if (data) {
      navigate("/");
    }
  }, []);
  return (
    <div className={register_form}>
      <div className={main_form_register}>
        <div className="register container animate__animated animate__backInLeft">
          <Title level={1} className="main_title">
            Đăng ký
          </Title>
          <Form
            validateMessages={validateMessages}
            name="basic"
            className={form_register_antd}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              validateTrigger="onBlur"
              label="Tên đăng nhập"
              name="userName"
              rules={[
                {
                  max: 10,
                  required: true,
                },
              ]}
              messageVariables={{
                VnName: "Tên đăng nhập",
              }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              validateTrigger="onBlur"
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  max: 15,
                  min: 8,
                  pattern: regexObject.regexPass,
                },
              ]}
              messageVariables={{
                VnName: "Mật khẩu",
                regexMsg: mapperRegex.password,
              }}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              validateTrigger="onBlur"
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  pattern: regexObject.phone,
                },
              ]}
              messageVariables={{
                VnName: "Số điện thoại",
                regexMsg: mapperRegex.phone,
              }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              validateTrigger="onBlur"
              label="Số nhà"
              name="locateNumber"
              rules={[
                {
                  required: true,
                },
              ]}
              messageVariables={{
                VnName: "Số nhà",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              validateTrigger="onBlur"
              label="Đường"
              name="street"
              rules={[
                {
                  required: true,
                },
              ]}
              messageVariables={{
                VnName: "Đường",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              validateTrigger="onBlur"
              label="Phường/ Xã"
              name="subDistrict"
              rules={[
                {
                  required: true,
                },
              ]}
              messageVariables={{
                VnName: "Phường/ Xã",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              validateTrigger="onBlur"
              label="Quận/Huyện"
              name="district"
              rules={[
                {
                  required: true,
                },
              ]}
              messageVariables={{
                VnName: "Quận/Huyện",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              validateTrigger="onBlur"
              label="Thành phố"
              name="city"
              rules={[
                {
                  required: true,
                },
              ]}
              messageVariables={{
                VnName: "Thành phố",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              validateTrigger="onBlur"
              label="Ngày sinh"
              name="dob"
              rules={[{ required: true }]}
              messageVariables={{
                VnName: "Ngày sinh",
              }}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="link" htmlType="submit" onClick={goToLogin}>
                Đăng nhập ngay...
              </Button>
            </Form.Item>
            <Flex justify="end" className="gap-3">
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="reset" danger>
                  Hủy
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
