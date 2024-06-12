import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { axiosWithAuth } from "../../../services/services";
import { useSelector } from "react-redux";
import { data, setIsDoneToggle } from "./TableBookingPageHandler";

const TableOfBookingPage = () => {
  const profile = useSelector((state) => state.profileSlice.user);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [dataListSource, setDataList] = useState(data);
  const [isReload, setIsReload] = useState(false);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const handleClickSetDone = async (bookingId, currentStatus) => {
    console.log("bookingId: ", bookingId);
    console.log("usrName: ", profile.userName);
    const status = !currentStatus ? "true" : "false";
    console.log("currentStatus: ", status);
    const dataToggle = await setIsDoneToggle(
      profile.userName,
      bookingId,
      status
    );
    console.log(dataToggle);
    setIsReload(!isReload);
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
      title: "ID",
      dataIndex: "bookingID",
      key: "bookingID",
      width: "5%",
      ...getColumnSearchProps("bookingID"),
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      width: "10%",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Tài khoản",
      dataIndex: "userName",
      key: "userName",
      width: "10%",
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Thời gian",
      dataIndex: "timeBook",
      key: "timeBook",
      width: "15%",
      ...getColumnSearchProps("timeBook"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "adress",
      key: "adress",
      width: "30%",
      ...getColumnSearchProps("adress"),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      width: "20%",
      ...getColumnSearchProps("note"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: "10%",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Tổng",
      dataIndex: "Total",
      key: "Total",
      width: "10%",
      ...getColumnSearchProps("Total"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (_, render) => {
        return (
          <button
            key={render.bookingID}
            className={`btn ${render.isDone ? "btn-success" : "btn-danger"}`}
            onClick={() => {
              handleClickSetDone(render.bookingID, render.isDone);
            }}
          >
            {render.isDone ? "Đã xong" : "Hoàn thành"}
          </button>
        );
      },
    },
  ];
  useEffect(() => {
    const iife = async () => {
      if (profile?.userName) {
        const data = await axiosWithAuth({
          method: "get",
          url: `/booking/allList/${profile?.userName}`,
        });
        // console.log(data.data.content);
        if (data) {
          const mapData = data.data.content.map((item)=>{
            return {
              ...item,
              Total: item.Total.toLocaleString()
            }
          })
          setDataList(mapData);
        } else {
          setDataList(data);
        }
      }
    };
    iife();
  }, [profile, isReload]);
  return <Table columns={columns} dataSource={dataListSource} />;
};
export default TableOfBookingPage;
