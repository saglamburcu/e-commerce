import "./MyBasket.scss";
import {useNavigate} from "react-router-dom";

const MyBasket = ({showBtn, productsList, removeProduct, singleProductButton, isBasketPage, isFavoritePage, addToBasketFromFavorite}) => {
  const navigate = useNavigate();

  

  return (
    <div className="mybasket">
      <div className="mybasket__products">
        {
          productsList?.map(product => {
            const {productInfos, count} = product;

            return (
                <div className="mybasket__products__item">
                  <img src={productInfos?.images[0].url} style={{width:"100px"}} alt="" />
                  <h5>{productInfos?.name}</h5>
                  <h3>{count} adet</h3>
                  <h3>{count * productInfos.price} TL</h3>
                  {
                    showBtn && 
                      <button type="button" onClick={() => removeProduct(productInfos._id)}>{singleProductButton}</button>
                  }

                  {
                    isFavoritePage && 
                      <button onClick={() => addToBasketFromFavorite(productInfos._id, productsList)}>Sepete Ekle</button>
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