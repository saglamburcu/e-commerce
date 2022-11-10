import "./ProductList.scss";
import ProductCard from "../ProductCard/ProductCard";
import { useRef } from "react";

const ProductList = ({ products }) => {
  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // This will be triggered after hitting the last element.
        // API call should be made here while implementing pagination.
      }
    }
  };

  return (
    <div className="product__list">
      {
        products.length > 0 &&
        <div className="product__list__filtered__products">
          <div className="product__list__filtered__products__card" onScroll={onScroll} ref={listInnerRef}>
            {
              products.map(product => {
                const { _id, name, images, reviews, price, rating, stock } = product;

                return (
                  <ProductCard key={_id} id={_id} name={name} images={images} reviews={reviews} price={price} rating={rating} stock={stock} />
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