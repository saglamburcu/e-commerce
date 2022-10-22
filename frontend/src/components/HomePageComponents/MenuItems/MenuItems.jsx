import "./MenuItems.scss";
import { NavLink } from "react-router-dom";

const Menu = () => {

  return (
    <>
      <li className="menu__link">
        <NavLink to="/" className="menu__link__item">
          <span>Anasayfa</span>
        </NavLink>
      </li>
      <li className="menu__link">
        <NavLink to="/about" className="menu__link__item">Hakkımızda</NavLink>
      </li>
      <li className="menu__link">
        <NavLink to="/products" className="menu__link__item">Ürünler</NavLink>
      </li>
      <li className="menu__link">
        <NavLink to="/contact" className="menu__link__item">İletişim</NavLink>
      </li>
    </>
  )
}

export default Menu;