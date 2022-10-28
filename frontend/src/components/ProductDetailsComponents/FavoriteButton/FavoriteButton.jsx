import "./FavoriteButton.scss";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fillHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { OrderContext } from "../../../context/OrderContext";
import { ProductContext } from "../../../context/ProductContext";

const FavoriteButton = () => {
  const { favoriteProductsList, setFavoriteProductsList } = useContext(OrderContext);
  const { productDetail } = useContext(ProductContext);

  const changeFavorite = () => {

    setFavoriteProductsList(prev => {
      if (prev.filter(product => product.productInfos._id === productDetail._id).length > 0) {
        const newState = prev.filter(product => product.productInfos._id !== productDetail._id);
        return newState;
      }

      return [...prev, { productInfos: productDetail, count: 1 }]
    })
  }

  return (
    <button onClick={changeFavorite} className="favorite__icon">
      {
        (favoriteProductsList.filter(product => product.productInfos._id === productDetail._id).length > 0)
          ? <FontAwesomeIcon icon={fillHeart} />
          : <FontAwesomeIcon icon={faHeart} />
      }
    </button>
  )
}

export default FavoriteButton;