import { createContext, useState, useEffect } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(JSON.parse(localStorage.getItem("detail")) || null);
  const [productId, setProductId] = useState(localStorage.getItem("id") || "");

  // Search
  const [pageNumber, setPageNumber] = useState(1);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [sendText, setIsSendText] = useState("");

  // Products Categories
  const [selectedCategory, setSelectedCategory] = useState("Köpek Kıyafeti");

  useEffect(() => {
    // (async () => {
    //   const res = await fetchAllProduct();
    //   setAllProducts(res.products);
    // })();
    localStorage.setItem("detail", JSON.stringify(productDetail));
  }, [productDetail]);

  const values = {
    allProducts,
    productDetail,
    setProductDetail,
    setProductId,
    pageNumber,
    setPageNumber,
    searchedProducts,
    setSearchedProducts,
    totalPage,
    setTotalPage,
    selectedCategory,
    setSelectedCategory,
    sendText,
    setIsSendText
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