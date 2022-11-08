import "./Search.scss";
import { useState, useContext } from "react";
import { fetchAllProduct } from "../../api";
import ProductList from "../../components/ProductPageComponent/ProductList/ProductList";
import { ProductContext } from "../../context/ProductContext";

const Search = () => {

  const { searchedProducts, sendText } = useContext(ProductContext);

  return (
    <div className="search">
      {
        sendText &&
        <h3 className="search__result">"{sendText.toUpperCase()}" için yapılan arama sonuçları</h3>
      }
      <ProductList products={searchedProducts} />
    </div>
  )
}

export default Search;