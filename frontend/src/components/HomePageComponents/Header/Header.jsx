import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../../context/UserContext";
import { OrderContext } from "../../../context/OrderContext";
import SearchBar from "../SearchBar/SearchBar";
import MenuItems from "../MenuItems/MenuItems";

const Header = () => {
  const { userInfo, isLogin } = useContext(UserContext);
  const { basketIconNumber, favoriteProductsList } = useContext(OrderContext);

  return (
    <>
      <div className="header">
        <div className="header__logo">
          <img src="images/logo.png" alt="logo" />
          {
            isLogin && userInfo
              ? <div>{userInfo.email}</div>
              : ""
          }
        </div>

        <div className="header__menu">
          <ul className="header__menu__links">
            <MenuItems />
          </ul>

          <SearchBar />

          <div className="header__menu__icons">
            <Link to="/favorites" className="header__menu__icons__favorites">
              <FontAwesomeIcon icon={faHeart} className="header__menu__icons__favorites__item" />
              <span>{favoriteProductsList.length}</span>
            </Link>
            <Link to="/basket" className="header__menu__icons__basket">
              <FontAwesomeIcon icon={faCartShopping} className="header__menu__icons__basket__item" />
              <span>{basketIconNumber}</span>
            </Link>

            {
              isLogin && userInfo ? (
                <Link to="/account" className="header__menu__icons__user">
                  <FontAwesomeIcon icon={faUser} className="header__menu__icons__user__item" />
                  <p>Hesabım</p>
                </Link>
              ) : (
                <Link to="/login" className="header__menu__icons__user">
                  <FontAwesomeIcon icon={faUser} className="header__menu__icons__user__item" />
                  <p>Giriş Yap</p>
                </Link>
              )
            }

          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Header;