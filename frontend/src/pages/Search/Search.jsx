import { useState, useContext } from "react";
import { fetchAllProduct } from "../../api";
import Pagination from "../../components/ProductPageComponent/Pagination/Pagination";
import ProductList from "../../components/ProductPageComponent/ProductList/ProductList";
import { ProductContext } from "../../context/ProductContext";

const Search = () => {

  const { totalPage, setPageNumber, activePage, setActivePage, searchedProducts } = useContext(ProductContext);

  return (
    <div className="search">
      <ProductList products={searchedProducts} />
      <Pagination totalPage={totalPage} setPageNumber={setPageNumber} activePage={activePage} setActivePage={setActivePage} />
    </div>
  )
}

export default Search;