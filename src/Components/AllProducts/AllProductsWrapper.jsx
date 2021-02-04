import React, { Component } from "react";
import { Container } from "react-bootstrap";
import AllTShirts from "./AllTShirts";
import AllAccessories from "./AllAccessories";

class AllProductsWrapper extends Component {
  state = {};
  render() {
    return (
      <>
        <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
          <AllTShirts />
          <AllAccessories />
        </Container>
      </>
    );
  }
}

export default AllProductsWrapper;
