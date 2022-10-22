import Slider from "../../components/Slider/Slider";
import ProductCard from "../../components/ProductPageComponent/ProductCard/ProductCard";
import "./Home.scss";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductGroups from "../../components/HomePageComponents/ProductGroups/ProductGroups";
import Footer from "../../components/Footer/Footer";

const imagesData = [
  { url: "/images/img1.jpg" },
  { url: "/images/img2.jpg" },
  { url: "/images/img3.jpg" },
  { url: "/images/img4.jpg" },
]

const Home = () => {

  return (
    <>
      <div className="home">
        <Slider img={imagesData} />
        <ProductGroups />
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default Home;