import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") || false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    localStorage.setItem("isLogin", isLogin);
  }, [userInfo, isLogin]);

  const login = (data) => {
      setUserInfo(data.user);
      setIsLogin(true);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("access-token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  }

  const values = {
    login,
    userInfo,
    isLogin,
    setUserInfo,
    setIsLogin
  }

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  )
}

export {
  UserContext,
  UserProvider
}