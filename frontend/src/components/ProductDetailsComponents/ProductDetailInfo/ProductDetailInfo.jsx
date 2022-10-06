import "./ProductDetailInfo.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as fillHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import RatingStars from "../RatingStars/RatingStars";
import { useContext, useState } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { ProductContext } from "../../../context/ProductContext";
import ProductAmountButtons from "../ProductAmountButtons/ProductAmountButtons";

const ProductDetailInfo = ({name, price, rating, reviews, stock, description}) => {
  const {productDetail} = useContext(ProductContext);
  const { setProductsInTheBasket, setBasketIconNumber, favoriteProductsList, setFavoriteProductsList} = useContext(OrderContext);

  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const addToBasket = () => {

    setProductsInTheBasket((prev) => {
      const productIndex = prev.findIndex((item) => item.productInfos._id === productDetail._id);
  
      if(productIndex !== -1) {
        const newState = [...prev];
        newState[productIndex].count += numberOfProducts;
        return newState;
      }
  
      return [...prev, {productInfos: productDetail, count: numberOfProducts}];
    })

    setBasketIconNumber(prev => prev + numberOfProducts);
  }

  const changeFavorite = () => {
    setIsFavorite(!isFavorite);

    setFavoriteProductsList(prev => {
      const productIndex = prev.findIndex(product => product._id === productDetail._id);

      if(productIndex !== -1) {
        const newState = prev.filter((_, index) => index !== productIndex);
        return newState;
      }
      return [...prev, {productInfos: productDetail, count: 1}]
    })
  }

  return (
    <div className="info">
      <h2>{name}</h2>
      <RatingStars /> {rating} ({reviews.length} reviews)
      <h2>{price} TL</h2>
      <ProductAmountButtons numberOfProducts={numberOfProducts} setNumberOfProducts={setNumberOfProducts} />
      {
        (stock <= 3 && stock > 0) && (
          <h4>Son {stock} ürün</h4>
        )
      }
      {
        (stock === 0) && (
          <h4>Ürün tükendi</h4>
        )
      }
      <button onClick={changeFavorite} className="info__favorite__icon">
        {
          (favoriteProductsList.filter(product => product.productInfos._id === productDetail._id).length > 0) 
            ? <FontAwesomeIcon icon={fillHeart} /> 
            : <FontAwesomeIcon icon={faHeart} />
        }
      </button>
      <button 
        type="button" 
        className="info__add__basket" 
        {...((stock === 0 || numberOfProducts === 0) && {disabled: "disabled"})} 
        onClick={addToBasket}>
          Sepete Ekle
      </button>
      <p className="info__desc">Description: {description}</p>
    </div>
  )
}

export default ProductDetailInfo;