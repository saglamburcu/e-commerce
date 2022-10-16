import "./Footer.scss";
import MenuItems from "../HomePageComponents/MenuItems/MenuItems";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__address">
        <h1>PatiShop</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga sed eius vel unde possimus perferendis voluptate saepe maiores, commodi vero sapiente placeat cumque repellat quaerat eos minus mollitia consequatur molestias!
      </div>
      <div className="footer__quick__menu">
        <h3>Menü</h3>
        <MenuItems />
      </div>
      <ul className="footer__follow__us">
        <h3>Bizi Takip Edin</h3>
        <li>Facebook</li>
        <li>Instagram</li>
        <li>Twitter</li>
      </ul>
    </div>
  )
}

export default Footer;