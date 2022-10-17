import "./AccountMenu.scss";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogout } from "../../../api";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const AccountMenu = () => {
  const navigate = useNavigate();
  const { setIsLogin, setUserInfo } = useContext(UserContext);

  const handleLogout = async () => {
    await fetchLogout();
    navigate("/login");
    setIsLogin(false);
    setUserInfo(null);
  }

  return (
    <div className="accountmenu">
      <div className="accountmenu__item">
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