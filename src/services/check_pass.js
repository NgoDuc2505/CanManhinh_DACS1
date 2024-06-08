import * as bcrypt from "bcryptjs";

const decodePass = async (hash, pass) => {
  return await bcrypt.compare(pass, hash);
};

export { decodePass };
