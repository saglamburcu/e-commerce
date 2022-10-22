import "./Footer.scss";
import MenuItems from "../HomePageComponents/MenuItems/MenuItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__contact">
        <img src="images/logo.png" alt="" />

        <div className="footer__contact__address">
          <FontAwesomeIcon icon={faLocationDot} className="footer__contact__address__icon" />
          <div className="footer__contact__address__text">
            Bostanlı Mah. Şehitler Bulvarı No: 52/A <br />
            Karşıyaka / İZMİR
          </div>
        </div>

        <div className="footer__contact__phone">
          <FontAwesomeIcon icon={faPhone} className="footer__contact__phone__icon" />

          <div className="footer__contact__phone__text">(0232) XXX YY ZZ</div>
        </div>
      </div>
      <div className="footer__quick__menu">
        <ul>
          <MenuItems />
        </ul>
      </div>
      <div className="footer__follow__us">
        <h3>Bizi Takip Edin</h3>
        <ul>
          <li>
            <BsFacebook className="facebook" />
          </li>
          <li>
            <BsInstagram className="instagram" />
          </li>
          <li>
            <BsTwitter className="twitter" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;