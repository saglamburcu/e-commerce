import "./Success.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";

const Success = () => {
  return (
    <div className="success">
      <span className="success__icon"><FontAwesomeIcon icon={faCircleCheck} /></span>
      <h1 className="success__text">Siparişiniz alınmıştır</h1>
    </div>
  )
}

export default Success;