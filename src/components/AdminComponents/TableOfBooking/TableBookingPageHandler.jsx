import { axiosWithAuth } from "../../../services/services";

const data = [
  {
    bookingID: "1",
    fullName: "John Brown",
    userName: 32,
    adress: "New York No. 1 Lake Park",
    timeBook: "2024-06-25",
    note: "fdg",
    phone: "0364643405",
  },
  {
    bookingID: "2",
    fullName: "Joe Black",
    userName: 42,
    adress: "London No. 1 Lake Park",
    timeBook: "2024-06-25",
    note: "fdg",
    phone: "0364643405",
  },
  {
    bookingID: "3",
    fullName: "Jim Green",
    userName: 32,
    adress: "Sydney No. 1 Lake Park",
    timeBook: "2024-06-25",
    note: "fdg",
    phone: "0364643405",
  },
  {
    bookingID: "4",
    fullName: "Jim Red",
    userName: 32,
    adress: "London No. 2 Lake Park",
    timeBook: "2024-06-25",
    note: "fdg",
    phone: "0364643405",
  },
];

const setIsDoneToggle = async (usrName, bookingId, status) => {
  try {
    const setData = await axiosWithAuth({
      method: "put",
      url: "/booking/setIsDone",
      data: {
        usrName,
        bookingId,
        status,
      },
    });
    console.log("setData: ", setData);
    return setData;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { data, setIsDoneToggle };
