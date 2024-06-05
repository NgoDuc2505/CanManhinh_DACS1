//axios
import axios from "axios";
import { BASE_URL_API } from "../constants/constant";

const axiosWithAuth = axios.create({
  baseURL: BASE_URL_API,
  timeout: 180_000,
});

axiosWithAuth.interceptors.request.use(
  (config) => {
    config.headers.token = "token_here";
  },
  (error) => {
    return Promise.reject(error);
  }
);

const axiosWithoutAuth = axios.create({
  baseURL: BASE_URL_API,
  timeout: 180_000,
});

export { axiosWithAuth, axiosWithoutAuth };
