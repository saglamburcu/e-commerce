import Slider from "../Slider/Slider";
import "./ProductImages.scss";
import { useState } from "react";

const ProductImages = ({images}) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleMouseEnter = (index) => {
    setImageIndex(index);
  };

  return (
    <div className="product__images">
      <div>
        <img className="product__images__selected" src={images[imageIndex].url} alt="" />
      </div>

      <div className="product__images__card">
        {
          images.map((image, index) => (
            <img key={index} onMouseEnter={() => handleMouseEnter(index)} className={index === imageIndex ? "product__images__card__item selected" : "product__images__card__item"}  src={image.url} alt="" />
            ))
          }
      </div>
    </div>
  )
}

export default ProductImages;