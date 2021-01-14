import React, { Component } from 'react';
import { Container } from "react-bootstrap"
import "../css/BottomProducts.css"
import hero1 from "../assets/hero1.png"

class BottomProducts extends Component {
    state = { 
        tShirt: true,
        blazers: false,
        tops: false,
        men: false,
        women : false 
    }
    
    getTShirts = () => {
        this.setState({
            tShirt: true,
            blazers: false,
        tops: false,
        men: false,
        women : false
       })
    }

    getBlazers = () => {
          this.setState({
            tShirt: false,
            blazers: true,
        tops: false,
        men: false,
        women : false
       })
    }
    render() { 
        return ( 
            <Container>
                <div className="category-tab">
                   <div class="col-sm-12">
							<ul class="nav nav-tabs">
								<li className="active" onClick={()=> this.getTShirts()}>T-Shirt</li>
								<li onClick={()=> this.getBlazers()}>Blazers</li>
								<li>Sunglass</li>
								<li>Kids</li>
								<li> Polo shirt</li>
							</ul>
                    </div>
                    {this.state.tShirt === true ? 
                    <div className="product-image-wrapper col-sm-3">
								<div className="single-products">
										<div className="productinfo text-center">
											<img src={hero1} alt="" />
                                       <h2>£ </h2>
                                       <p>prod.name</p>
											<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
										</div>
								</div>
								<div className="choose">
									<ul className="nav nav-pills nav-justified">
										<li><a href="#"><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
										<li><a href="#"><i className="fa fa-plus-square"></i>Add to compare</a></li>
									</ul>
								</div>
							</div> : <div> </div>
                    }
                    
                    {this.state.blazers === true ? 
                      <div className="product-image-wrapper col-sm-3">
								<div className="single-products">
										<div className="productinfo text-center">
											<img src={hero1} alt="" />
                                       <h2>£ </h2>
                                       <p>second.name</p>
											<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
										</div>
								</div>
								<div className="choose">
									<ul className="nav nav-pills nav-justified">
										<li><a href="#"><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
										<li><a href="#"><i className="fa fa-plus-square"></i>Add to compare</a></li>
									</ul>
								</div>
							</div> : <div></div>}
                    

                </div>
            </Container>
         );
    }
}
 
export default BottomProducts;