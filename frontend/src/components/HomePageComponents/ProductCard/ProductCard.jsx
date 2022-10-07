import "./ProductCard.scss";
import { Link } from "react-router-dom";
import RatingStars from "../../ProductDetailsComponents/RatingStars/RatingStars";
import FavoriteButton from "../../ProductDetailsComponents/FavoriteButton/FavoriteButton";
import { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { OrderContext } from "../../../context/OrderContext";

const ProductCard = ({id, name, images, reviews, price, rating}) => {
  const {allProducts} = useContext(ProductContext);
  const {favoriteProductsList, setFavoriteProductsList} = useContext(OrderContext);

  return (
    <Link to={`/product/${id}`} className="card">
      <div className="card__image">
        <img src={images[0].url} alt="#" />
        <div className="card__image__favoritebutton">
          {
            favoriteProductsList.map(product => {
              if(product.productInfos._id === id) {
                return <FavoriteButton />
              }
            })
          }
        </div>
      </div>
      <RatingStars props={{value: rating, edit: false, size: 24}}/>
      <div className="card__info">
        <h5>{name}</h5>
        <p>{reviews.length} yorum</p>
        <h4>{price} TL</h4>
      </div>
    </Link>
  )
}

export default ProductCard;