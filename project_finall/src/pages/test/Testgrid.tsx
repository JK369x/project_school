import * as React from 'react';
import Slider from "react-slick";

export default function testgrid() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>

    </Slider>
  );
}