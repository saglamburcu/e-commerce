import "./MyBasket.scss";
import { useNavigate, Link } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa";

const MyBasket = ({ showBtn, productsList, removeProduct, singleProductButton, isBasketPage, isFavoritePage, addToBasketFromFavorite }) => {
  const navigate = useNavigate();

  return (
    <div className="mybasket">
      {
        productsList.length ?
          <table className="mybasket__products">
            {
              productsList.map(product => {
                console.log(product)
                return (
                  <tr>
                    <td className="mybasket__products__image">
                      <Link to={product.productInfos ? `/product/${product.productInfos._id}` : `/product/${product.product}`}>
                        <img src={product.productInfos ? product.productInfos.images[0].url : product.image} alt="" />
                      </Link>
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

                    {(showBtn || isFavoritePage) &&
                      <td className="mybasket__products__buttons">
                        {
                          showBtn &&
                          <button type="button" onClick={() => removeProduct(product.productInfos._id)}>{singleProductButton}</button>
                        }

                        {
                          (isFavoritePage && (product.productInfos.stock !== 0)) &&
                          <button onClick={() => addToBasketFromFavorite(product.productInfos._id, productsList)}>Sepete Ekle</button>
                        }
                        {/* 
                        {
                          (isFavoritePage && (product.productInfos.stock === 0)) &&
                          <p>Ürün Tükendi</p>
                        } */}
                      </td>
                    }
                  </tr>
                )
              })
            }
          </table> : <h1>Ürün bulunamadı</h1>
      }

      {
        (isBasketPage && productsList.length) ? (
          <div className="mybasket__confirm">
            <button className="mybasket__confirm__button" onClick={() => navigate("/checkout/shipping-address")}>
              <FaRegThumbsUp className="mybasket__confirm__button__paw" />
              Sepeti Onayla
            </button>
          </div>
        ) : ""
      }
    </div >
  )
}

export default MyBasket;