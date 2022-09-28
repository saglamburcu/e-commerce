import "./AccountMenu.scss";
import { Link } from "react-router-dom";

const AccountMenu = () => {
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
        <Link to="/account/forgot-password" className="accountmenu__item__forgotpassword">
          <span>Parolamı unuttum</span>
        </Link>
        <Link to="/account/logout" className="accountmenu__item__logout">
          <span>Çıkış Yap</span>
        </Link>
      </div>
    </div>
  )
}

export default AccountMenu;