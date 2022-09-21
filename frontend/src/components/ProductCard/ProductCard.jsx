import "./ProductCard.scss";
import { Link } from "react-router-dom";

const ProductCard = ({id, name, images, reviews, price}) => {
  return (
    <Link to={`/product/${id}`} className="card">
      <div className="card__image">
        <img src={images[0].url} alt="#" />
      </div>
      <div className="card__info">
        <h5>{name}</h5>
        <p>{reviews.length} yorum</p>
        <h4>{price} TL</h4>
      </div>
    </Link>
  )
}

export default ProductCard;