import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ProtectedRoute = () => {
  const { isLogin, userInfo } = useContext(UserContext);

  return (
    isLogin && userInfo ? <Outlet /> : <Navigate to="/login" />
  )

}

export default ProtectedRoute;