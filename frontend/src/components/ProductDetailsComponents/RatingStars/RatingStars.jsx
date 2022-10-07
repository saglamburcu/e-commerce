import { useState } from "react";
import ReactStars from "react-rating-stars-component";

const RatingStars = ({props}) => {
 
  return (
    <ReactStars
      {...props}
    />
  )
}

export default RatingStars;