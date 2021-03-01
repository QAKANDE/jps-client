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
                              this.state.foundProduct.productId,
                              this.state.foundProduct.name,
                              this.state.foundProduct.price
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
