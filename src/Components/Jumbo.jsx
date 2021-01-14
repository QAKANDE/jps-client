import React, { Component } from 'react';
import "../css/Jumbo.css"
import { Carousel , Container , Jumbotron , Button , Row , Col} from "react-bootstrap"
import hero1 from "../assets/hero1.png"
import hero2 from "../assets/hero2.png"
import hero from "../assets/hero.jpeg"
import video from "../assets/video.mp4"


class Products extends Component {
    state = { 
        carouselProducts : []
     }
    render() { 
        return ( 
       <section class="jumbotron px-5">
  <h1>50% OFF STORE WIDE</h1>
                <p id="stylish">Stylish , Elegant And , <br></br> Affordable </p>
                 <p id="affordable">Top brand product at the best prices</p>
  <a href="#" class="button">SHOP NOW<i class="fa fa-arrow-right mx-3 fa-1x"></i></a>
</section>
       
	
         );

    }
}
 
export default Products;