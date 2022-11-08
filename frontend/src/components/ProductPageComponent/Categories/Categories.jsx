import "./Categories.scss";
import { useState, useContext, useEffect } from "react";
import { fetchAllCategories } from "../../../api";
import { ProductContext } from "../../../context/ProductContext";

const Categories = ({ changeSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const { selectedCategory } = useContext(ProductContext);

  useEffect(() => {
    (async () => {
      const allCategories = await fetchAllCategories();
      setCategories(allCategories);
    })()
  }, []);


  return (
    <div className="categories">
      {categories.map(category => (
        <button
          type="button"
          onClick={(e) => changeSelectedCategory(e.target.textContent)}
          className={category === selectedCategory ? "selectedCategory" : ""}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default Categories;