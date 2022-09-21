import Slider from "../../components/Slider/Slider";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.scss";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const Home = () => {
  const {allProducts} = useContext(ProductContext);
  console.log(allProducts)
  return (
    <div className="home">
      <Slider />

      <div className="home__heading">
        <h2>Featured Product</h2>
        <div className="home__heading__cards">
         {
          allProducts && allProducts.map(product => {
              const {_id, name, images, reviews, price} = product;
              return (
                <ProductCard 
                  id={_id}
                  name={name}
                  images={images}
                  reviews={reviews}
                  price={price}
                /> 
              )
          })
         }
        </div>

      </div>
    </div>
  )
}

export default Home;