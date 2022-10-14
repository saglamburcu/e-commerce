import { useContext } from "react";
import ProductCard from "../../components/HomePageComponents/ProductCard/ProductCard";
import { ProductContext } from "../../context/ProductContext";

const Search = () => {
  const { searchedProducts } = useContext(ProductContext);

  return (
    <>
      {
        searchedProducts.length > 0 && (

          searchedProducts.map(product => {
            const { _id, name, images, reviews, price, rating } = product;

            return (
              <ProductCard id={_id} name={name} images={images} reviews={reviews} price={price} rating={rating} />
            )
          })

        )
      }
    </>
  )
}

export default Search;