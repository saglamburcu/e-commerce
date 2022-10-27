import "./MyOrdersList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { fetchAllOrders } from "../../../../api";
import { UserContext } from "../../../../context/UserContext";

const MyOrders = () => {
  const { userInfo } = useContext(UserContext)
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchAllOrders();
      setAllOrders(data.orders);
    })()
  }, []);

  return (
    <div className="myOrdersList">
      <table>
        <tr>
          <th>Sipariş Tarihi</th>
          <th>Sipariş Miktarı</th>
          <th>Alıcı</th>
          <th>Teslimat Adresi</th>
          <th>Tutar</th>
          <th>Sipariş Detayı</th>
        </tr>
        {
          allOrders.map(order => {
            const { country, state, city, address } = order.shippingInfo;

            return (
              <tr>
                <td>{order.createdAt.split("T")[0]}</td>
                <td>{order.orderItems.reduce((cumulative, item) => cumulative + item.quantity, 0)} Ürün</td>
                <td>{userInfo.name}</td>
                <td>{country} {state} {city} {address}</td>
                <td>{order.totalPrice} TL</td>
                <td>
                  <Link to={`/order/${order._id}`} className="details__icon">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Link>
                </td>
              </tr>
            )
          })
        }
      </table>
    </div>
  )
}

export default MyOrders;