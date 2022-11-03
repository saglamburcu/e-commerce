import "./Orders.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { fetchDeleteOrder, fetchGetAllOrders } from "../../../../api";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [deleteOrderId, setDeleteOrderId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await fetchGetAllOrders();
      setAllOrders(res.orders);
    })()
  }, [deleteOrderId]);

  const deleteOrder = async (id) => {
    await fetchDeleteOrder(id);
    setDeleteOrderId(id);
  }

  return (
    <div className="all__orders">
      <table className="all__orders__list">
        <tr>
          <th>Sipariş ID</th>
          <th>Sipariş Durumu</th>
          <th>Ürün Adedi</th>
          <th>Tutar</th>
          <th>Sil</th>
          <th>Düzenle</th>
        </tr>

        {
          allOrders.map(order => {
            const { _id, orderStatus, orderItems, totalPrice } = order;

            return (
              <tr>
                <td>{_id}</td>
                <td>{orderStatus}</td>
                <td>{orderItems.length}</td>
                <td>{totalPrice}</td>
                <td>
                  <button onClick={() => deleteOrder(_id)}>
                    <RiDeleteBin5Fill />
                  </button>
                </td>
                <td>
                  <button onClick={() => navigate(`/dashboard/edit-order/${_id}`)}>
                    <RiEdit2Fill />
                  </button>
                </td>
              </tr>
            )
          })
        }
      </table>
    </div>
  )
}

export default Orders;