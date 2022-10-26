import "./RatingStars.scss";
import ReactStars from "react-rating-stars-component";

const RatingStars = ({ props }) => {

  return (
    <div className="stars">
      <ReactStars
        {...props}
      />
    </div>
  )
}

export default RatingStars;