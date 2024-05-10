import { useNavigate } from "react-router-dom"

const useHandleNavigate = (path)=>{
    const navigate = useNavigate();
    navigate(path);
}

export {useHandleNavigate}