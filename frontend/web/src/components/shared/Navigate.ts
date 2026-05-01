import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const Navigate = (path : string) => {
    navigate(path);
}

export default Navigate;