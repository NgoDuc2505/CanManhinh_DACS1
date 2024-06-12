import { axiosWithoutAuth } from "../../../services/services";

const createAccount = async (value) => {
  const data = await axiosWithoutAuth({
    method: "post",
    url: "/users/create",
    data: value,
  });
  return data;
};

const formatDatePicker = (dateAntd) => {
  const data = {
    day: dateAntd.$D < 10 ? `0${dateAntd.$D}` : dateAntd.$D,
    month: dateAntd.$M + 1 < 10 ? `0${dateAntd.$M + 1}` : dateAntd.$M + 1,
    year: dateAntd.$y,
  };
  const dateResult = `${data.year}-${data.month}-${data.day}T08:35:29.000Z`;
  return {
    dateObjectFormat: data,
    dateResult,
  };
};

const formatAddress = (valuesData) => {
  const { locateNumber, street, subDistrict, district, city } = valuesData;
  const data = [locateNumber, street, subDistrict, district, city].join(", ");
  return data;
};

export { createAccount, formatDatePicker, formatAddress };
