import "./ProductDetailInfo.scss";
import { useContext, useState } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { ProductContext } from "../../../context/ProductContext";
import ProductAmountButtons from "../ProductAmountButtons/ProductAmountButtons";

const ProductDetailInfo = () => {
  const { setProductsInTheBasket, setBasketIconNumber } = useContext(OrderContext);
  const { productDetail } = useContext(ProductContext);

  console.log(productDetail)

  const [numberOfProducts, setNumberOfProducts] = useState(0);

  const addToBasket = () => {

    setProductsInTheBasket((prev) => {
      const productIndex = prev.findIndex((item) => item.productInfos._id === productDetail._id);

      if (productIndex !== -1) {
        const newState = [...prev];
        newState[productIndex].count += numberOfProducts;
        return newState;
      }

      return [...prev, { productInfos: productDetail, count: numberOfProducts }];
    })

    setBasketIconNumber(prev => prev + numberOfProducts);
  }

  return (
    <div className="info">
      <h2>{productDetail.name}</h2>
      <span>{productDetail.numOfReviews} değerlendirme</span>
      <h2>{productDetail.price} TL</h2>
      <ProductAmountButtons numberOfProducts={numberOfProducts} setNumberOfProducts={setNumberOfProducts} />
      {
        (productDetail.stock <= 5 && productDetail.stock > 0) && (
          <h4>Son {productDetail.stock} ürün</h4>
        )
      }
      {
        (productDetail.stock === 0) && (
          <h4>Ürün tükendi</h4>
        )
      }

      <button
        type="button"
        className="info__add__basket"
        {...((productDetail.stock === 0 || numberOfProducts === 0) && { disabled: "disabled" })}
        onClick={addToBasket}>
        Sepete Ekle
      </button>
      <p className="info__desc">Açıklama: {productDetail.description}</p>
    </div>
  )
}

export default ProductDetailInfo;