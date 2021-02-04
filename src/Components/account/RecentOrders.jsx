import React, { Component } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import "../../css/RecentOrders.css";

class RecentOrders extends Component {
  state = {
    recentOrders: [],
    quantity: 1,
    alert: false,
    errorAlert: false,
  };

  componentDidMount = async () => {
    const response = await fetch(
      `http://localhost:3003/users/user-order/${localStorage["userId"]}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const recentOrders = await response.json();
    this.setState({ recentOrders });
  };
  reOrderItem = async (
    id,
    productImage,
    productName,
    productSize,
    productColor,
    productPrice
  ) => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <>
        <Container className="pt-5">
          <h5 className="text-center pb-3">Your recent orders</h5>

          {this.state.recentOrders.length === 0 ? (
            <div>
              <h3>No Recent Orders To Display</h3>
            </div>
          ) : (
            <div>
              {this.state.recentOrders.products.map((product, key) => {
                return (
                  <Row className="gutters-sm" style={{ marginBottom: "2rem" }}>
                    <Col md={4} className="mb-3">
                      <Card>
                        <Card.Body>
                          <div className="d-flex flex-column align-items-center text-center">
                            <img
                              src={product.image}
                              alt="user-picture"
                              class="rounded-circle"
                              width="150"
                            ></img>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={8}>
                      <Card>
                        <Card.Body>
                          <Row style={{ marginTop: "1rem" }}>
                            <Col sm={3}></Col>
                            <Col sm={9}>
                              <h5>{product.name}</h5>
                            </Col>
                          </Row>
                          <hr></hr>

                          <Row style={{ marginTop: "1rem" }}>
                            <Col sm={3}>
                              <h6 class="mb-0">Price</h6>
                            </Col>
                            <Col sm={9}>£ {product.price}</Col>
                          </Row>
                          <Row style={{ marginTop: "1rem" }}>
                            <Col sm={3}>
                              <h6 class="mb-0">Size</h6>
                            </Col>
                            <Col sm={9}>{product.size}</Col>
                          </Row>
                          <Row style={{ marginTop: "1rem" }}>
                            <Col sm={3}>
                              <h6 class="mb-0">Color</h6>
                            </Col>
                            <Col sm={9}>{product.color}</Col>
                          </Row>
                          <hr></hr>
                        </Card.Body>
                        <div
                          className="text-center"
                          style={{
                            marginBottom: "2rem",
                            marginTop: "1rem",
                            width: "20%",
                          }}
                        >
                          <button
                            id="reorder-button"
                            onClick={() =>
                              this.reOrderItem(
                                product._id,
                                product.image,
                                product.name,
                                product.size,
                                product.color,
                                product.price
                              )
                            }
                          >
                            Reorder
                          </button>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                );
              })}
            </div>
          )}
          {this.state.alert === true ? (
            <Alert id="alert">
              <h5 className="text-center">Item Added To Cart</h5>
            </Alert>
          ) : (
            <div></div>
          )}
        </Container>
      </>
    );
  }
}

export default RecentOrders;
