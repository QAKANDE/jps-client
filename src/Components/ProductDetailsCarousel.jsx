import React, { Component } from 'react';
import { Carousel, CarouselItem } from "react-bootstrap"
import Reviews from "./Review"
import hero2 from "../assets/hero2.png"


class ProductDetailsCarousel extends Component {
    state = {  }
    render() { 
        return ( 
                              <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={hero2}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={hero2}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={hero2}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
         );
    }
}
 
export default ProductDetailsCarousel;