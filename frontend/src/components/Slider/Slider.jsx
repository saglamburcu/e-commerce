import { useState, useEffect } from "react";
import "./Slider.scss";
import SliderButton from "../SliderButton/SliderButton";

const images = [
  {url: "images/photo2.jpg"},
  {url: "https://www.cdc.gov/healthypets/images/covid/dog-and-cat.jpg?_=46111"},
  {url: "https://idsb.tmgrup.com.tr/ly/uploads/images/2021/11/17/160371.jpg"},
  {url: "https://images.theconversation.com/files/438138/original/file-20211216-25-1hu3e65.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop"}
]

const Slider = () => {
  const [position, setPosition] = useState(0);
  let slideInterval;
 
  useEffect(() => {
    autoSlider();

    return () => clearInterval(slideInterval);
  }, [position])

  const showNextImg = () => {
    if (Math.abs(position) !== images.length-1) {
      setPosition((position-1))
    } else {
      setPosition(0)
    }
  }

  const showPrevImg = () => {
    if (position !== 0) {
      setPosition((position+1))
    } else {
      setPosition(-(images.length - 1))
    }
  }

  const autoSlider = () => {
    slideInterval = setInterval(showNextImg, 5000)
  }

  return (
    <div className="slider">
      <div className="slider__items">
        {
          images.map(image => (
            <div className="slider__items__image" style={{left: `${position*100}%`}}>
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