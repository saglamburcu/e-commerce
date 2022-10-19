import "./SearchBar.scss";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { fetchAllProduct } from "../../../api";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [sendText, setIsSendText] = useState("");

  const { pageNumber, setSearchedProducts, setTotalPage } = useContext(ProductContext);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await fetchAllProduct({ keyword: sendText }, pageNumber);
      setSearchedProducts(res.products);
      setTotalPage(Math.ceil(res.productsCount / res.pageLimit));
    })()
  }, [sendText, pageNumber]);

  const searchProduct = async (e) => {
    e.preventDefault();
    setSearchText("");
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