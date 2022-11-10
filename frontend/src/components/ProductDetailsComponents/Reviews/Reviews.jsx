import "./Reviews.scss";
import RatingStars from "../RatingStars/RatingStars";
import { fetchCreateProductReview, fetchAllReviews, fetchDeleteProductReview } from "../../../api";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const Reviews = ({ id }) => {
  const [review, setReview] = useState("");
  const [sendReview, setSendReview] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [ratingStarValue, setRatingStarValue] = useState(0);

  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const reviewList = await fetchAllReviews(id);
      setAllReviews(reviewList);
    })()
  }, [id, sendReview]); // ?

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userReview = await fetchCreateProductReview(id, review, ratingStarValue);
    setSendReview(userReview);
    setReview("");
    setRatingStarValue(0);
  }

  const currentRatingStars = {
    key: `rating_${ratingStarValue}`,
    count: 5,
    value: Math.max(0, ratingStarValue),
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
          allReviews?.map((reviewItem, index) => (
            <div key={index} className="reviews__user__allcomments">
              <p className="reviews__user__allcomments__infos">{reviewItem.name} - {reviewItem.time.split("T")[0]}</p>
              <RatingStars props={{ key: `rating_${reviewItem.rating}`, value: Math.max(0, reviewItem.rating), ...allReviewsRatingStars }} />
              <p>{reviewItem.comment}</p>
            </div>
          ))
        }
        {
          userInfo &&
          <>
            <div className="reviews__user__rating">
              <p>Puanınız</p>
              <RatingStars props={currentRatingStars} />
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="reviews__user__comment">
              <textarea placeholder="Yorum..." value={review} onChange={(e) => setReview(e.target.value)} />
              <button type="submit">Gönder</button>
            </form>
          </>
        }
      </div>
    </div>
  )
}

export default Reviews;