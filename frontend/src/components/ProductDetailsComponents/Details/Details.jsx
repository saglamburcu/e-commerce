import "./Details.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProductDetails } from "../../../api";
import ProductImages from "../../../components/ProductDetailsComponents/ProductImages/ProductImages";
import ProductDetailInfo from "../../../components/ProductDetailsComponents/ProductDetailInfo/ProductDetailInfo";
import Reviews from "../../../components/ProductDetailsComponents/Reviews/Reviews";
import { useContext, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import Footer from "../../Footer/Footer";
import Loading from "../../Loading/Loading";

const Details = () => {
  const { productDetail, setProductDetail, setProductId } = useContext(ProductContext);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const product = await fetchProductDetails(id);
      setProductDetail(product);

      setTimeout(() => {
        setIsLoading(false)
      }, 750)
    })()
  }, [id, setProductDetail]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <div>
        {
          productDetail && (
            <div className="product__detail">
              <div className="product__detail__center">
                <ProductImages images={productDetail.images} />
                <ProductDetailInfo />
              </div>
              <div className="product__detail__review">
                <Reviews id={id} />
              </div>
              <Footer />
            </div>
          )
        }
      </div>
    </>
  )
}

export default Details;