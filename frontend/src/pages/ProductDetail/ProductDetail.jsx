import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import { fetchProductDetails } from "../../api";
import ProductImages from "../../components/ProductDetailsComponents/ProductImages/ProductImages";
import ProductDetailInfo from "../../components/ProductDetailsComponents/ProductDetailInfo/ProductDetailInfo";
import Reviews from "../../components/ProductDetailsComponents/Reviews/Reviews";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    (async () => {
      const productDetail = await fetchProductDetails(id);
      setProduct(productDetail);
    })()
  }, []);

  return (
    <>
    <div>
      {
        product && (
          <div className="product__detail">
            <div className="product__detail__center">
              <ProductImages images={product.images}/>
              <ProductDetailInfo 
                name={product.name}
                price={product.price}
                rating={product.rating}
                reviews={product.reviews}
                stock={product.stock}
                description={product.description}
              />
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

export default ProductDetail;