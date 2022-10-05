import "./OrderConfirm.scss";
import { useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { UserContext } from "../../../context/UserContext";
import MyBasket from "../../BasketPageComponents/MyBasket/MyBasket";
import OrderSummary from "../OrderSummary/OrderSummary";

const OrderConfirm = () => {

  const {addressData} = useContext(OrderContext);
  const {userInfo} = useContext(UserContext);

  return (
    <div className="orderconfirm">
      <div className="orderconfirm__detail">
        <div className="orderconfirm__detail__shipping">
          <h1>Teslimat Adresi</h1>
          <p>İsim: {userInfo.name}</p>
          <p>Telefon: {addressData?.phoneNo}</p>
          <p>Adres: {addressData.country} {addressData.state} {addressData.city} {addressData.address}</p>
        </div> 
        <MyBasket url={"/basket"} buttonText={"Sepete Geri Dön"} showBtn={false}/> 
      </div>
        
      <div className="orderconfirm__summary">
        <OrderSummary />   
      </div>  
    </div>
  )
}

export default OrderConfirm;
