import {createContext, useState, useEffect} from "react";
import { fetchAllProduct } from "../api";

const ProductContext = createContext();

const ProductProvider = ({children}) => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const products = await fetchAllProduct();
      setAllProducts(products)
    })();
  }, []);

  const values = {
    allProducts
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