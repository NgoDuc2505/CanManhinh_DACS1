import * as bcrypt from "bcryptjs";
import { jwtDecode } from "jwt-decode";

const decodePass = async (hash, pass) => {
  return await bcrypt.compare(pass, hash);
};

const decodeToken = (token) => {
  return jwtDecode(token);
};

export { decodePass, decodeToken };
