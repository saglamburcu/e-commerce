import { useContext } from "react";
import MyBasket from "../../components/BasketPageComponents/MyBasket/MyBasket"
import { OrderContext } from "../../context/OrderContext";

const Basket = () => {
  const {productsInTheBasket, removeProductFromBasket} = useContext(OrderContext);

  return (
    <MyBasket 
      showBtn={true}
      productsList={productsInTheBasket}
      removeProduct={removeProductFromBasket}
      singleProductButton="Sepetten Çıkar"
      isBasketPage={true}
      isFavoritePage={false}
    />
  )
}

export default Basket;