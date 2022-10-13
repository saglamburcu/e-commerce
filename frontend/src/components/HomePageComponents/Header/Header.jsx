import React, {useContext} from "react";
import { Link, Outlet } from "react-router-dom";
import "./Header.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {faHeart, faUser} from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../../context/UserContext";
import { OrderContext } from "../../../context/OrderContext";
import { ProductContext } from "../../../context/ProductContext";
import { useState } from "react";

const Header = () => {
  const {userInfo, isLogin} = useContext(UserContext);
  const {basketIconNumber, favoriteProductsList} = useContext(OrderContext);
  const [isShowSearchArea, setIsShowSearchArea] = useState(false);

  return (
    <>
      <div className="header">
        <div className="header__logo">
          <h1>PatiShop</h1>
          {isLogin && 
            <p>{`Email: ${userInfo?.email}`}</p>
          }
        </div>

        <div className="header__menu">
          <ul className="header__menu__links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <a href="#">Offers</a>
            </li>
            <li>
              <a href="#">Become A Seller</a>
            </li>
            <li>
              <a href="#">User Rules</a>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          <div className="header__menu__search">
            <input type="text" />
            <button className="header__menu__search__icon">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="header__menu__icons__search__item" />
            </button>
          </div>

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
              isLogin ? (
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