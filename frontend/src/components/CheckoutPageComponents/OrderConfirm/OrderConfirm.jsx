import "./OrderConfirm.scss";
import { useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { UserContext } from "../../../context/UserContext";
import MyBasket from "../../BasketPageComponents/MyBasket/MyBasket";
import OrderSummary from "../OrderSummary/OrderSummary";

const OrderConfirm = () => {

  const { addressData, productsInTheBasket, removeProductFromBasket } = useContext(OrderContext);
  const { userInfo } = useContext(UserContext);

  return (
    <div className="orderconfirm">
      <div className="orderconfirm__detail">
        <div className="orderconfirm__detail__shipping">
          <h1>Teslimat Adresi</h1>
          <p>
            <span>İsim: </span>
            {userInfo.name}
          </p>
          <p>
            <span>Telefon: </span>
            {addressData?.phoneNo}
          </p>
          <p>
            <span>Adres: </span>
            {addressData.country} {addressData.state} {addressData.city} {addressData.address}
          </p>
        </div>
        <div className="orderconfirm__detail__infos">
          <div className="orderconfirm__detail__infos__basket">
            <MyBasket
              showBtn={false}
              productsList={productsInTheBasket}
              removeProduct={removeProductFromBasket}
              isBasketPage={false}
              isFavoritePage={false}
            />
          </div>
          <div className="orderconfirm__detail__infos__summary">
            <OrderSummary />
          </div>
        </div>
      </div>


    </div>
  )
}

export default OrderConfirm;
