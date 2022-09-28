import AccountMenu from "../../components/AccountPageComponents/AccountMenu/AccountMenu";
import { Outlet } from "react-router-dom";

const Account = () => {
  return (
    <>
      <AccountMenu />
      <Outlet />
    </>
  )
}

export default Account;