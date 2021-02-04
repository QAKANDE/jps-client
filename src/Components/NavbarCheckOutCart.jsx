import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";

class NavbarCheckOutCart extends Component {
  state = {
    allCart: {},
    cart: [],
    subTotal: "",
    tax: 30,
    finalTotal: "",
    shippingCost: 50,
    displayCheckOut: false,
    quantity: "",
    itemsLength: "",
    userId: "",
  };

  componentDidMount = async () => {
    this.getCart();
  };
  getCart = async () => {
    const cartt = [];
    const total = [];
    if (!localStorage["userId"]) {
      const response = await fetch(
        `http://localhost:3003/cart/${localStorage["guestToken"]}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const cart = await response.json();
      cart.products.map((product) => {
        cartt.push(product);
        total.push(product.total);
      });
      const subTotal = parseInt(total.reduce((a, b) => a + b, 0));
      const finalTotal = parseInt(
        subTotal + this.state.tax + this.state.shippingCost
      );

      this.setState({
        allCart: cart,
        cart: cartt,
        subTotal,
        finalTotal,
        itemsLength: cart.totalItems,
        userId: cart.userId,
      });
      console.log(this.state.allCart);
    } else if (localStorage["userId"]) {
      const response = await fetch(
        `http://localhost:3003/cart/${localStorage["userId"]}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const cart = await response.json();
      cart.products.map((product) => {
        cartt.push(product);
        total.push(product.total);
      });
      const subTotal = parseInt(total.reduce((a, b) => a + b, 0));
      const finalTotal = parseInt(
        subTotal + this.state.tax + this.state.shippingCost
      );

      this.setState({
        allCart: cart,
        cart: cartt,
        subTotal,
        finalTotal,
        itemsLength: cart.totalItems,
        userId: cart.userId,
      });
      console.log(this.state.allCart);
    }
  };
  increaseQuantity = async (
    id,
    productName,
    productPrice,
    previousQuantity
  ) => {
    const quantity = previousQuantity + 1;
    const productDetails = {
      productId: id,
      quantity: quantity,
      name: productName,
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
            quantity: quantity,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.getCart();
    }
  };

  decreaseQuantity = async (
    id,
    productName,
    productPrice,
    previousQuantity
  ) => {
    if (previousQuantity === 1) {
      alert("Quantity cannot be less than 1");
    } else {
      const quantity = previousQuantity - 1;
      const productDetails = {
        productId: id,
        quantity: quantity,
        name: productName,
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
              quantity: quantity,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.getCart();
      }
    }
  };

  deleteItem = async (user, id) => {
    let response = await fetch(
      `http://localhost:3003/cart/delete-item/${user}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    if (response.ok) {
      this.getCart();
    } else {
      alert("some");
    }
  };
  render() {
    return (
      <>
        <section>
          <Row>
            <Col lg={8}>
              <Card>
                <Card.Body>
                  <Card.Header>{this.state.itemsLength} items</Card.Header>
                  {this.state.cart.map((item, key) => {
                    return (
                      <Row style={{ paddingTop: "2rem" }} key={item._id}>
                        <Col md={5} lg={3} xl={3}>
                          <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                            <img className="img-fluid w-100" src={item.image} />
                          </div>
                        </Col>
                        <Col md={7} lg={9} xl={9}>
                          <div>
                            <div className="d-flex justify-content-between">
                              <div>
                                <h5>{item.name}</h5>
                                <p class="mb-3 text-muted text-uppercase small">
                                  Shirt -{item.color}
                                </p>
                                <p class="mb-2 text-muted text-uppercase small">
                                  Color: {item.size}
                                </p>
                                <p class="mb-3 text-muted text-uppercase small">
                                  Size: {item.color}
                                </p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <button
                                  id="quantity-increase"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginRight: "1rem",
                                  }}
                                  onClick={() =>
                                    this.increaseQuantity(
                                      item.productId,
                                      item.name,
                                      item.price,
                                      item.quantity
                                    )
                                  }
                                >
                                  +
                                </button>
                                <h5>{item.quantity}</h5>
                                <button
                                  id="quantity-decrease"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginLeft: "1rem",
                                  }}
                                  onClick={() =>
                                    this.decreaseQuantity(
                                      item.productId,
                                      item.name,
                                      item.price,
                                      item.quantity
                                    )
                                  }
                                >
                                  -
                                </button>
                              </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                              <div>
                                <p
                                  onClick={() =>
                                    this.deleteItem(
                                      this.state.allCart.userId,
                                      item._id
                                    )
                                  }
                                >
                                  REMOVE ITEM <i class="fa fa-trash"></i>
                                </p>
                              </div>
                              <p class="mb-0">£ {item.price}</p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    );
                  })}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              {/* <CartTotal
                subTotal={this.state.subTotal}
                finalTotal={this.state.finalTotal}
                tax={this.state.tax}
                shippingCost={this.state.shippingCost}
                action={this.displayCheckOut}
                userId={this.state.userId}
              /> */}
            </Col>
          </Row>
        </section>
      </>
    );
  }
}

export default NavbarCheckOutCart;