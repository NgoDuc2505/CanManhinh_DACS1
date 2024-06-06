const validateMessages = {
  required: "${VnName} không được để trống !",
  string: {
    max: "Tối đa 12 ký tự !",
    min: "Tối đa 8 ký tự !",
  },
  pattern: {
    mismatch: "${regexMsg}",
  },
};
const mapperRegex = {
  password:
    "Mật khẩu: tối thiểu 8 kí tự, tối đa 15 ký tự, chưa ít nhất 1 ký tự thường, 1 in hoa, 1 số, 1 ký tự đặc biệt.",
  birthday: "Vui lòng chọn ngày sinh.",
  phone: "Phải là số điện thoại.",
};
const regexObject = {
  regexPass:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
  phone: /^[0-9]{9,12}$/,
};

export { mapperRegex, regexObject, validateMessages };
