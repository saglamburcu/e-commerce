import "./Payment.scss";
import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCreateOrder } from "../../../api";
import { OrderContext } from "../../../context/OrderContext";

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { orderData, setProductsInTheBasket, setBasketIconNumber, setFavoriteProductsList } = useContext(OrderContext);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const data = await axios.post("http://localhost:4000/api/payment/process", {
        amount: orderData.totalPrice,
      });

      setClientSecret(data.data.clientSecret)
    };

    fetchClientSecret();
    console.log("clientSecretKeys", clientSecret)
  }, []);

  const confirmPayment = async (e) => {
    e.preventDefault();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    })

    if (result.paymentIntent.status === "succeeded") {
      const paymentInfo = {
        id: result.paymentIntent.id,
        status: result.paymentIntent.status
      }

      const res = await fetchCreateOrder({ ...orderData, paymentInfo });

      if (res.success) {
        setProductsInTheBasket([]);
        setBasketIconNumber(0);
        setFavoriteProductsList([]);
        navigate("/success");
      }
    }
  }

  const cardStyle = {
    style: {
      base: {
        color: "#F19E8E",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "14px",
        "::placeholder": {
          color: "#F19E8E"
        },
        iconColor: "#F19E8E"
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  return (
    <div className="payment">
      <div className="payment__card">
        <CardElement className="payment__card__item" options={cardStyle} />
        <button onClick={confirmPayment}>Onayla</button>
      </div>
    </div>
  )
}

export default Payment;