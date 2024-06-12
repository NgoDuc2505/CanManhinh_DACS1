import { axiosWithAuth } from "../../services/services";

const getBookingList = async (userName) => {
  const data = await axiosWithAuth({
    method: "get",
    url: `/booking/listUser/${userName}`,
  });
  return data.data;
};

const dataSourceFormater = (dataAPISource) => {
  if (dataAPISource.length == 0) {
    return [];
  }
  return dataAPISource.map((item) => {
    return {
      key: `${item.bookingID}`,
      fullName: item.fullName,
      adress: item.adress,
      isDone: item.isDone,
      timeBook: item.timeBook.split("T")[0],
      total: item.Total.toLocaleString(),
    };
  });
};

const setIsDelBooking = async (bookingId,usrName) => {
  try {
    const dataDel = await axiosWithAuth({
      method: "put",
      url: `/booking/setIsDel/${bookingId}`,
      data:{
        usrName
      }
    })
    return dataDel
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { getBookingList, dataSourceFormater, setIsDelBooking };
