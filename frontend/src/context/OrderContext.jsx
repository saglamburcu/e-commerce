import { createContext, useState } from "react";

const OrderContext = createContext();

const OrderProvider = ({children}) => {
  const [productsInTheBasket, setProductsInTheBasket] = useState([]);
  const [basketIconNumber, setBasketIconNumber] = useState(0);

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