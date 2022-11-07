import "./ProductAmountButtons.scss";
import { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";

const ProductAmountButtons = ({ numberOfProducts, setNumberOfProducts }) => {
  const { productDetail } = useContext(ProductContext);

  const decreaseNumberOfProducts = () => {
    setNumberOfProducts(prev => {
      if (prev !== 0) {
        return prev - 1;
      }
      return 0;
    });
  };

  const increaseNumberOfProducts = () => {
    setNumberOfProducts(prev => {
      if (prev !== productDetail.stock) {
        return prev + 1;
      }
      return prev;
    });
  }

  return (
    <div className="info__buttons">
      <button onClick={decreaseNumberOfProducts}>-</button>
      <span>{numberOfProducts}</span>
      <button onClick={increaseNumberOfProducts}>+</button>
    </div>
  )
}

export default ProductAmountButtons;