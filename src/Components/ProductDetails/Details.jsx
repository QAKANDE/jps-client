import React, { Component } from "react";
import hero2 from "../../assets/hero2.png";
import "../../css/Details.css";
import ProductDetailsCarousel from "./ProductDetailsCarousel";
import { Row, Col, Container, Carousel, CarouselItem , Form} from "react-bootstrap";
import {addCart} from "../../Helpers/functions"
import Review from "./Review";

class Details extends Component {
  state = {
    details: {},
    id: "",
    quantity: 1,
    alert: false,
    errorAlert: false,
    sizeSelected: "None",
    sizesFromApi : [],
    sizeToBeSent : ""
  };

  componentDidMount = async () => {
    const sizeArr = []
    const productId = this.props.match.params.productId;
    const response = await fetch(`http://localhost:3003/product/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const details = await response.json();
    details.sizes.map((size)=> {
      return sizeArr.push(size)
    })
    this.setState({
      details,
      sizesFromApi: sizeArr,
      id: productId,
      sizeToBeSent: sizeArr.join("")
    });
  
    this.getReviews();
  };
 


  getReviews = async () => {
    const response = await fetch(
      `http://localhost:3003/reviews/${this.props.match.params.productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const reviews = await response.json();
    this.setState({
      reviews,
    });
   
  };
  render() {
    return (
      <Container style={{ marginTop: "2rem", marginBottom: "3rem" }}>
        <Row>
          <Col md={4}>
            <div className="view-product">
              <img src={this.state.details.image} />
            </div>
          </Col>
          <Col sm={8}>
            <div className="product-information">
              <h2>{this.state.details.name}</h2>
              <p>{this.state.details.description}</p>
              <Form>
                     <select
                  className="mt-3 mb-3"
                  id="drop-down-form"
                  onChange={e => this.setState({
                    sizeSelected:e.target.value
                  })}
                >
                  <option value="None">Select size</option>
                  {this.state.sizesFromApi.map((size)=> {
                     return <option value={size}>{size}</option> 
                  })}
                </select>
              </Form>
              <span>
                <span>£ {this.state.details.price}</span>

                <button
                  type="button"
                  className="btn btn-fefault"
                  id="cart"
                  onClick={() =>
                    addCart(
                      this.state.details._id,
                      this.state.quantity,
                      this.state.details.image,
                      this.state.details.name,
                      this.state.sizeSelected,
                      this.state.details.color,
                      this.state.details.price, 
                      this.state.sizeToBeSent
                    )
                  }
                >
                  <i className="fa fa-shopping-cart"></i>
                  Add to cart
                </button>
              </span>
              <p>
                <b>Availability:</b> In Stock
              </p>
            </div>
          </Col>
        </Row>
        <Review id={this.props.match.params.productId} />
      </Container>
    );
  }
}

export default Details;
