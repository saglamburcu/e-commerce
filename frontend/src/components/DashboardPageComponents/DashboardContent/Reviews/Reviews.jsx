import "./Reviews.scss";
import { useState, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { fetchAllReviews, fetchDeleteProductReview } from "../../../../api";

const Reviews = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [productId, setProductId] = useState("");
  const [searchProductId, setSearchProductId] = useState("");
  const [deletedReviewId, setDeletedReviewId] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetchAllReviews(productId);

      if (res) {
        setAllReviews(res);
      } else {
        setAllReviews([]);
      }

    })();
  }, [searchProductId, deletedReviewId])

  const searchReviews = async (e) => {
    e.preventDefault();
    setSearchProductId(productId);
  }

  const deleteReview = async (reviewId) => {
    await fetchDeleteProductReview(productId, reviewId);
    setDeletedReviewId(reviewId);
  }

  return (
    <div className="all__reviews">
      <div className="all__reviews__query">
        <form onSubmit={searchReviews}>
          <input
            type="text"
            placeholder="Ürün ID giriniz"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button type="submit">Ara</button>
        </form>
      </div>

      {
        allReviews.length ?
          <div className="all__reviews__result">
            <table className="all__reviews__result__list">
              <tr>
                <th>Yorum ID</th>
                <th>Kullanıcı</th>
                <th>Yorum</th>
                <th>Puan</th>
                <th>Yorumu Sil</th>
              </tr>

              {
                allReviews.map(review => {
                  const { _id, name, comment, rating } = review;

                  return (
                    <tr>
                      <td>{_id}</td>
                      <td>{name}</td>
                      <td>{comment}</td>
                      <td>{rating}</td>
                      <td>
                        <button onClick={() => deleteReview(_id)}>
                          <RiDeleteBin5Fill />
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </table>
          </div> :
          <p>
            Yorum Bulunamadı
          </p>
      }
    </div>
  )
};

export default Reviews;