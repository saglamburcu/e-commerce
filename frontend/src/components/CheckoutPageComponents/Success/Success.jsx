import "./Success.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContext";

const Success = () => {
  const navigate = useNavigate();
  const { setIsUpdatedOrder } = useContext(AdminContext);

  const backToMyOrders = () => {
    setIsUpdatedOrder(true);
    navigate("/account/my-orders");
  }

  return (
    <div className="success__page">
      <div className="success__page__modal">
        <span className="success__page__modal__icon"><FontAwesomeIcon icon={faCircleCheck} /></span>
        <h1 className="success__page__modal__text">Siparişiniz alınmıştır</h1>
      </div>
      <div className="success__page__button">
        <button onClick={backToMyOrders}>Siparişlerime Git</button>
      </div>
    </div>
  )
}

export default Success;