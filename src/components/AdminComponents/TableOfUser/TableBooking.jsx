import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Col, Switch, Table, Row } from "antd";
import { DragHandle, RowData } from "./TableBookingHandler";
import ButtonGroupBooking from "./ButtonGroupBooking";
import Search from "antd/es/transfer/search";
import { axiosWithoutAuth } from "../../../services/services";
import { useSelector, useDispatch } from "react-redux";
import { setList } from "../../../redux/Slices/userSlice";

const columns = [
  {
    key: "sort",
    align: "center",
    width: 80,
    render: () => <DragHandle />,
  },
  {
    title: "Username",
    dataIndex: "usrName",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const initialData = [
  {
    key: "1",
    usrName: "John Brown",
    phone: 32,
    address: "Long text Long",
    role: "Admin",
    action: <ButtonGroupBooking idUser={"1"}></ButtonGroupBooking>,
  },
  {
    key: "2",
    usrName: "Jim Green",
    phone: 42,
    address: "London No. 1 Lake Park",
    role: "User",
    action: <ButtonGroupBooking idUser={"2"}></ButtonGroupBooking>,
  },
  {
    key: "3",
    usrName: "Joe Black",
    phone: 32,
    address: "Sidney No. 1 Lake Park",
    role: "User",
    action: <ButtonGroupBooking idUser={"3"}></ButtonGroupBooking>,
  },
];

const TableBooking = () => {
  const selector = useSelector((state) => {
    return state.userListSlice.listUser;
  });
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState(initialData);
  const handleMappingData = (userList) => {
    if (userList.length > 0) {
      const dataMapper = userList.map((item, index) => {
        return {
          key: "" + index,
          usrName: item.userName,
          phone: item.phone,
          address: item.address,
          role: item.roleID == 1 ? "Admin" : "User",
          action: (
            <ButtonGroupBooking data={item}></ButtonGroupBooking>
          ),
        };
      });
      return dataMapper;
    }
    return [];
  };
  useEffect(() => {
    const fetchFction = async () => {
      try {
        const data = await axiosWithoutAuth.get("/users");
        const dataMapper = handleMappingData(data?.data?.data);
        dispatch(setList(dataMapper));
      } catch (e) {
        console.log(e);
      }
    };
    fetchFction();
  }, []);
  useEffect(() => {
    setDataSource(selector);
  }, [selector]);

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record.key === active?.id
        );
        const overIndex = prevState.findIndex(
          (record) => record.key === over?.id
        );
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };
  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <Row justify={"space-between"} align={"middle"} className="mb-3">
        <Col span={16}>
          <Search
            addonBefore="https://"
            placeholder="Input Username..."
            allowClear
          />
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
          <Switch
            checkedChildren="User"
            unCheckedChildren="Admin"
            defaultChecked
          />
        </Col>
      </Row>
      <SortableContext
        items={dataSource.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          rowKey="key"
          components={{
            body: {
              row: RowData,
            },
          }}
          columns={columns}
          dataSource={dataSource}
        />
      </SortableContext>
    </DndContext>
  );
};
export default TableBooking;
