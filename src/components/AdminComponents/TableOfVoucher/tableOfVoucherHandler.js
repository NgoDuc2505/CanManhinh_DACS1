import { axiosWithAuth, axiosWithoutAuth } from "../../../services/services";

const getListVoucher = async () => {
  try {
    const dataList = await axiosWithAuth({
      method: "get",
      url: "/vouchers/getAll",
    });
    return dataList.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const listVoucherConvertToForm = (list) => {
  return list.map((item) => {
    return {
      ...item,
      valuesVoucher: Number(item.valuesVoucher).toLocaleString(),
      expiredDate: item.expiredDate.split("T")[0],
    };
  });
};

const addVoucher = async (dataInput) => {
  try {
    const data = await axiosWithoutAuth({
        method: "post",
        url:"/vouchers/add",
        data:{
            ...dataInput
        }
    })
    return data.data
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { getListVoucher, listVoucherConvertToForm, addVoucher };
