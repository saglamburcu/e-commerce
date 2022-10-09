import "./Account.scss";
import AccountMenu from "../../components/AccountPageComponents/AccountMenu/AccountMenu";
import { Outlet } from "react-router-dom";

const Account = () => {
  return (
    <div className="account">
      <AccountMenu />
      <Outlet />
    </div>
  )
}

export default Account;