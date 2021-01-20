import React, { Component } from "react";
import "../css/Products.css";
import {
  Row,
  Col,
  Container,
  CardDeck,
  Card,
  Accordion,
  Button,
} from "react-bootstrap";
import hero2 from "../assets/product1.jpeg";
import BottomProducts from "../Components/BottomProducts";
import { Link } from "react-router-dom";

class Products extends Component {
  state = {
    products: [],
    quantity: 1,
    alert: false,
    errorAlert: false,
  };

  componentDidMount = async () => {
    const response = await fetch("http://localhost:3001/product/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const products = await response.json();
    this.setState({
      products,
    });
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
          const createPriceResponse = await fetch(
            "http://localhost:3001/payment/create-product-price",
            {
              method: "POST",
              body: JSON.stringify({
                userId: localStorage["guestToken"],
                productName: productName,
                productPrice: parseInt(productPrice * 100),
                productId: id,
                quantity: this.state.quantity,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (createPriceResponse.ok) {
            alert("success");
          }
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
  render() {
    return (
      <Container>
        <Row>
          <Col md={3}>
            <div id="category-text">
              <h2>Category</h2>
            </div>
            <div>
              <div id="category">
                <ul>
                  <li className="category-anchor">
                    <a>MEN</a>
                  </li>
                  <li className="category-anchor">
                    <a>WOMEN</a>
                  </li>
                  <li className="category-anchor">
                    <a>KIDS</a>
                  </li>
                  <li className="category-anchor">
                    <a>SPORTSWEAR</a>
                  </li>
                  <li className="category-anchor">
                    <a>MEN</a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={9}>
            <div id="featured-text">
              <h2>Featured Items</h2>
            </div>

            <CardDeck>
              {this.state.products.map((prod) => {
                return (
                  <div className="product-image-wrapper col-sm-4">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src={hero2} alt="" />
                        <h2>£ {prod.price}</h2>
                        <p>{prod.name}</p>
                        <a href="#" className="btn btn-default add-to-cart">
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </a>
                      </div>
                      <div className="product-overlay">
                        <div className="overlay-content">
                          <h2>£ {prod.price}</h2>
                          <p>{prod.name}</p>
                          <button
                            href="#"
                            onClick={() =>
                              this.addCart(prod._id, prod.name, prod.price)
                            }
                            className="btn btn-default add-to-cart"
                          >
                            <i className="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="choose">
                      <ul className="nav nav-pills nav-justified">
                        <li>
                          <a href="#">
                            <i className="fa fa-plus-square"></i>Add to wishlist
                          </a>
                        </li>
                        <li>
                          <Link to={`/details/${prod._id}`}>
                            <i className="fa fa-plus-square"></i>More details
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </CardDeck>
            {/* <BottomProducts /> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Products;
