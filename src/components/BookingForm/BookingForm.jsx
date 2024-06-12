import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Select,
  Typography,
} from "antd";
import style from "./bookingForm.module.css";
import "animate.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  mapperRegex,
  regexObject,
  validateMessages,
} from "../Profile/formTableHandler";
import {
  addressFormater,
  formatVoucherIdAndVal,
  getVoucher,
  initVal,
  sendBookService,
  voucherVal,
} from "./bookingForm";
import {
  formatDatePicker,
  formatAddress,
} from "../AdminComponents/Register/registerHandler";
import { ALERT, API_RES_MSG } from "../../constants/constant";

const BookingForm = () => {
  const [form] = Form.useForm();
  const [voucherList, setVoucherList] = useState(voucherVal);
  const [voucherCurrentVal, setVoucherCurrentVal] = useState(null);
  const selector = useSelector((state) => state.profileSlice.user);
  useEffect(() => {
    if (!selector) {
      swal("Thất bại!", `Vui lòng đăng nhập !`, "error");
      navigate("/login");
    } else {
      const IIFE = async () => {
        const voucherAPIData = await getVoucher(selector.userName);
        setVoucherList(voucherAPIData);
      };
      IIFE();
    }
  }, []);
  const navigate = useNavigate();
  const [initialValue, setInitialValue] = useState(initVal);
  useEffect(() => {
    form.setFieldsValue(initialValue);
  }, [form, initialValue]);
  const handleClickAutoInsert = () => {
    const data = addressFormater(selector);
    const insrtData = {
      phone: selector.phone,
      locateNumber: data.locateNumber,
      street: data.street,
      subDistrict: data.subDistrict,
      district: data.district,
      city: data.city,
    };
    setInitialValue(insrtData);
  };
  const {
    formBooking,
    form_wrapper,
    form_content,
    formBooking_layer,
    main_form,
  } = style;
  const { Title } = Typography;
  const onFinish = (values) => {
    // console.log("Success:", values);
    const getDateBook = formatDatePicker(values.time);
    const getAdress = formatAddress(values);
    const getVoucherId = formatVoucherIdAndVal(values.codeVoucher);
    const dataPost = {
      usrName: selector.userName,
      fullName: values.fullName,
      address: getAdress,
      phone: values.phone,
      timeBook: getDateBook.dateResult,
      note: values.note,
      voucherID: getVoucherId.voucherId,
      total: "130000",
    };
    swal({
      title: "Hóa đơn tổng cộng 130.000vnd",
      text: "Đây là tổng tiền thanh toán, khi bấm nút đồng ý bạn sẽ được chuyển qua hóa đơn chi tiết và cổng thanh toán.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const iife = async () => {
          const rs = await sendBookService(dataPost);
          if (rs.status) {
            swal(
              ALERT.success,
              "Đã đăng ký dịch vụ, Cảm ơn quý khách đã tin tưởng dử dụng dịch vụ!",
              "success"
            );
            const voucherAPIData = await getVoucher(selector.userName);
            setVoucherList(voucherAPIData);
            console.log(rs);
            form.resetFields();
            setInitialValue(initVal);
          } else {
            console.log(rs.result.response.data.msg);
            if(API_RES_MSG.failed.dateBookInvalid === rs.result.response.data.msg){
              swal(ALERT.failed, "Vui lòng kiểm tra lại ngày...", "error");
            }
          }
        };
        iife();
      } else {
        swal("Bạn đã hủy thanh toán");
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleChange = (value) => {
    const getVoucherVal = formatVoucherIdAndVal(value);
    setVoucherCurrentVal(getVoucherVal.voucherVal);
  };
  console.log("voucherCurrentVal", voucherCurrentVal);
  return (
    <div className={formBooking}>
      <div className={formBooking_layer}></div>
      <div className="container d-flex justify-content-center">
        <div
          className={`${form_content} animate__animated animate__pulse animate__delay-1s`}
        >
          <Title level={1} className="main_title">
            Đăng ký dịch vụ
          </Title>
          <div className={form_wrapper}>
            <Form
              form={form}
              initialValues={initialValue}
              validateMessages={validateMessages}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              className={main_form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                validateTrigger="onBlur"
                label="Họ và tên"
                name="fullName"
                rules={[
                  {
                    required: true,
                    pattern: regexObject.vietnameseNameRegex,
                  },
                ]}
                messageVariables={{
                  VnName: "Họ và tên",
                  regexMsg: mapperRegex.fullName,
                }}
              >
                <Input />
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
                label="Thời gian yêu cầu"
                name="time"
                rules={[
                  {
                    required: true,
                  },
                ]}
                messageVariables={{
                  VnName: "Thời gian",
                }}
              >
                <DatePicker placeholder="Chọn ngày..." />
              </Form.Item>

              <Form.Item
                label="Ghi chú cho nhân viên"
                name="note"
                rules={[
                  {
                    required: false,
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
              <Flex justify="end" gap={"10px"}>
                <Form.Item
                  wrapperCol={{
                    span: 16,
                  }}
                >
                  <Button
                    className="btn btn-warning"
                    onClick={handleClickAutoInsert}
                  >
                    Tự động điền
                  </Button>
                </Form.Item>
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
