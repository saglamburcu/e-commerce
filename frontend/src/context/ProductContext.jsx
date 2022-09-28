import {createContext, useState, useEffect} from "react";
import { fetchAllProduct } from "../api";

const ProductContext = createContext();

const ProductProvider = ({children}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    (async () => {
      const products = await fetchAllProduct();
      setAllProducts(products)
    })();
  }, []);

  const values = {
    allProducts,
    productDetail,
    setProductDetail
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