import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OtpProtectedRoute = ({children}) => {

    const isOtpSent = useSelector((state) => state.signup.isOtpSent);
    const navigate = useNavigate();

    if(!isOtpSent) {
       navigate("/login");
    }

  return (
    <>
        {
            children
        }
    </>
  )
}

export default OtpProtectedRoute
