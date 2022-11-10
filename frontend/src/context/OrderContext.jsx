import { createContext, useState, useEffect } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [productsInTheBasket, setProductsInTheBasket] = useState(JSON.parse(localStorage.getItem("myBasket")) || []);
  const [basketIconNumber, setBasketIconNumber] = useState(Number(localStorage.getItem("numberOfProductsInTheBasket")) || 0);
  const [addressData, setAddressData] = useState(JSON.parse(localStorage.getItem("orderShippingAddress")) || null);
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem("order")) || null);
  const [favoriteProductsList, setFavoriteProductsList] = useState(JSON.parse(localStorage.getItem("favoriteProducts")) || []);
  const [orderData, setOrderData] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState("");

  useEffect(() => {
    localStorage.setItem("myBasket", JSON.stringify(productsInTheBasket));
    localStorage.setItem("numberOfProductsInTheBasket", basketIconNumber);
    localStorage.setItem("orderShippingAddress", JSON.stringify(addressData));
    localStorage.setItem("order", JSON.stringify(order));
    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProductsList));
  }, [productsInTheBasket, basketIconNumber, addressData, order, favoriteProductsList]);

  const removeProductFromBasket = (productId) => {
    const remainingProducts = productsInTheBasket.filter(product => product.productInfos._id !== productId);
    setProductsInTheBasket(remainingProducts);

    const removeProduct = productsInTheBasket.find(product => product.productInfos._id === productId);
    setBasketIconNumber(prev => prev - (removeProduct.count));
  };

  const removeProductFromFavorites = (id) => {
    const remainingProducts = favoriteProductsList.filter(product => product.productInfos._id !== id);

    setFavoriteProductsList(remainingProducts);
  };

  const addToBasketFromFavorite = (id, productsList) => {
    const addedProduct = productsList.filter(product => product.productInfos._id === id);

    setFavoriteProductsList(productsList.filter(product => product.productInfos._id !== id))

    setProductsInTheBasket((prev) => {
      const productIndex = prev.findIndex(product => product.productInfos._id === id);

      if (productIndex !== -1) {
        const newState = [...prev];
        newState[productIndex].count += 1;

        return newState;
      }
      return [...prev, ...addedProduct]

    })

    setBasketIconNumber(prev => prev + 1)
  };

  const values = {
    productsInTheBasket,
    basketIconNumber,
    setBasketIconNumber,
    addressData,
    setAddressData,
    order,
    setOrder,
    removeProductFromBasket,
    setProductsInTheBasket,
    favoriteProductsList,
    setFavoriteProductsList,
    removeProductFromFavorites,
    addToBasketFromFavorite,
    orderData, setOrderData,
    checkoutStep, setCheckoutStep
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