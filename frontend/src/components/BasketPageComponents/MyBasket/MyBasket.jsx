import "./MyBasket.scss";
import {useNavigate} from "react-router-dom";

const MyBasket = ({showBtn, productsList, removeProduct, singleProductButton, isBasketPage, isFavoritePage, isOrderConfirm, addToBasketFromFavorite}) => {
  const navigate = useNavigate();

  return (
    <div className="mybasket">
      <div className="mybasket__products">
        {
          productsList?.map(product => {

            return (
                <div className="mybasket__products__item">
                  <img src={product.productInfos ? product.productInfos.images[0].url : product.image} style={{width:"100px"}} alt="" />
                  <h5>{product.productInfos ? product.productInfos.name : product.name}</h5>
                  <h3>{product.count ? product.count : product.quantity} adet</h3>
                  <h3>{product.count ? product?.count * product.productInfos?.price : product.quantity * product.price} TL</h3>
                  {
                    showBtn && 
                      <button type="button" onClick={() => removeProduct(product.productInfos._id)}>{singleProductButton}</button>
                  }

                  {
                    isFavoritePage && 
                      <button onClick={() => addToBasketFromFavorite(product.productInfos._id, productsList)}>Sepete Ekle</button>
                  }
                </div>
            )
          })
        }
      </div>

      {
        isBasketPage && (
          <div className="mybasket__confirm">
            <button className="mybasket__confirm__button" onClick={() => navigate("/checkout/shipping-address")}>Sepeti Onayla</button>
          </div>
        )
      }
    </div>
  )
}

export default MyBasket;