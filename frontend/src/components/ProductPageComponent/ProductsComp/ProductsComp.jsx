import "./ProductsComp.scss";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../../context/ProductContext";
import { fetchAllProduct } from "../../../api";
import ProductCard from "../../HomePageComponents/ProductCard/ProductCard";
import Pagination from "../Pagination/Pagination";

const ProductComp = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState("Kıyafet");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await fetchAllProduct("category", categoryValue, pageNumber);
      setFilteredProducts(res.products);
      setTotalPage(res.totalPage);
      setCategories(res.categories);
    })()
  }, [categoryValue, pageNumber]);

  const filteredProductToCategories = async (e) => {
    setCategoryValue(e.target.textContent);
    setPageNumber(1);
    setActivePage(0);
  }

  return (
    <div className="categories">
      <div className="categories__item">
        {
          categories.map(category => (
            <button type="button" onClick={filteredProductToCategories}>{category}</button>
          ))
        }
      </div>

      {
        filteredProducts.length > 0 &&
        <div className="categories__filtered__products">
          <div className="categories__filtered__products__card">
            {
              filteredProducts.map(product => {
                const { _id, name, images, reviews, price, rating } = product;

                return (
                  <ProductCard id={_id} name={name} images={images} reviews={reviews} price={price} rating={rating} />
                )
              })
            }
          </div>

          {
            totalPage !== 0 && (
              <Pagination totalPage={totalPage} setPageNumber={setPageNumber} activePage={activePage} setActivePage={setActivePage} />
            )
          }
        </div>
      }


    </div>
  )
}

export default ProductComp;