import { useState, useEffect } from "react";
import "./Slider.scss";
import SliderButton from "../SliderButton/SliderButton";

const Slider = ({img}) => {
  const [position, setPosition] = useState(0);
  let slideInterval;
 
  useEffect(() => {
    autoSlider();

    return () => clearInterval(slideInterval);
  }, [position])

  const showNextImg = () => {
    if (Math.abs(position) !== img.length-1) {
      setPosition((position-1))
    } else {
      setPosition(0)
    }
  }

  const showPrevImg = () => {
    if (position !== 0) {
      setPosition((position+1))
    } else {
      setPosition(-(img.length - 1))
    }
  }

  const autoSlider = () => {
    slideInterval = setInterval(showNextImg, 5000)
  }

  return (
    <div className="slider">
      <div className="slider__items">
        {
          img.map((image, index) => (
            <div key={index} className="slider__items__image" style={{left: `${position*100}%`}}>
              <img src={image.url} alt="" />
            </div>
          ))
        }
      </div>

      <SliderButton 
        showPrevImg={showPrevImg} 
        showNextImg={showNextImg}
      /> 
    </div>
  )
}

export default Slider;