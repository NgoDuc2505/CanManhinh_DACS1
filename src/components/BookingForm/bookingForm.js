import { axiosWithoutAuth } from "../../services/services";

const addressFormater = (selector) => {
  const result = {
    locateNumber: "",
    street: "",
    subDistrict: "",
    district: "",
    city: "",
  };
  try {
    const adr = selector.address;
    const adrArray = adr.split(", ");
    if (adrArray.length != 5) {
      throw new Error();
    }
    Object.keys(result).forEach((item, index) => {
      result[item] = adrArray[index];
    });
    return result;
  } catch (e) {
    console.log(e);
    return result;
  }
};

const initVal = {
  phone: "",
  locateNumber: "",
  street: "",
  subDistrict: "",
  district: "",
  city: "",
};

const voucherVal = [
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

const getVoucherUserList = async (usrName) => {
  try {
    const rs = await axiosWithoutAuth({
      method: "get",
      url: `/vouchers/userVoucher/${usrName}`,
    });
    return rs.data.content;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const sendBookService = async (data) => {
  try {
    const result = await axiosWithoutAuth({
      method: "post",
      url: "/booking/add",
      data: data,
    });
    return {
      result: result,
      status: true
    };
  } catch (e) {
    return {
      result: e,
      status: false
    };
  }
};

const getVoucher = async (usrName) => {
  try {
    const voucherListData = await getVoucherUserList(usrName);
    const convertedData = convertVouListAPIToVouDtListDisplay(voucherListData);
    return convertedData;
  } catch (e) {
    return [];
  }
};

const convertVouListAPIToVouDtListDisplay = (orinList) => {
  if (orinList.length == 0) {
    return [];
  }
  return orinList.map((item) => {
    return {
      value: `${item.valuesVoucher}-${item.voucherID}`,
      label: `${item.voucherName}: Giảm: ${item.valuesVoucher}vnd`,
    };
  });
};

const formatVoucherIdAndVal = (codeVoucher) => {
  if (!codeVoucher) {
    return {
      voucherId: "",
      voucherVal: "",
    };
  }
  const voucherId = codeVoucher.split("-")[1];
  const voucherVal = codeVoucher.split("-")[0];
  return {
    voucherId,
    voucherVal,
  };
};

export {
  addressFormater,
  initVal,
  getVoucherUserList,
  voucherVal,
  convertVouListAPIToVouDtListDisplay,
  formatVoucherIdAndVal,
  sendBookService,
  getVoucher,
};
