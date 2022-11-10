import "./MyOrdersDetail.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { fetchSingleOrder } from "../../../../api";
import MyBasket from "../../../BasketPageComponents/MyBasket/MyBasket";
import Step from "../../../Step/Step";
import Loading from "../../../Loading/Loading";

const MyOrdersDetail = () => {
  const [orderDetail, setOrderDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await fetchSingleOrder(id);
      setOrderDetail(data.order);

      setTimeout(() => {
        setIsLoading(false);
      }, 750);
    })()
  }, []);

  if (isLoading) {
    return <Loading />
  }

  const orderIcons = [
    { status: "İşleme Alındı", icon: faThumbsUp, text: "Siparişiniz alındı" },
    { status: "Kargoya verildi", icon: faTruckFast, text: "Kargoya verildi" },
    { status: "Teslim edildi", icon: faCheck, text: "Teslim edildi" }
  ];

  console.log(orderDetail)

  return (
    <>
      {
        orderDetail &&

        <div className="orders__detail">
          <Step steps={orderIcons} orderDetail={orderDetail.orderStatus} />
          <MyBasket
            showBtn={false}
            productsList={orderDetail.orderItems}
            isBasketPage={false}
            isFavoritePage={false}
          />
        </div>
      }
    </>
  )
}

export default MyOrdersDetail;
