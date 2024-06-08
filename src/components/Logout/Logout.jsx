import { useEffect } from "react";
import { delLocal, getValue } from "../../services/local_storage";
import { TOKEN_LOGIN, USER_PROFILE } from "../../constants/constant";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/Slices/profileSlice";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const data = getValue(TOKEN_LOGIN);
    if(data){
        delLocal(TOKEN_LOGIN);
        delLocal(USER_PROFILE);
        dispatch(setCurrentUser(null));
        navigate("/");
    }else{
        navigate("/");
    }
  }, []);
  return <div>Logout</div>;
}

export default Logout;
