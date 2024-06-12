// TableOfVoucher

import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Tag,
} from "antd";
import Highlighter from "react-highlight-words";
import {
  addVoucher,
  getListVoucher,
  listVoucherConvertToForm,
} from "./tableOfVoucherHandler";
import { formatDatePicker } from "../Register/registerHandler";
import swal from "sweetalert";
import { ALERT } from "../../../constants/constant";

const data = [
  {
    voucherID: "1",
    voucherName: "John Brown",
    valuesVoucher: 32,
    expiredDate: "New York No. 1 Lake Park",
    isExpired: "No",
  },
  {
    voucherID: "2",
    voucherName: "Joe Black",
    valuesVoucher: 42,
    expiredDate: "London No. 1 Lake Park",
    isExpired: "No",
  },
  {
    voucherID: "3",
    voucherName: "Jim Green",
    valuesVoucher: 32,
    expiredDate: "Sydney No. 1 Lake Park",
    isExpired: "No",
  },
  {
    voucherID: "4",
    voucherName: "Jim Red",
    valuesVoucher: 32,
    expiredDate: "London No. 2 Lake Park",
    isExpired: "No",
  },
];
const TableOfVoucher = () => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [listVoucherData, setListVoucher] = useState(data);
  const [isRender, setIsRender] = useState(false);
  const searchInput = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinish = async (values) => {
    const dateFormat = formatDatePicker(values.expiredDate).dateResult;
    const dataInput = {
      ...values,
      expiredDate: dateFormat,
    };
    console.log("dataInput: ", dataInput);
    const dataValue = await addVoucher(dataInput);
    if (dataValue) {
      console.log("api data: ", dataValue);
      setIsRender(!isRender);
      form.resetFields();
      swal(ALERT.success, "Tạo mới thành công !", "success");
    } else {
      swal(ALERT.failed, "Vui lòng kiểm tra lại thông tin !", "error");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Id",
      dataIndex: "voucherID",
      key: "voucherID",
      width: "5%",
      ...getColumnSearchProps("voucherID"),
    },
    {
      title: "Tên",
      dataIndex: "voucherName",
      key: "voucherName",
      width: "20%",
      ...getColumnSearchProps("voucherName"),
    },
    {
      title: "Giá trị",
      dataIndex: "valuesVoucher",
      key: "valuesVoucher",
      width: "20%",
      ...getColumnSearchProps("valuesVoucher"),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiredDate",
      key: "expiredDate",
      width: "20%",
      ...getColumnSearchProps("expiredDate"),
    },
    {
      title: "Trạng thái",
      dataIndex: "isExpired",
      key: "isExpired",
      width: "20%",
      ...getColumnSearchProps("isExpired"),
      render: (_, render) => {
        const color = render.isExpired ? "geekblue" : "green";
        const title = render.isExpired ? "Hết hạn" : "Còn hạn";
        return (
          <Tag color={color} key={render.voucherID}>
            {title}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (_, render) => {
        return (
          <button key={render.voucherID} className="btn btn-info">
            Xóa
          </button>
        );
      },
    },
  ];
  useEffect(() => {
    const iife = async () => {
      const dataList = await getListVoucher();
      if (dataList) {
        console.log("dataList: ", dataList.content);
        setListVoucher(listVoucherConvertToForm(dataList.content));
      }
    };
    iife();
  }, [isRender]);
  console.log("listVoucherData: ", listVoucherData);
  return (
    <div>
      <Button className="btn btn-success mb-3" onClick={showModal}>
        Thêm
      </Button>
      <Modal
        title="Thêm mới voucher"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            validateTrigger="onBlur"
            name="voucherId"
            rules={[
              {
                required: true,
                message: "Không được để trống !",
              },
            ]}
          >
            <Input placeholder="Mã voucher:" />
          </Form.Item>
          <Form.Item
            validateTrigger="onBlur"
            name="voucherName"
            rules={[
              {
                required: true,
                message: "Không được để trống !",
              },
            ]}
          >
            <Input placeholder="Tên voucher:" />
          </Form.Item>
          <Form.Item
            validateTrigger="onBlur"
            name="valuesVoucher"
            rules={[
              {
                required: true,
                message: "Không được để trống !",
              },
            ]}
          >
            <Input placeholder="Giá trị:" />
          </Form.Item>
          <Form.Item
            validateTrigger="onBlur"
            name="expiredDate"
            rules={[
              {
                required: true,
                message: "Không được để trống !",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Chọn ngày hết hạn:"
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={listVoucherData} />
    </div>
  );
};
export default TableOfVoucher;
