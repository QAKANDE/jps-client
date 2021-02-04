import React, { Component } from "react";
import Checkout from "./cart/Checkout";
import NavbarCheckOutCart from "./NavbarCheckOutCart";
import { Container } from "react-bootstrap";

class NavBarCheckout extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Checkout />
        <NavbarCheckOutCart />
      </Container>
    );
  }
}

export default NavBarCheckout;
