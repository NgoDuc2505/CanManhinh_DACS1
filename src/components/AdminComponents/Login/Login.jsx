import style from "./login.module.css";
import { Button, Flex, Form, Input, Typography } from "antd";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { regexObject } from "../../Profile/formTableHandler";
import { onFinish, onFinishFailed } from "./Login.handler";

const Login = () => {
  const [form] = Form.useForm();
  const {
    login_form,
    main_form_login,
    form_login_antd,
    btn_login_group,
    login,
  } = style;
  const { Title } = Typography;
  const navigate = useNavigate();


  const goToRegister = () => {
    navigate("/register");
  };
  return (
    <div className={login_form}>
      <div className={main_form_login}>
        <div
          className={`${login} container animate__animated animate__backInLeft`}
        >
          <Title level={1} className="mb-5 main_title">
            Đăng nhập
          </Title>
          <Form
            validateMessages={{
              required: "${VnName} không đúng !",
              pattern: {
                mismatch: "${regexMsg}",
              },
            }}
            form={form}
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
            {(values, formInstance) => {
              return (
                <div>
                  <Form.Item
                    help={<p>{formInstance.getFieldError("Username")}</p>}
                    hasFeedback
                    label="Tên đăng nhập"
                    name="Username"
                    validateTrigger="onBlur"
                    messageVariables={{
                      VnName: "Tên đăng nhập",
                    }}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input style={{ width: "60%" }} />
                  </Form.Item>
                  <Form.Item
                    hasFeedback
                    label="Mật khẩu"
                    name="password"
                    validateTrigger="onBlur"
                    messageVariables={{
                      regexMsg: "Mật khẩu không đúng định dạng !",
                      VnName: "Mật khẩu",
                    }}
                    rules={[
                      {
                        required: true,
                        pattern: regexObject.regexPass,
                      },
                    ]}
                  >
                    <Input.Password style={{ width: "60%" }} />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button
                      type="link"
                      htmlType="submit"
                      onClick={goToRegister}
                    >
                      Đăng ký ngay...
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
                </div>
              );
            }}
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
