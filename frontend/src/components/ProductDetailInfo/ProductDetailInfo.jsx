import "./ProductDetailInfo.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as fillHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";

const ProductDetailInfo = ({name, price, rating, reviews, stock, description}) => {
  return (
    <div className="info">
      <h2>{name}</h2>
      {rating} ({reviews.length} reviews)
      <h2>{price} TL</h2>
      <div className="info__buttons">
        <button>-</button>
        <span>0</span>
        <button>+</button>
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
      <button className="info__add__basket">Sepete Ekle</button>
      <p className="info__desc">Description: {description}</p>
    </div>
  )
}

export default ProductDetailInfo;