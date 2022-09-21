import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import { fetchProductDetails } from "../../api";

const ProductDetail = () => {
  const [product, setProduct] = useState({})
  const {id} = useParams();

  useEffect(() => {
    (async () => {
      const productDetail = await fetchProductDetails(id);
      setProduct(productDetail);
    })()
  }, []);

  return (
    <div>
      {
        product && <h1>{product.name}</h1>
      }
    </div>
  )
}

export default ProductDetail;