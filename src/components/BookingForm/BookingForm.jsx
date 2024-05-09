// import React, { useState } from "react";

import {
  Button,
  Checkbox,
  DatePicker,
  Flex,
  Form,
  Input,
  Typography,
} from "antd";
import style from "./bookingForm.module.css";
import 'animate.css';

const BookingForm = () => {
  const {
    formBooking,
    form_wrapper,
    form_content,
    formBooking_layer,
    main_form,
  } = style;
  const { Title } = Typography;
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={formBooking}>
      <div className={formBooking_layer}></div>
      <div className="container d-flex justify-content-center">
        <div className={`${form_content} animate__animated animate__pulse animate__delay-1s`}>
          <Title level={1} className="main_title">
            Đăng ký dịch vụ
          </Title>
          <div className={form_wrapper}>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              className={main_form}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Họ và tên"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên của bạn !",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập số điện thoại của bạn !",
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
                    message: "Hãy nhập địa chỉ của bạn !",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Thời gian yêu cầu"
                name="time"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập thời gian mong muốn !",
                  },
                ]}
              >
                <DatePicker placeholder="Chọn ngày..." />
              </Form.Item>

              <Form.Item
                label="Ghi chú cho nhân viên"
                name="note"
                rules={[
                  {
                    required: false,
                    message: "",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                label="Mã giảm giá"
                name="codeVoucher"
                rules={[
                  {
                    required: false,
                    message: "",
                  },
                ]}
              >
                <Input placeholder="Nhập mã giảm giá [nếu có]"/>
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

              <Flex justify="end" gap={"10px"}>
                <Form.Item
                  wrapperCol={{
                    span: 16,
                  }}
                >
                  <Button className="btn btn-info" htmlType="submit">
                    Đăng ký
                  </Button>
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    span: 16,
                  }}
                >
                  <Button className="btn btn-danger" htmlType="reset">
                    Hủy
                  </Button>
                </Form.Item>
              </Flex>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingForm;
