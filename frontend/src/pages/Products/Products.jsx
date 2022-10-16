import "./Products.scss";
import ProductList from "../../components/ProductPageComponent/ProductList/ProductList";
import Categories from "../../components/ProductPageComponent/Categories/Categories";
import Pagination from "../../components/ProductPageComponent/Pagination/Pagination";
import { useState, useContext, useEffect } from "react";
import { fetchAllProduct } from "../../api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Kıyafet");
  const [totalPage, setTotalPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await fetchAllProduct({ category: selectedCategory }, pageNumber);
      setProducts(res.products);
      setTotalPage(Math.ceil(res.productsCount / res.pageLimit));
    })()
  }, [selectedCategory, pageNumber]);

  const changeSelectedCategory = (category) => {
    setSelectedCategory(category);
    setActivePage(0);
    setPageNumber(1);
  }

  return (
    <div className="products">
      <div className="products__categories">
        <Categories changeSelectedCategory={changeSelectedCategory} />
      </div>
      <div className="products__list">
        <ProductList products={products} />
        <Pagination totalPage={totalPage} setPageNumber={setPageNumber} activePage={activePage} setActivePage={setActivePage} />
      </div>
    </div>
  )
}

export default Products;