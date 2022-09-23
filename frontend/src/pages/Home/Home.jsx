import Slider from "../../components/Slider/Slider";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.scss";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import Header from "../../components/Header/Header";

const imagesData = [
  {url: "images/photo2.jpg"},
  {url: "https://www.cdc.gov/healthypets/images/covid/dog-and-cat.jpg?_=46111"},
  {url: "https://idsb.tmgrup.com.tr/ly/uploads/images/2021/11/17/160371.jpg"},
  {url: "https://images.theconversation.com/files/438138/original/file-20211216-25-1hu3e65.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop"}
]

const Home = () => {
  const {allProducts} = useContext(ProductContext);
  console.log(allProducts)
  return (
    <>
    <Header />
    <div className="home">
      <Slider img={imagesData}/>

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
    </>
  )
}

export default Home;