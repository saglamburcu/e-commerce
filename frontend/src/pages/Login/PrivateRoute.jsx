import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
  const {isLogin} = useContext(UserContext);

  if (!isLogin) {
    return <Navigate to="/login" />
  }

  return (
    <>
      {children}
    </>
  )
  
}

export default PrivateRoute;