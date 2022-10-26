import "./MyBasket.scss";
import { useNavigate } from "react-router-dom";

const MyBasket = ({ showBtn, productsList, removeProduct, singleProductButton, isBasketPage, isFavoritePage, isOrderConfirm, addToBasketFromFavorite }) => {
  const navigate = useNavigate();

  return (
    <div className="mybasket">
      <table className="mybasket__products">
        {
          productsList?.map(product => {

            return (
              <tr>
                <td className="mybasket__products__image">
                  <img src={product.productInfos ? product.productInfos.images[0].url : product.image} alt="" />
                </td>
                <td className="mybasket__products__name">
                  <h5>{product.productInfos ? product.productInfos.name : product.name}</h5>
                </td>
                <td className="mybasket__products__quantity">
                  <h3>{product.count ? product.count : product.quantity} adet</h3>
                </td>
                <td className="mybasket__products__price">
                  <h3>{product.count ? product?.count * product.productInfos?.price : product.quantity * product.price} TL</h3>
                </td>
                <td className="mybasket__products__buttons">
                  {
                    showBtn &&
                    <button type="button" onClick={() => removeProduct(product.productInfos._id)}>{singleProductButton}</button>
                  }

                  {
                    isFavoritePage &&
                    <button onClick={() => addToBasketFromFavorite(product.productInfos._id, productsList)}>Sepete Ekle</button>
                  }
                </td>
              </tr>
            )
          })
        }
      </table>


      {
        isBasketPage && (
          <div className="mybasket__confirm">
            <button className="mybasket__confirm__button" onClick={() => navigate("/checkout/shipping-address")}>Sepeti Onayla</button>
          </div>
        )
      }
    </div >
  )
}

export default MyBasket;