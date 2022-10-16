import "./Account.scss";
import AccountMenu from "../../components/AccountPageComponents/AccountMenu/AccountMenu";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const Account = () => {
  return (
    <>
      <div className="account">
        <AccountMenu />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Account;