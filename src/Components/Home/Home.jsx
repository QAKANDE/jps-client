import React, { Component } from "react";
import Jumbo from "./Jumbo";
import Products from "./Products";
import Accessories from "./Accessories";
import { Alert, Row, Col, Form, Container } from "react-bootstrap";
import "../../css/Home.css";

class Home extends Component {
  state = {
    guestToken: "",
    itemsLength: "",
    products: [],
    accessories: [],
    quantity: 1,
    alert: false,
    errorAlert: false,
    wishListAlert: false,
    wishListErrorAlert: false,
    tShirtdisplay: false,
    accessoriesDisplay: false,
    displayAll: true,
  };

  getCartLength = (token) => {
    this.setState({
      itemsLength: token,
    });
  };

  componentDidMount = async () => {
    if (!localStorage["userId"]) {
      const guestResponse = await fetch(
        "http://localhost:3003/cart/guest/guest-token",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const guestToken = await guestResponse.json();
      this.setState({
        guestToken,
      });
      localStorage["guestToken"] = this.state.guestToken;
      this.getProducts();
      this.getAccessories();
    } else if (localStorage["userId"]) {
      localStorage.removeItem("guestToken");
    }
    // this.props.action(this.state.itemsLength)
  };

  getProducts = async () => {
    const response = await fetch("http://localhost:3003/product/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const products = await response.json();
    this.setState({
      products,
    });
    console.log("from home", this.state.products);
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
  getProductsByCategory = (e) => {
    if (e.currentTarget.value === "accessories") {
      this.setState({
        accessoriesDisplay: true,
        tShirtdisplay: false,
        displayAll: false,
      });
    } else if (e.currentTarget.value === "t-shirts") {
      this.setState({
        tShirtdisplay: true,
        accessoriesDisplay: false,
        displayAll: false,
      });
    } else if (e.currentTarget.value === "None") {
      this.setState({
        displayAll: true,
        tShirtdisplay: false,
        accessoriesDisplay: false,
      });
    }
  };
  render() {
    return (
      <div>
        <Jumbo />
        <Container>
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
              Unable to add item to wishlist. Please make sure you are signed
              in.
            </Alert>
          ) : (
            <div></div>
          )}
          <Row style={{ marginBottom: "3rem", marginTop: "3rem" }}>
            <Col md={8}>
              <hr></hr>
            </Col>
            <Col md={4}>
              <Form>
                <label for="categories">Search by category</label>
                <select
                  className="mx-3"
                  id="drop-down-form"
                  onChange={(e) => this.getProductsByCategory(e)}
                >
                  <option value="None">All categories</option>
                  <option value="t-shirts">T-shirts</option>
                  <option value="accessories">Accessories</option>
                </select>
              </Form>
            </Col>
          </Row>
          {this.state.displayAll === true ? (
            <div>
              <Products
                secondAction={this.getCartLength}
                productsAsProps={this.state.products}
                addToCartAsProps={(
                  id,
                  productImage,
                  productName,
                  productSize,
                  productColor,
                  productPrice
                ) =>
                  this.addCart(
                    id,
                    productImage,
                    productName,
                    productSize,
                    productColor,
                    productPrice
                  )
                }
                addToWishListAsProps={(
                  id,
                  productImage,
                  productName,
                  productSize,
                  productColor,
                  productPrice
                ) =>
                  this.addToWishList(
                    id,
                    productImage,
                    productName,
                    productSize,
                    productColor,
                    productPrice
                  )
                }
              />
              <Accessories
                accessoriesAsProps={this.state.accessories}
                addToCartAsProps={(
                  id,
                  productImage,
                  productName,
                  productSize,
                  productColor,
                  productPrice
                ) =>
                  this.addCart(
                    id,
                    productImage,
                    productName,
                    productSize,
                    productColor,
                    productPrice
                  )
                }
                addToWishListAsProps={(
                  id,
                  productImage,
                  productName,
                  productSize,
                  productColor,
                  productPrice
                ) =>
                  this.addToWishList(
                    id,
                    productImage,
                    productName,
                    productSize,
                    productColor,
                    productPrice
                  )
                }
              />
            </div>
          ) : (
            <div>
              {this.state.tShirtdisplay === true ? (
                <div>
                  <Products
                    secondAction={this.getCartLength}
                    productsAsProps={this.state.products}
                    addToCartAsProps={(
                      id,
                      productImage,
                      productName,
                      productSize,
                      productColor,
                      productPrice
                    ) =>
                      this.addCart(
                        id,
                        productImage,
                        productName,
                        productSize,
                        productColor,
                        productPrice
                      )
                    }
                    addToWishListAsProps={(
                      id,
                      productImage,
                      productName,
                      productSize,
                      productColor,
                      productPrice
                    ) =>
                      this.addToWishList(
                        id,
                        productImage,
                        productName,
                        productSize,
                        productColor,
                        productPrice
                      )
                    }
                  />
                </div>
              ) : (
                <div>
                  {" "}
                  <Accessories
                    accessoriesAsProps={this.state.accessories}
                    addToCartAsProps={(
                      id,
                      productImage,
                      productName,
                      productSize,
                      productColor,
                      productPrice
                    ) =>
                      this.addCart(
                        id,
                        productImage,
                        productName,
                        productSize,
                        productColor,
                        productPrice
                      )
                    }
                    addToWishListAsProps={(
                      id,
                      productImage,
                      productName,
                      productSize,
                      productColor,
                      productPrice
                    ) =>
                      this.addToWishList(
                        id,
                        productImage,
                        productName,
                        productSize,
                        productColor,
                        productPrice
                      )
                    }
                  />
                </div>
              )}
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default Home;
