import React, { Component } from "react";
import Jumbo from "./Jumbo";
import Products from "./Products";
import Accessories from "./Accessories";
import { Alert } from "react-bootstrap";

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
    tShirt: false,
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
  render() {
    return (
      <div>
        <Jumbo />
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
    );
  }
}

export default Home;
