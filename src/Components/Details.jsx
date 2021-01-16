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
    quantity: 1,
    alert: false,
    errorAlert: false,
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
    this.getReviews();
  };

  addCart = async (id, productName, productPrice) => {
    try {
      if (!localStorage["userId"]) {
        const productDetails = {
          productId: id,
          quantity: this.state.quantity,
          name: productName,
          price: parseInt(productPrice),
          userId: localStorage["guestToken"],
        };
        let response = await fetch(
          `http://localhost:3001/cart/check-out-as-guest`,
          {
            method: "POST",
            body: JSON.stringify(productDetails),
            headers: {
              "Content-Type": "Application/json",
            },
          }
        );
        if (response.ok) {
          alert("success");
          const response = await fetch(
            `http://localhost:3001/cart/${localStorage["guestToken"]}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          const cart = await response.json();
          this.props.secondAction(cart.totalItems);
          // this.setState({ alert: true })
          // setTimeout(() => {
          //     this.setState({
          //         alert: false
          //     });
          // }, 1200);
        } else {
          this.setState({ errorAlert: true });
          setTimeout(() => {
            this.setState({
              errorAlert: false,
            });
          }, 1200);
        }
      }
    } catch (err) {
      console.log(err);
    }
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
                <button
                  type="button"
                  className="btn btn-fefault"
                  id="cart"
                  onClick={() =>
                    this.addCart(
                      this.state.details.productId,
                      this.state.details.name,
                      this.state.details.price
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
