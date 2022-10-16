import "./MenuItems.scss";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <li className="menu__link">
        <NavLink to="/" className="menu__link__item">Home</NavLink>
      </li>
      <li className="menu__link">
        <NavLink to="/about" className="menu__link__item">About</NavLink>
      </li>
      <li className="menu__link">
        <NavLink to="/products" className="menu__link__item">Products</NavLink>
      </li>
      <li className="menu__link">
        <NavLink to="/contact" className="menu__link__item">Contact</NavLink>
      </li>
    </>
  )
}

export default Menu;