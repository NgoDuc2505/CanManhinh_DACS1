import style from "./login.module.css";
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import "animate.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login_form, main_form_login, form_login_antd, btn_login_group, login } =
    style;
  const { Title } = Typography;
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const goToRegister = () => {
    navigate("/register");
  };
  return (
    <div className={login_form}>
      <div className={main_form_login}>
        <div className={`${login} container animate__animated animate__backInLeft`}>
          <Title level={1} className="mb-5 main_title">
            Đăng nhập
          </Title>
          <Form
            className={form_login_antd}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrLoginerCol={{
              span: 16,
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
              <Input style={{ width: "60%" }} />
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
              <Input.Password style={{ width: "60%" }} />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Ghi nhớ tôi</Checkbox>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="link" htmlType="reset" onClick={goToRegister}>
                Hãy đăng ký ngay...
              </Button>
            </Form.Item>
            <Flex
              justify="end"
              className={`gap-3 animate__animated animate__backInRight ${btn_login_group}`}
            >
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
};
export default Login;
