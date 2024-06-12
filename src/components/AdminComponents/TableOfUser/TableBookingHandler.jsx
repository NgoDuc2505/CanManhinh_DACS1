import { HolderOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "antd";
import React, { useContext, useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import { axiosWithAuth } from "../../../services/services";
const RowContext = React.createContext({});
const DragHandle = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{
        cursor: "move",
      }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const RowData = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });
  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
        }
      : {}),
  };
  const contextValue = useMemo(
    () => ({
      setActivatorNodeRef,
      listeners,
    }),
    [setActivatorNodeRef, listeners]
  );
  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const voucherDataFormater = (list) => {
  return list.map((item) => {
    return {
      value: item.voucherID,
      label: item.voucherName,
    };
  });
};

const initDataSelect = [
  {
    value: "jack",
    label: "Jack",
  },
  {
    value: "lucy",
    label: "Lucy",
  },
  {
    value: "Yiminghe",
    label: "yiminghe",
  },
  {
    value: "disabled",
    label: "Disabled",
    disabled: true,
  },
];

const giveVoucherToAccount = async (dataInput) => {
  try {
    const data = await axiosWithAuth({
      method: "post",
      url: "/vouchers/userAddVoucher",
      data: {
        ...dataInput,
      },
    });
    return data.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const updateRole = async (dataInput) => {
  try {
    const data = await axiosWithAuth({
      method: "put",
      url: "/users/updateUserRole",
      data: {
        ...dataInput,
      },
    });
    return data.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export {
  DragHandle,
  RowData,
  voucherDataFormater,
  initDataSelect,
  giveVoucherToAccount,
  updateRole
};
