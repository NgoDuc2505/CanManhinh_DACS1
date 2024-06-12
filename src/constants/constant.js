const LOGIN = "/login";
const REGISTER = "/register";
const HOME = "/";
const ADMIN = "adminCMH";
const BASE_URL_API = "http://localhost:3000";
const TOKEN_LOGIN = "token";
const USER_PROFILE = "profile_data";
const ADMIN_CODE = 1;
const TOKEN_HEADER = "token_header";
const SECURE_PASS = "SecurePass1!"
const ALERT = {
  failed: "Thất bại",
  success: "Thành công"
}
const API_RES_MSG={
  failed:{
    usrNameExited: "Exited username...!",
    tooLongUsrName: "BE ERROR",
    dateBookInvalid : "Date booking is invalid..."
  }
}
export {
  LOGIN,
  REGISTER,
  HOME,
  ADMIN,
  BASE_URL_API,
  TOKEN_LOGIN,
  USER_PROFILE,
  ADMIN_CODE,
  TOKEN_HEADER,
  SECURE_PASS,
  ALERT,
  API_RES_MSG
};
