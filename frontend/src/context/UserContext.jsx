import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(null);

  const values = {
    setUserInfo
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