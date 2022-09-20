import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import "./SliderButton.scss";

const SliderButton = ({showPrevImg, showNextImg}) => {

  return (
    <div className="slider__buttons">
        <button 
          onClick={() => showPrevImg()}
          >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>    
        <button 
          onClick={() => showNextImg()}
          >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>   
      </div>   
  )
}

export default SliderButton;