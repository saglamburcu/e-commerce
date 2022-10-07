import "./Reviews.scss";
import RatingStars from "../RatingStars/RatingStars";
import { fetchCreateProductReview, fetchAllReviews } from "../../../api";
import { useState, useEffect } from "react";

const Reviews = ({id}) => {
  const [review, setReview] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [ratingStarValue, setRatingStarValue] = useState(0);

  useEffect(() => {
    (async() => {
      const reviewList = await fetchAllReviews(id);
      setAllReviews(reviewList);
    })()
  }, [allReviews, id]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetchCreateProductReview(id, review, ratingStarValue);
    setReview("");
  }

  const currentRatingStars = {
    count: 5,
    value: ratingStarValue,
    onChange: (value) => setRatingStarValue(value),
    size: 24,
    isHalf: true,
    emptyIcon: <i className="far fa-star"></i>,
    halfIcon: <i className="fa fa-star-half-alt"></i>,
    fullIcon: <i className="fa fa-star"></i>,
    activeColor: "#ffd700"   
  }

  const allReviewsRatingStars = {
    size: 24,
    edit: false,
    isHalf: true,
    emptyIcon: <i className="far fa-star"></i>,
    halfIcon: <i className="fa fa-star-half-alt"></i>,
    fullIcon: <i className="fa fa-star"></i>,
    activeColor: "#ffd700"   
  }

  return (
    <div className="reviews">
      <div className="reviews__header">
        <h3>Ürün Değerlendirmeleri</h3>
      </div>
      <div className="reviews__user">
        {
          allReviews?.map(reviewItem => (
            <div className="reviews__user__allcomments">
              <p className="reviews__user__allcomments__infos">{reviewItem.name} - {reviewItem.time.split("T")[0]}</p>
              <RatingStars props={{value: reviewItem.rating, ...allReviewsRatingStars}} />
              <p>{reviewItem.comment}</p>
            </div>
          ))
        }
        <div className="reviews__user__rating">
          <p>Puanınız</p>
          <RatingStars props={currentRatingStars}/>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="reviews__user__comment">
          <input type="text" placeholder="Yorum..." value={review} onChange={(e) => setReview(e.target.value)} />
          <button type="submit">Gönder</button>
        </form>
      </div>
    </div>
  )
}

export default Reviews;