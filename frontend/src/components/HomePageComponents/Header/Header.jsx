import React, {useContext} from "react";
import { Link, Outlet } from "react-router-dom";
import "./Header.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {faHeart, faUser} from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../../context/UserContext";
import { OrderContext } from "../../../context/OrderContext";

const Header = () => {
  const {userInfo, isLogin} = useContext(UserContext);
  const {basketIconNumber} = useContext(OrderContext);

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
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Products</a>
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
              <a href="#">Contact</a>
            </li>
          </ul>
          <div className="header__menu__icons">
            <a href="#" className="header__menu__icons__search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </a>
            <a href="#" className="header__menu__icons__favorites">
              <FontAwesomeIcon icon={faHeart} />
            </a>
            <a href="#" className="header__menu__icons__basket">
              <FontAwesomeIcon icon={faCartShopping} /> 
              <span>{basketIconNumber}</span>
            </a>

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