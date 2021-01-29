import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

class LittleCart extends Component {
  state = {};
  render() {
    return (
      <>
        <div>
          <Row>
            <Col>WE</Col>
            <Col>WE</Col>
            <Col>WE</Col>
          </Row>
          <button onClick={() => this.viewCart()}>View Cart</button>
          <button>Check Out</button>
        </div>
      </>
    );
  }
}

export default LittleCart;
