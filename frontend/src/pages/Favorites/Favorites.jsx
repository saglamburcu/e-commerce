import { useContext } from "react";
import MyBasket from "../../components/BasketPageComponents/MyBasket/MyBasket";
import { OrderContext } from "../../context/OrderContext";

const Favorites = () => {
  const {removeProductFromFavorites, favoriteProductsList, addToBasketFromFavorite} = useContext(OrderContext);

  return (
    <MyBasket 
      showBtn={true}
      productsList={favoriteProductsList}
      removeProduct={removeProductFromFavorites}
      singleProductButton="Favorilerimden Çıkar"
      isBasketPage={false}
      isFavoritePage={true}
      addToBasketFromFavorite={addToBasketFromFavorite}
    />
  )
}

export default Favorites;