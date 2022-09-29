import { createContext, useState, useEffect } from "react";

const OrderContext = createContext();

const OrderProvider = ({children}) => {
  const [productsInTheBasket, setProductsInTheBasket] = useState(JSON.parse(localStorage.getItem("myBasket")) || []);
  const [basketIconNumber, setBasketIconNumber] = useState(Number(localStorage.getItem("numberOfProductsInTheBasket")) || 0);

  useEffect(() => {
    localStorage.setItem("myBasket", JSON.stringify(productsInTheBasket));
    localStorage.setItem("numberOfProductsInTheBasket", basketIconNumber);
  }, [productsInTheBasket, basketIconNumber]);

  const values = {
    productsInTheBasket,
    setProductsInTheBasket,
    basketIconNumber,
    setBasketIconNumber
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