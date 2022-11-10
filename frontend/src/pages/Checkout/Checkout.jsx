import "./Checkout.scss";
import { faTruckFast, faCheck, faLocationDot, faBox, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { Outlet } from "react-router-dom";
import Step from "../../components/Step/Step";
import { OrderContext } from "../../context/OrderContext";
import { useContext } from "react";

const Checkout = () => {
  const { checkoutStep } = useContext(OrderContext);

  const icons = [
    { status: "shipping-address", icon: faLocationDot, text: "Teslimat Adresi" },
    { status: "confirm", icon: faBox, text: "Sipariş Onayı" },
    { status: "card-infos", icon: faMoneyCheckDollar, text: "Ödeme Yap" }
  ];

  return (
    <div className="checkout__container">
      <Step steps={icons} orderDetail={checkoutStep} />
      <Outlet />
    </div>
  )
}

export default Checkout;