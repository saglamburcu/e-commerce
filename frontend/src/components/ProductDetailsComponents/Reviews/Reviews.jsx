import "./Reviews.scss";
import RatingStars from "../RatingStars/RatingStars";
import { fetchCreateProductReview } from "../../../api";

const Reviews = ({id}) => {

  const handleSubmit = async (e) => {
    e.preventDefault()
   await fetchCreateProductReview("632aefe622cfd729f0318331", "Merb", 2)

  }

  return (
    <div className="reviews">
      <div className="reviews__header">
        <h3>Ürün Değerlendirmeleri</h3>
      </div>
      <div className="reviews__user">
        <div className="reviews__user__allcomments">
          <p className="reviews__user__allcomments__infos">İsim Soyisim - Tarih</p>
          <RatingStars />
          <p>Çok güzel</p>
        </div>
        <div className="reviews__user__rating">
          <p>Puanınız</p>
          <RatingStars />
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="reviews__user__comment">
          <input type="text" placeholder="Yorum..." />
          <button type="submit">Gönder</button>
        </form>
      </div>
    </div>
  )
}

export default Reviews;