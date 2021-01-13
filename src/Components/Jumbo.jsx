import React, { Component } from 'react';
import "../css/Jumbo.css"
import { Carousel , Container , Jumbotron , Button , Row , Col} from "react-bootstrap"
import hero1 from "../assets/hero1.png"
import hero2 from "../assets/hero2.png"
import hero from "../assets/hero.jpeg"


class Products extends Component {
    state = { 
        carouselProducts : []
     }
    render() { 
        return ( 
        <>       
                <Jumbotron>
                    <Row id="jumbo-row">
                        <Col md={4}>
                            <div id="jumbo-text">
                        <h4 className="text-left ">50% OFF STORE WIDE</h4> 
                        <h1 className="text-left ">STYLISH</h1>
                        <h1 className="text-left ">ELEGANT AND , </h1>
                        <h1 className="text-left ">AFFORDABLE</h1>
                        <h4 className="text-left ">Top brand product at the best prices</h4>
                            </div>
                        </Col>
                        <Col md={8}>
                            <Row>
                                <Col>
                                    <img src={hero2} id="image-hero"></img>
                                </Col>
                                  <Col>
                                    <img src={hero1} id="image-hero2"></img>
                                </Col>
                        </Row>
                        </Col>
                    </Row>

</Jumbotron>
        </>
	
         );

    }
}
 
export default Products;