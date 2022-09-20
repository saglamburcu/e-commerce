import Slider from "../Slider/Slider";
import "./Home.scss";

const images = [
  {url: "images/photo1.jpg"},
  {url: "images/photo2.jpg"}
]

const Home = () => {
  return (
    <div className="home">
      <Slider />
    </div>
  )
}

export default Home;