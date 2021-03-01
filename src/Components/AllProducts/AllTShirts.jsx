import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardDeck,
  Carousel,
  Alert,
} from "react-bootstrap";
import "../../css/Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../css/AllProducts.css";

class AllTShirts extends Component {
  state = {
    accessories: [],
    tShirts: [],
    quantity: 1,
    alert: false,
    errorAlert: false,
    wishListAlert: false,
    wishListErrorAlert: false,
    tShirt: false,
  };

  componentDidMount = async () => {
    this.getTshirts();
    this.getAccessories();
  };

  getTshirts = async () => {
    const response = await fetch("http://localhost:3003/product/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const tShirts = await response.json();
    this.setState({
      tShirts,
    });
  };
  getAccessories = async () => {
    const response = await fetch("http://localhost:3003/accessories/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const accessories = await response.json();
    this.setState({
      accessories,
    });
  };
  addCart = async (
    id,
    productImage,
    productName,
    productSize,
    productColor,
    productPrice
  ) => {
    try {
      if (localStorage["guestToken"]) {
        const productDetails = {
          productId: id,
          quantity: this.state.quantity,
          image: productImage,
          name: productName,
          size: productSize,
          color: productColor,
          price: parseInt(productPrice),
          userId: localStorage["guestToken"],
        };
        let response = await fetch(
          `http://localhost:3003/cart/check-out-as-guest`,
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
            "http://localhost:3003/payment/create-product-price",
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
            this.setState({ alert: true });
            setTimeout(() => {
              this.setState({
                alert: false,
              });
            }, 1200);
          }
        } else {
          this.setState({ errorAlert: true });
          setTimeout(() => {
            this.setState({
              errorAlert: false,
            });
          }, 1200);
        }
      } else if (localStorage["userId"]) {
        const productDetails = {
          productId: id,
          quantity: this.state.quantity,
          image: productImage,
          name: productName,
          size: productSize,
          color: productColor,
          price: parseInt(productPrice),
          userId: localStorage["userId"],
        };
        let response = await fetch(
          `http://localhost:3003/cart/check-out-as-guest`,
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
            "http://localhost:3003/payment/create-product-price",
            {
              method: "POST",
              body: JSON.stringify({
                userId: localStorage["userId"],
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
            this.setState({ alert: true });
            setTimeout(() => {
              this.setState({
                alert: false,
              });
            }, 1200);
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
  addToWishList = async (
    id,
    productImage,
    productName,
    productSize,
    productColor,
    productPrice
  ) => {
    const productDetails = {
      productId: id,
      image: productImage,
      name: productName,
      size: productSize,
      color: productColor,
      price: parseInt(productPrice),
    };
    if (localStorage["userId"]) {
      let response = await fetch(
        `http://localhost:3003/wishlist/${localStorage["userId"]}`,
        {
          method: "POST",
          body: JSON.stringify(productDetails),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      if (response.ok) {
        this.setState({ wishListAlert: true });
        setTimeout(() => {
          this.setState({
            wishListAlert: false,
          });
        }, 1200);
      } else {
        this.setState({ wishListErrorAlert: true });
        setTimeout(() => {
          this.setState({
            wishListErrorAlert: false,
          });
        }, 1200);
      }
    } else if (localStorage["guestToken"]) {
      this.setState({ wishListErrorAlert: true });
      setTimeout(() => {
        this.setState({
          wishListErrorAlert: false,
        });
      }, 1200);
    }
  };
  render() {
    return (
      <>
        <Row className="gutters-sm">
          <Col md={7} className="mb-3">
            <CardDeck>
              {this.state.tShirts.map((prod) => {
                return (
                  <div className="product-image-wrapper col-sm-4">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src={prod.image} alt="" />
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
                            onClick={() =>
                              this.addCart(
                                prod._id,
                                prod.image,
                                prod.name,
                                prod.size,
                                prod.color,
                                prod.price
                              )
                            }
                            className="btn btn-default add-to-cart"
                          >
                            <i className="fa fa-shopping-cart"></i>Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ul>
                        <li
                          onClick={() =>
                            this.addToWishList(
                              prod._id,
                              prod.image,
                              prod.name,
                              prod.size,
                              prod.color,
                              prod.price
                            )
                          }
                          style={{ cursor: "pointer" }}
                          id="add-to-wishlist"
                        >
                          <FontAwesomeIcon icon={faHeart} className="fa-1x" />
                          Add to wishlist
                        </li>
                        <li
                          id="all-products-add-to-wishlist"
                          style={{ listStyle: "none" }}
                        >
                          <Link
                            to={`/details/${prod._id}`}
                            style={{
                              color: "#b3afa8",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faPlusSquare}
                              className="fa-1x"
                            />
                            More details
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </CardDeck>
          </Col>
          <Col md={5}>
            <Carousel>
              {this.state.accessories.map((accessory, key) => {
                return (
                  <Carousel.Item interval={1000}>
                    <img
                      className="d-block"
                      src={accessory.image}
                      alt="First slide"
                      style={{ width: "100%" }}
                    />
                    <Carousel.Caption>
                      <h3 style={{ color: "black" }}>{accessory.name}</h3>
                      <p style={{ color: "black" }}>£ {accessory.price}</p>
                      <button
                        id="all-products-accessory-carousel-button"
                        onClick={() =>
                          this.addCart(
                            accessory._id,
                            accessory.image,
                            accessory.name,
                            accessory.size,
                            accessory.color,
                            accessory.price
                          )
                        }
                      >
                        Add to cart
                      </button>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Col>
        </Row>

        {this.state.alert === true ? (
          <Alert id="alert">Item added to cart</Alert>
        ) : (
          <div></div>
        )}
        {this.state.errorAlert === true ? (
          <Alert id="alert">Unable to add item to cart</Alert>
        ) : (
          <div></div>
        )}
        {this.state.wishListAlert === true ? (
          <Alert id="alert">Item added to wishlist</Alert>
        ) : (
          <div></div>
        )}
        {this.state.wishListErrorAlert === true ? (
          <Alert id="alert">
            Unable to add item to wishlist. Please make sure you are signed in.
          </Alert>
        ) : (
          <div></div>
        )}
      </>
    );
  }
}

export default AllTShirts;
