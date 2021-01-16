import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Footer.css";
import footerLogo from "../assets/jpslogo3.png";

class Footer extends Component {
  state = {};
  render() {
    return (
      <>
        <div id="footer-wrapper" className="mb-3">
          <div id="footer">
            <Container>
              <Row className="pt-3 pb-3">
                <Col>
                  <div>
                    <i class="fa fa-truck-moving"></i>
                    <h5>Free Shipping</h5>
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div>
                    <h5>Free Returns</h5>
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div>
                    <h5>5 Year Warranty</h5>
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="d-flex justify-content-around">
                    <i className="fa fa-credit-card mt-1 fa-2x"></i>
                    <h5 className="mt-2">Secure payment</h5>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="text-center mb-3 mt-3">
            <img src={footerLogo} id="footer-logo" />
          </div>
          <Container>
            <Row className="pt-3 pb-3">
              <Col>
                <div>
                  <h5>Shipping & Returns</h5>
                </div>
              </Col>
              <Col>
                {" "}
                <div>
                  <h5>Terms Of Service</h5>
                </div>
              </Col>
              <Col>
                {" "}
                <div>
                  <h5>Privacy</h5>
                </div>
              </Col>
              <Col>
                {" "}
                <div>
                  <h5>Shop</h5>
                </div>
              </Col>
            </Row>
            <div className="text-center mb-3 mt-3">
              <i className="fa fa-copyright"></i>
              <span className="mx-2">JohnPaulStephen</span>
              <span>2021</span>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Footer;
