import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ProtectedRouteAdmin = () => {
  const { isLogin, userInfo } = useContext(UserContext);

  return (
    isLogin && userInfo.role === "admin" ? <Outlet /> : <Navigate to="/login" />
  )

}

export default ProtectedRouteAdmin;