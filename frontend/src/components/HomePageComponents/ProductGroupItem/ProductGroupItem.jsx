import "./ProductGroupItem.scss";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductContext } from "../../../context/ProductContext";

const ProductGroupItem = ({ productGroups }) => {
  const { setSelectedCategory } = useContext(ProductContext);

  const showProducts = (groupIndex) => {
    setSelectedCategory(productGroups[groupIndex].category);
  }

  return (
    <>
      {
        productGroups.map((group, index) => (
          <li key={index} className="product__group__item">
            <NavLink to="/products" className="product__group__item__link" onClick={() => showProducts(index)} >
              <img src={group.image} alt="" />
              <div>
                {group.category}
              </div>
            </NavLink>
          </li>
        ))
      }
    </>
  )
}

export default ProductGroupItem;