//axios
import axios from "axios";
import { BASE_URL_API, TOKEN_HEADER, TOKEN_LOGIN } from "../constants/constant";
import { getValue } from "./local_storage";

const axiosWithAuth = axios.create({
  baseURL: BASE_URL_API,
  timeout: 180_000,
});

axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = getValue(TOKEN_LOGIN);
    console.log(token, config);
    if (token) {
      config.headers[TOKEN_HEADER] = `${token}`;
    } else {
      config.headers[TOKEN_HEADER] = null;
    }
    return config;
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
