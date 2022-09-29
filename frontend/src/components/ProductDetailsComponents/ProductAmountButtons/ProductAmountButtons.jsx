import "./ProductAmountButtons.scss";
import { useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";

const ProductAmountButtons = ({numberOfProducts, setNumberOfProducts}) => {

  const decreaseNumberOfProducts = () => {
    setNumberOfProducts(prev => {
      if(prev !== 0) {
        return prev - 1;
      }
      return 0;
    });
  };

  const increaseNumberOfProducts = () => {
    setNumberOfProducts(prev => prev + 1);
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