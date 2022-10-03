import "./MyBasket.scss";
import {useContext} from "react";
import { OrderContext } from "../../../context/OrderContext";
import {Link} from "react-router-dom";

const MyBasket = () => {
  const {productsInTheBasket, setProductsInTheBasket, setBasketIconNumber} = useContext(OrderContext);

  const removeProductFromBasket = (productId) => {
    const remainingProducts = productsInTheBasket.filter(product => product.productInfos._id !== productId);
    setProductsInTheBasket(remainingProducts);

    const removeProduct = productsInTheBasket.find(product => product.productInfos._id === productId);
    setBasketIconNumber(prev => prev - (removeProduct.count));
  }

  return (
    <div className="mybasket">
      <div className="mybasket__products">
        {
          productsInTheBasket?.map(product => {
            const {productInfos, count} = product;

            return (
                <div className="mybasket__products__item">
                  <img src={productInfos?.images[0].url} style={{width:"100px"}} alt="" />
                  <h5>{productInfos?.name}</h5>
                  <h3>{count} adet</h3>
                  <h3>{count * productInfos.price} TL</h3>
                  <button type="button" onClick={() => removeProductFromBasket(productInfos._id)}>Sepetten Çıkar</button>
                </div>
            )
          })
        }
      </div>

      <div className="mybasket__confirm">
        <Link to="/checkout/shipping-address">
          <button className="mybasket__confirm__button">Sepeti Onayla</button>
        </Link>
      </div>
    </div>
  )
}

export default MyBasket;