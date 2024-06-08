import { useNavigate } from "react-router-dom";
import { axiosWithoutAuth } from "../../../services/services";
import { TOKEN_LOGIN, USER_PROFILE } from "../../../constants/constant";
import { setLocal } from "../../../services/local_storage";
import swal from "sweetalert";


const useHandleNavigate = (path) => {
  const navigate = useNavigate();
  navigate(path);
};

const onFinish = async (values) => {
  try {
    console.log("Success:", values);
    const result = await axiosWithoutAuth({
      method: "POST",
      url: "/users/login",
      data: {
        userName: values.Username,
        passWord: values.password,
      },
    });
    console.log("result", result.data.content.data);
    setLocal(result.data.content.token, TOKEN_LOGIN);
    setLocal(result.data.content.data, USER_PROFILE);
    swal("Thành công!", "Đăng nhập hoàn tất", "success");
    return {
      status: true,
      data: result.data.content.data
    };
  } catch (e) {
    swal(
      "Thất bại!",
      `Tên đăng nhập hoặc mật khẩu không đúng ! [${e.response.data.msg}]`,
      "error"
    );
    console.log("error api", e);
    return {
      status: false,
      data: null
    };
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
  swal("Thất bại!", `Hãy điền vào form đúng định dạng !`, "error");
};
export { useHandleNavigate, onFinish, onFinishFailed };
