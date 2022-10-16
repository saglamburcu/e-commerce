import "./Categories.scss";
import { useState, useContext, useEffect } from "react";
import { fetchAllCategories } from "../../../api";

const Categories = ({ changeSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const allCategories = await fetchAllCategories();
      setCategories(allCategories);
    })()
  }, []);


  return (
    <div className="categories">
      {categories.map(category => (
        <button type="button" onClick={(e) => changeSelectedCategory(e.target.textContent)}>{category}</button>
      ))}
    </div>
  )
}

export default Categories;