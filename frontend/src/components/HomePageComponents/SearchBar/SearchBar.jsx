import "./SearchBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { fetchAllProduct } from "../../../api";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const { searchedProducts, setSearchedProducts } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [queryValue, setQueryValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await fetchAllProduct("keyword", queryValue, pageNumber);
      setSearchedProducts(res.products);
      setTotalPage(res.totalPage);
      setCategories(res.categories);
    })()
  }, [queryValue, pageNumber]);

  const searchValue = async (e) => {
    e.preventDefault();

    setQueryValue(searchText);
    setPageNumber(1);
    setActivePage(0);

    navigate("/search");
  }

  return (
    <form className="header__menu__search" onSubmit={searchValue}>
      <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <button className="header__menu__search__icon" type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="header__menu__icons__search__item" />
      </button>
    </form>
  )
}

export default SearchBar;