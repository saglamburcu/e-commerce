import "./ProductCard.scss";
import "../../ProductDetailsComponents/FavoriteButton/FavoriteButton.scss"
import "../../ProductDetailsComponents/ProductImages/ProductImages.scss"
import { Link } from "react-router-dom";
import RatingStars from "../../ProductDetailsComponents/RatingStars/RatingStars";
import { useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fillHeart } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ id, name, images, reviews, price, rating }) => {
  const { favoriteProductsList } = useContext(OrderContext);

  const productsRatings = {
    key: `rating_${rating}`,
    value: Math.max(0, rating),
    edit: false,
    size: 24,
    isHalf: true,
    emptyIcon: <i className="far fa-star"></i>,
    halfIcon: <i className="fa fa-star-half-alt"></i>,
    fullIcon: <i className="fa fa-star"></i>,
  }

  return (
    <Link to={`/product/${id}`} className="card">
      <div className="card__image">
        <img src={images[0].url} alt="#" />
        <div className="product__images__selected__favoritebutton favorite__icon">
          {
            favoriteProductsList.filter(product => product.productInfos._id === id).length > 0
            && <FontAwesomeIcon icon={fillHeart} />
          }
        </div>
      </div>
      <RatingStars props={productsRatings} />
      <div className="card__info">
        <h4>{name}</h4>
        <p>{reviews.length} yorum</p>
        <h3>{price} TL</h3>
      </div>
    </Link>
  )
}

export default ProductCard;