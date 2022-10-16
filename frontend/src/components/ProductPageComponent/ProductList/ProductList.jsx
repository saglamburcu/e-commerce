import "./ProductList.scss";
import ProductCard from "../../HomePageComponents/ProductCard/ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className="product__list">
      {
        products.length > 0 &&
        <div className="product__list__filtered__products">
          <div className="product__list__filtered__products__card">
            {
              products.map(product => {
                const { _id, name, images, reviews, price, rating } = product;

                return (
                  <ProductCard id={_id} name={name} images={images} reviews={reviews} price={price} rating={rating} />
                )
              })
            }
          </div>
        </div>
      }


    </div>
  )
}

export default ProductList;