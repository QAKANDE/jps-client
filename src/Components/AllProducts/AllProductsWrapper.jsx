import React, { Component } from "react";
import { Container, Form, Row, Col, Alert } from "react-bootstrap";
import AllTShirts from "./AllTShirts";
import AllAccessories from "./AllAccessories";
import "../../css/AllProducts.css";
import { withLastLocation } from "react-router-last-location";

class AllProductsWrapper extends Component {
  state = {
    productName: "",
    foundProduct: {},
    searchError: false,
    productFound: false,
    noSearchQuery: false,
    sizeForTShirt: "None",
    quantity: 1,
    size: "No size required",
    color: "No color required",
  };
  updateSearch = (event) => {
    this.setState({
      productName: event.target.value,
    });
  };

  searchProduct = async (e) => {
    e.preventDefault();
    if (this.state.productName === "") {
      this.setState({ noSearchQuery: true });
      setTimeout(() => {
        this.setState({
          noSearchQuery: false,
        });
      }, 1200);
    } else {
      const response = await fetch(
        `http://localhost:3003/product/search/${this.state.productName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const product = await response.json();

      if (product.message === "Not Found") {
        this.setState({
          searchError: true,
          productFound: false,
          productName: "",
        });
      } else if (product.length !== 0) {
        product.map((prod) =>
          this.setState({
            foundProduct: prod,
          })
        );
        this.setState({
          productFound: true,
          searchError: false,
          productName: "",
        });
      }
    }
  };
  viewProducts = () => {
    this.setState({ productFound: false, searchError: false });
  };
  getProductsByCategory = async (e) => {
    this.setState({});
  };

  addCart = async (
    id,
    productImage,
    productName,
    productSize,
    productColor,
    productPrice,
    productSizes
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
          sizeFromClient: productSizes,
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
          sizeFromClient: productSizes,
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
  render() {
    return (
      <>
        <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
          <Form style={{ marginBottom: "3.5rem" }}>
            <Row>
              <Col md={10}>
                <Form.Control
                  type="text"
                  placeholder="Search for a specific item"
                  value={this.state.productName}
                  onChange={(e) => this.updateSearch(e)}
                />
              </Col>
              <Col md={2}>
                <button onClick={(e) => this.searchProduct(e)} id="search-btn">
                  Search
                </button>
              </Col>
            </Row>
          </Form>

          {this.state.noSearchQuery === true ? (
            <Alert id="alert">
              <div className="text-center">
                <h5>Please enter item name</h5>
              </div>
            </Alert>
          ) : (
            <div></div>
          )}
          {this.state.productFound === false &&
          this.state.searchError === false ? (
            <div>
              <AllTShirts />
              <AllAccessories />
            </div>
          ) : (
            <div>
              {this.state.searchError === true ? (
                <div
                  className="text-center"
                  style={{ marginTop: "3.3rem", marginBottom: "3.3rem" }}
                >
                  <h5>
                    No item found, please make sure you entered the correct item
                    name
                  </h5>
                </div>
              ) : (
                <div>
                  {this.state.foundProduct.accessory === "Yes" ? (
                    <Row>
                      <Col md={4}>
                        <div className="view-product">
                          <img src={this.state.foundProduct.image} />
                        </div>
                      </Col>
                      <Col sm={8}>
                        <div className="product-information">
                          <h2>{this.state.foundProduct.name}</h2>
                          <p>{this.state.foundProduct.description}</p>
                          <span>
                            <span>£ {this.state.foundProduct.price}</span>
                            <button
                              type="button"
                              className="btn btn-fefault"
                              id="cart"
                              onClick={() =>
                                this.addCart(
                                  this.state.foundProduct._id,
                                  this.state.foundProduct.image,
                                  this.state.foundProduct.name,
                                  this.state.size,
                                  this.state.color,
                                  this.state.foundProduct.price
                                )
                              }
                            >
                              <i className="fa fa-shopping-cart"></i>
                              Add to cart
                            </button>
                          </span>
                          <p>
                            <b>Availability:</b> In Stockkkkk accessory
                          </p>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col md={4}>
                        <div className="view-product">
                          <img src={this.state.foundProduct.image} />
                        </div>
                      </Col>
                      <Col sm={8}>
                        <div className="product-information">
                          <h2>{this.state.foundProduct.name}</h2>
                          <p>{this.state.foundProduct.description}</p>
                          <span>
                            <span>£ {this.state.foundProduct.price}</span>
                            <button
                              type="button"
                              className="btn btn-fefault"
                              id="cart"
                              onClick={() =>
                                this.addCart(
                                  this.state.foundProduct._id,
                                  this.state.foundProduct.image,
                                  this.state.foundProduct.name,
                                  this.state.sizeForTShirt,
                                  this.state.foundProduct.color,
                                  this.state.foundProduct.price,
                                  this.state.foundProduct.sizeAsString
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
                  )}
                </div>
              )}

              <div className="text-center mt-5">
                <button
                  onClick={() => this.viewProducts()}
                  id="view-all-products"
                >
                  View all products
                </button>
              </div>
            </div>
          )}
          {this.state.searchByCategory === true ? <div>dhdh</div> : <div></div>}
        </Container>
      </>
    );
  }
}

export default AllProductsWrapper;
