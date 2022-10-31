import "./AccountMenu.scss";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogout } from "../../../api";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";

const AccountMenu = () => {
  const { setIsLogin, userInfo, setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetchLogout();
    navigate("/login");
    setIsLogin(false);
    setUserInfo(null);
  }

  return (
    <div className="accountmenu">
      <div className="accountmenu__item">
        {
          userInfo.role === "admin" &&
          <Link to="/dashboard" className="accountmenu__item__dashboard">
            <span>Dashboard</span>
          </Link>
        }
        <Link to="/account/user-infos" className="accountmenu__item__userInfo">
          <span>Kullanıcı Bilgilerim</span>
        </Link>
        <Link to="/account/my-orders" className="accountmenu__item__myorders">
          <span>Siparişlerim</span>
        </Link>
        <Link to="/account/change-password" className="accountmenu__item__changepassword">
          <span>Parolamı değiştir</span>
        </Link>

        <button type="button" onClick={handleLogout}>Çıkış Yap</button>

      </div>
    </div>
  )
}

export default AccountMenu;