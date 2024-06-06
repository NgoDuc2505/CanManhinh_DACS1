// import React from 'react';
import style from "../Login/login.module.css";
import "./register.css"
import {
  Button,
  Checkbox,
  DatePicker,
  Flex,
  Form,
  Input,
  Typography,
} from "antd";
import "animate.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const { main_form_register, register_form, form_register_antd } = style;
  const { Title } = Typography;
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div className={register_form}>
      <div className={main_form_register}>
        <div className="register container animate__animated animate__backInLeft">
          <Title level={1} className="main_title">
            Đăng ký
          </Title>
          <Form
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
              label="Tên đăng nhập"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ngày sinh"
              name="DatePicker"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
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
