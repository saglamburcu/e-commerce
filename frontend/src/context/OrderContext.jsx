import { createContext, useState, useEffect } from "react";

const OrderContext = createContext();

const OrderProvider = ({children}) => {
  const [productsInTheBasket, setProductsInTheBasket] = useState(JSON.parse(localStorage.getItem("myBasket")) || []);
  const [basketIconNumber, setBasketIconNumber] = useState(Number(localStorage.getItem("numberOfProductsInTheBasket")) || 0);
  const [addressData, setAddressData] = useState(JSON.parse(localStorage.getItem("orderShippingAddress")) || null);
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem("order")) || null);

  useEffect(() => {
    localStorage.setItem("myBasket", JSON.stringify(productsInTheBasket));
    localStorage.setItem("numberOfProductsInTheBasket", basketIconNumber);
    localStorage.setItem("orderShippingAddress", JSON.stringify(addressData));
    localStorage.setItem("order", JSON.stringify(order));
  }, [productsInTheBasket, basketIconNumber, addressData, order]);

  const values = {
    productsInTheBasket,
    setProductsInTheBasket,
    basketIconNumber,
    setBasketIconNumber,
    addressData,
    setAddressData,
    order,
    setOrder
  }

  return (
    <OrderContext.Provider value={values}>
      {children}
    </OrderContext.Provider>
  )
}

export {
  OrderContext,
  OrderProvider
}