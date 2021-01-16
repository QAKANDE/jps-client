import React, { Component } from "react";
import hero2 from "../assets/hero2.png";
import "../css/Details.css";
import ProductDetailsCarousel from "../Components/ProductDetailsCarousel";
import { Row, Col, Container, Carousel, CarouselItem } from "react-bootstrap";
import Review from "./Review";

class Details extends Component {
  state = {
    details: {},
    id: "",
  };

  componentDidMount = async () => {
    const productId = this.props.match.params.productId;
    const response = await fetch(`http://localhost:3001/product/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const details = await response.json();
    this.setState({
      details,
      id: productId,
    });
      this.getReviews()
  };

  getReviews = async () => {
    const productId = this.state.id;
    const response = await fetch(`http://localhost:3001/reviews/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const reviews = await response.json();
    this.setState({
      reviews,
    });
    console.log("", this.state.reviews);
  };
  render() {
    return (
      <Container>
        <Row>
          <Col md={4}>
            <div className="view-product">
              <img src={hero2} />
            </div>
            <div>
              <h3 className="mt-5">Similar Products</h3>
              <ProductDetailsCarousel />
            </div>
          </Col>
          <Col sm={8}>
            <div className="product-information">
              <h2>{this.state.details.name}</h2>
              <h2>{this.state.details.description}</h2>
              <img src="images/product-details/rating.png" alt="" />
              <span>
                <span>£{this.state.details.price}</span>
                <button type="button" className="btn btn-fefault cart">
                  <i className="fa fa-shopping-cart"></i>
                  Add to cart
                </button>
              </span>
              <p>
                <b>Availability:</b> In Stock
              </p>
              <p>
                <b>Condition:</b> New
              </p>
              <p>
                <b>Brand:</b> John Paul Stephen
              </p>
              <a href="">
                <img
                  src="images/product-details/share.png"
                  class="share img-responsive"
                  alt=""
                />
              </a>
            </div>
            <Review id={this.state.id} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Details;
