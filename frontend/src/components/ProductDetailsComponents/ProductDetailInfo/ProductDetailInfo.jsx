import "./ProductDetailInfo.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as fillHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import RatingStars from "../RatingStars/RatingStars";
import { useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { ProductContext } from "../../../context/ProductContext";
import { useState } from "react";

const ProductDetailInfo = ({name, price, rating, reviews, stock, description}) => {
  const {productDetail} = useContext(ProductContext);
  const {setProductsInTheBasket, setBasketIconNumber} = useContext(OrderContext);

  const [numberOfProducts, setNumberOfProducts] = useState(0);

  const decreaseNumberOfProducts = () => {
    setNumberOfProducts(prev => {
      if(prev !== 0) {
        return prev - 1;
      }
      return 0;
    });
  };

  const increaseNumberOfProducts = () => {
    setNumberOfProducts(prev => prev + 1);
  }

  const addToBasket = () => {
    const infos = {
      productInfos: productDetail,
      count: numberOfProducts
    }
    setProductsInTheBasket(prev => [...prev, {...infos}]);
    setBasketIconNumber(prev => prev + numberOfProducts);
  }

  return (
    <div className="info">
      <h2>{name}</h2>
      <RatingStars /> {rating} ({reviews.length} reviews)
      <h2>{price} TL</h2>
      <div className="info__buttons">
        <button onClick={decreaseNumberOfProducts}>-</button>
        <span>{numberOfProducts}</span>
        <button onClick={increaseNumberOfProducts}>+</button>
      </div>
      {
        stock <= 3 && (
          <h4>Son {stock} ürün</h4>
        )
      }
      <button className="info__favorite__icon">
        <FontAwesomeIcon icon={faHeart} />
        <FontAwesomeIcon icon={fillHeart} />
      </button>
      <button 
        type="button" 
        className="info__add__basket" 
        {...(numberOfProducts === 0 && {disabled: "disabled"})} 
        onClick={addToBasket}>
          Sepete Ekle
      </button>
      <p className="info__desc">Description: {description}</p>
    </div>
  )
}

export default ProductDetailInfo;