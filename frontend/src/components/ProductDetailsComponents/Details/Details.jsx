import "./Details.scss";
import { useParams } from "react-router-dom";
import {useEffect} from "react";
import { fetchProductDetails } from "../../../api";
import ProductImages from "../../../components/ProductDetailsComponents/ProductImages/ProductImages";
import ProductDetailInfo from "../../../components/ProductDetailsComponents/ProductDetailInfo/ProductDetailInfo";
import Reviews from "../../../components/ProductDetailsComponents/Reviews/Reviews";
import { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";

const Details = () => {
  const {productDetail, setProductDetail, setProductId} = useContext(ProductContext);
  const {id} = useParams();

  useEffect(() => {
      (async () => {
        const product = await fetchProductDetails(id);
        setProductDetail(product);

        
      })()
  }, [id, setProductDetail]);

  return (
    <>
    <div>
      {
        productDetail && (
          <div className="product__detail">
            <div className="product__detail__center">
              <ProductImages images={productDetail.images}/>
              <ProductDetailInfo />
            </div>
            <div className="product__detail__review">
              <Reviews id={id} />
            </div>
          </div>
        )
      }
    </div>
    </>
  )
}

export default Details;