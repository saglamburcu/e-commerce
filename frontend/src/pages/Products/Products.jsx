import "./Products.scss";
import ProductList from "../../components/ProductPageComponent/ProductList/ProductList";
import Categories from "../../components/ProductPageComponent/Categories/Categories";
import { useState, useContext, useEffect } from "react";
import { fetchAllProduct } from "../../api";
import { ProductContext } from "../../context/ProductContext";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";

const Products = () => {
  const [totalPage, setTotalPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { selectedCategory, setSelectedCategory } = useContext(ProductContext);

  useEffect(() => {
    (async () => {
      const res = await fetchAllProduct({ category: selectedCategory }, pageNumber);
      setProducts(pre => [...pre, ...res.products]);
      setTotalPage(Math.ceil(res.productsCount / res.pageLimit));

      setTimeout(() => {
        setIsLoading(false)
      }, 750)
      // setIsLoading(false)
    })()
  }, [selectedCategory, pageNumber]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;

      console.log("scrollHeight", scrollHeight)
      console.log("currentHeight", currentHeight)

      if (currentHeight >= scrollHeight - 800) {
        setPageNumber(pageNumber + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll)
  }, [pageNumber]);

  const changeSelectedCategory = (category) => {
    setSelectedCategory(category);
    setProducts([])
    setPageNumber(1);
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <div className="products">
        <div className="products__categories">
          <Categories changeSelectedCategory={changeSelectedCategory} />
        </div>
        <div className="products__list">
          <ProductList products={products} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Products;