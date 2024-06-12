import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { dataSourceFormater, getBookingList } from "./tableProfileHandler";
import { useSelector } from "react-redux";

const data = [
  {
    key: "1",
    fullName: "John Brown",
    timeBook: 32,
    total: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    fullName: "Joe Black",
    timeBook: 42,
    total: "London No. 1 Lake Park",
  },
  {
    key: "3",
    fullName: "Jim Green",
    timeBook: 32,
    total: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    fullName: "Jim Red",
    timeBook: 32,
    total: "London No. 2 Lake Park",
  },
  {
    key: "5",
    fullName: "Tom",
    timeBook: 32,
    total: "London No. 2 Lake Park",
  },
];
// const emptyData = [];
const TableProfile = () => {
  const selector = useSelector((state) => state.profileSlice.user);
  console.log(selector);
  const [searchText, setSearchText] = useState("");
  const [bookingList, setBookingList] = useState(data);
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleClickOnDelBooking = (idBooking) => {
    console.log(idBooking);
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
      title: "Tên",
      dataIndex: "fullName",
      key: "fullName",
      width: "20%",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Ngày đặt",
      dataIndex: "timeBook",
      key: "timeBook",
      width: "20%",
      ...getColumnSearchProps("timeBook"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "adress",
      key: "adress",
      width: "40%",
      ...getColumnSearchProps("adress"),
    },
    {
      title: "Đơn giá",
      dataIndex: "total",
      key: "total",
      width: "10%",
      ...getColumnSearchProps("total"),
      sorter: (a, b) => a.total.length - b.total.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Trạng thái",
      dataIndex: "isDone",
      key: "isDone",
      width: "5%",
      render: (_, record) => (
        <Tag color={record.isDone ? "green" : "geekblue"} key={record.key}>
          {record.isDone ? "Hoàn thành" : "Đang chờ"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
      render: (_, record) => (
        <Space
          size="middle"
          key={record.key}
          onClick={() => {
            handleClickOnDelBooking(record.key);
          }}
        >
          <button className="btn btn-danger">Xóa</button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const iife = async () => {
      const dataBookingOfUser = await getBookingList(selector?.userName);
      if (dataBookingOfUser) {
        setBookingList(dataSourceFormater(dataBookingOfUser?.content));
      } else {
        setBookingList([]);
      }
    };
    iife();
  }, []);
  console.log("bookingList", bookingList);
  return (
    <Table
      columns={columns}
      dataSource={bookingList}
      style={{ width: "100%" }}
      pagination={{ pageSize: 4 }}
    />
  );
};
export default TableProfile;
