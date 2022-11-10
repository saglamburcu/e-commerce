import "./EditOrders.scss";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchGetSingleUser, fetchSingleOrder, fetchUpdateOrderStatus } from "../../../../../api";
import { AdminContext } from "../../../../../context/AdminContext";

const EditOrders = () => {
  const { id } = useParams();
  const { isUpdatedOrder, setIsUpdatedOrder } = useContext(AdminContext);

  const [orderDetail, setOrderDetail] = useState(null);
  const [statusValue, setStatusValue] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [user, setUser] = useState(null);

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
        setIsUpdatedOrder(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const status = [
    { value: "İşleme Alındı" },
    { value: "Kargoya verildi" },
    { value: "Teslim edildi" }
  ]

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
            orderDetail?.orderItems.map((order, index) => (
              <div key={index} className="edit__order__products__item">
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
          <select onChange={(e) => setStatusValue(e.target.value)}>
            <option value=""></option>
            {
              status.map((item, index) => (
                <option key={index} value={item.value}>{item.value}</option>
              ))
            }
          </select>
          <button type="submit" className={isUpdatedOrder ? "updated" : ""}>
            {isUpdatedOrder ? "Güncellendi" : "Güncelle"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditOrders;