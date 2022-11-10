import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../../context/OrderContext";
import "./OrderSummary.scss";

const OrderSummary = () => {

  const { productsInTheBasket, addressData, setOrderData, setCheckoutStep } = useContext(OrderContext);
  const navigate = useNavigate();

  let subTotal = productsInTheBasket.reduce((cumulative, item) => cumulative + item.productInfos.price * item.count, 0);

  const shippingCharges = subTotal >= 100 ? 0 : 50;

  const total = shippingCharges + subTotal;

  const handleClick = (e) => {
    e.preventDefault();

    const orders = productsInTheBasket.map(productItem => {
      return {
        product: productItem.productInfos._id,
        name: productItem.productInfos.name,
        price: productItem.productInfos.price,
        image: productItem.productInfos.images[0].url,
        quantity: productItem.count
      }
    });

    setOrderData({ shippingInfo: addressData, itemsPrice: subTotal, shippingPrice: shippingCharges, totalPrice: total, orderItems: orders });

    setCheckoutStep("card-infos");
    navigate("/checkout/card-infos");
  }

  return (
    <div className="order__summary">
      <div className="order__summary__items">
        <h3>Sipariş Özeti</h3>
        <div className="order__summary__items__price">
          <p>Ara toplam : <span>{subTotal} TL</span></p>
          <p>Kargo Ücreti : <span>{shippingCharges} TL</span></p>
          <p>TOPLAM : <span>{total} TL</span></p>
        </div>
      </div>

      <div className="order__summary__button">
        <button type="submit" onClick={handleClick}>Ödeme Yap</button>
      </div>
    </div>
  )
}
export default OrderSummary;