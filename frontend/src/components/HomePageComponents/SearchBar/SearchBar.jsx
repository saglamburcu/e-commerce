import "./SearchBar.scss";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { fetchAllProduct } from "../../../api";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const { pageNumber, setSearchedProducts, setTotalPage, sendText, setIsSendText, setPageNumber } = useContext(ProductContext);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await fetchAllProduct({ keyword: sendText }, pageNumber);
      setSearchedProducts(pre => [...pre, ...res.products]);
      setTotalPage(Math.ceil(res.productsCount / res.pageLimit));
    })()
  }, [sendText, pageNumber]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;

      if (currentHeight >= scrollHeight - 800) {
        setPageNumber(pageNumber + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll)
  }, [pageNumber]);

  const searchProduct = async (e) => {
    e.preventDefault();
    setSearchText("");
    setSearchedProducts([]);
    setPageNumber(1);
    setIsSendText(searchText);
    navigate("/search");
  }

  return (
    <form className="header__menu__search" onSubmit={searchProduct}>
      <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <button className="header__menu__search__icon" type="submit">
        {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
        Ara
      </button>
    </form>
  )
}

export default SearchBar;