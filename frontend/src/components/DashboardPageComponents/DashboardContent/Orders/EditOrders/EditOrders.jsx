import "./EditOrders.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGetSingleUser, fetchSingleOrder, fetchUpdateOrderStatus } from "../../../../../api";

const EditOrders = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const [statusValue, setStatusValue] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [user, setUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    (async () => {
      const orderData = await fetchSingleOrder(id);
      setOrderDetail(orderData.order);

      setOrderStatus(orderData.order.orderStatus);

      const userData = await fetchGetSingleUser(orderData.order.user);
      setUser(userData.user);
    })()
  }, [id]);

  const updateOrderStatus = async (e) => {
    e.preventDefault();

    try {
      const res = await fetchUpdateOrderStatus(id, statusValue);

      if (res.success) {
        setOrderStatus(statusValue);
        setIsUpdated(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="edit">
      <div className="edit__order">
        <div className="edit__order__shippingInfo">
          <h2>Teslimat Adresi</h2>
          <p>
            <span>İsim: </span>
            {user?.name}
          </p>
          <p>
            <span>Telefon: </span>
            {orderDetail?.shippingInfo.phoneNo}
          </p>
          <p>
            <span>Adres: </span>
            {orderDetail?.shippingInfo.country} {orderDetail?.shippingInfo.state} {orderDetail?.shippingInfo.city} {orderDetail?.shippingInfo.address}
          </p>
        </div>

        <div className="edit__order__payment">
          <h2>Ödeme Bilgisi</h2>
          {
            orderDetail?.paymentInfo.status === "succeeded" && <p className="paid">ÖDENDİ</p>
          }

          <p>
            <span>Tutar: </span>
            {orderDetail?.itemsPrice} TL
          </p>
          <p>
            <span>Kargo Ücreti: </span>
            {orderDetail?.shippingPrice} TL
          </p>
          <p>
            <span>Toplam: </span>
            {orderDetail?.totalPrice} TL
          </p>
        </div>

        <div className="edit__order__status">
          <h2>Sipariş Durumu</h2>
          <p>{orderStatus}</p>
        </div>

        <h2>Ürünler</h2>
        <div className="edit__order__products">
          {
            orderDetail?.orderItems.map(order => (
              <div className="edit__order__products__item">
                <img src={order.image} alt="order-image" />
                <p>{order.name}</p>
                <p>{order.quantity} x {order.price} = <span>{order.quantity * order.price} TL</span></p>
              </div>
            ))
          }
        </div>
      </div>

      <div className="edit__process">
        <form className="edit__process__form" onSubmit={updateOrderStatus}>
          <h2>Sipariş Durumunu Güncelle</h2>
          <input type="text" value={statusValue} onChange={(e) => setStatusValue(e.target.value)} />
          <button type="submit" className={isUpdated ? "updated" : ""}>
            {isUpdated ? "Güncellendi" : "Güncelle"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditOrders;