import "./MyOrdersDetail.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTruckFast, faCheck} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import { fetchSingleOrder } from "../../../../api";
import MyBasket from "../../../BasketPageComponents/MyBasket/MyBasket";

const MyOrdersDetail = () => {
  const [orderDetail, setOrderDetail] = useState(null);

  const {id} = useParams();

  useEffect(() => {
    (async () => {
      const data = await fetchSingleOrder(id);
      setOrderDetail(data.order);
    })()
  }, []);

  console.log(orderDetail)

  const orderIcons = [
    {status: "Processing", icon: faThumbsUp, text: "Siparişiniz alındı"},
    {status: "Shipped", icon: faTruckFast, text: "Kargoya verildi"},
    {status: "Delivered", icon: faCheck, text: "Teslim edildi"}
  ];
  
  return (   
    <div className="orders__detail">
      <div className="step-wizard">
        <ul className="step-wizard-list">
          {
            orderIcons.map(item => (
              <li className={item.status === orderDetail?.orderStatus ? "step-wizard-item current-item" : "step-wizard-item"}>
                <span className="progress-count">
                  <FontAwesomeIcon className="status__icon__circle__item" icon={item.icon} />
                </span>
                <span className="progress-label">{item.text}</span>
              </li>
            ))
          }
        </ul>
      </div>   

      <MyBasket 
        showBtn={false}
        productsList={orderDetail?.orderItems}
        isBasketPage={false}
        isFavoritePage={false}
      />
    </div>      
  )
}

export default MyOrdersDetail;
