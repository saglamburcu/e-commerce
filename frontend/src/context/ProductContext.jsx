import {createContext, useState, useEffect} from "react";
import { fetchAllProduct, fetchProductDetails } from "../api";

const ProductContext = createContext();

const ProductProvider = ({children}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(JSON.parse(localStorage.getItem("detail")) || null);
  const [productId, setProductId] = useState(localStorage.getItem("id") || "");

  useEffect(() => {
    (async () => {
      const res = await fetchAllProduct();
      setAllProducts(res.products);
    })();
    localStorage.setItem("detail", JSON.stringify(productDetail))
  }, [productDetail]);

  const values = {
    allProducts,
    productDetail,
    setProductDetail,
    setProductId
  }

  return (
    <ProductContext.Provider value={values}>
      {children}
    </ProductContext.Provider>
  )
}

export {
  ProductContext,
  ProductProvider
}