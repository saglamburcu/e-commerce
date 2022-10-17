import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../../context/UserContext";
import { OrderContext } from "../../../context/OrderContext";
import { ProductContext } from "../../../context/ProductContext";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MenuItems from "../MenuItems/MenuItems";

const Header = () => {
  const { userInfo, isLogin } = useContext(UserContext);
  const { basketIconNumber, favoriteProductsList } = useContext(OrderContext);
  return (
    <>
      <div className="header">
        <div className="header__logo">
          <h1>PatiShop</h1>
          {
            isLogin && userInfo
              ? <p>{`Email: ${userInfo.email}`}</p>
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
              <FontAwesomeIcon icon={faHeart} />
              <span>{favoriteProductsList.length}</span>
            </Link>
            <Link to="/basket" className="header__menu__icons__basket">
              <FontAwesomeIcon icon={faCartShopping} />
              <span>{basketIconNumber}</span>
            </Link>

            {
              isLogin && userInfo ? (
                <Link to="/account" className="header__menu__icons__user">
                  <FontAwesomeIcon icon={faUser} /> Hesabım
                </Link>
              ) : (
                <Link to="/login" className="header__menu__icons__user">
                  <FontAwesomeIcon icon={faUser} /> Giriş Yap
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