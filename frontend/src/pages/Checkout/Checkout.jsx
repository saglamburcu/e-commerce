import "./Checkout.scss";
import { Outlet } from "react-router-dom";

const Checkout = () => {
  return (
    <div className="checkout__container">
      <div>Checkout</div>
      <Outlet />
    </div>
  )
}

export default Checkout;