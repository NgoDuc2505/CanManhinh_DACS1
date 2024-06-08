import { Form, Modal } from "antd";
import { useState } from "react";

function ProfileModelPassword() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title="Hãy nhập mật khẩu:"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {/* <Form>
        <Form.Item
          help={
            <p className={disabled ? "d-none" : ""}>
              {formInstance.getFieldError("passwordModel")}
            </p>
          }
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
              onVisibleChange: handleClickPassword,
            }}
          />
        </Form.Item>
      </Form> */}
    </Modal>
  );
}

export default ProfileModelPassword;
