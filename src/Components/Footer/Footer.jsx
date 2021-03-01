import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/Footer.css";
import logoTrademark from "../../assets/logo_trademark.png";
import applePay from "../../assets/apple-pay.png";
import visa from "../../assets/visa.png";
import googleWallet from "../../assets/google_wallet.png";
import amex from "../../assets/amex-logo.png";
import payPal from "../../assets/money.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCCVisa } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class Footer extends Component {
  state = {};
  render() {
    return (
      <>
        <div id="footer-wrapper">
          <div id="footer">
            <Container>
              <Row className="pt-3 pb-3">
                <Col md={4}>
                  <div>
                    <h5>How Can We Help ? </h5>
                    <Link className="footer-link">Help</Link> <br></br>
                    <Link className="footer-link">Track my order</Link>{" "}
                    <br></br>
                    <Link className="footer-link">Returns</Link> <br></br>
                    <Link className="footer-link">
                      Get Exclusive offers and discount
                    </Link>
                  </div>
                </Col>
                <Col md={4}>
                  <div>
                    <h5>Information</h5>
                    <Link className="footer-link">
                      Delivery Information
                    </Link>{" "}
                    <br></br>
                    <Link className="footer-link">Terms & Conditions</Link>{" "}
                    <br></br>
                    <Link className="footer-link">Privacy Policy</Link>{" "}
                    <br></br>
                  </div>
                </Col>
                <Col md={3}>
                  <div>
                    <h5>About Us</h5>
                    <Link to="/aboutus" className="footer-link">
                      About JohnPaulStephen
                    </Link>{" "}
                    <br></br>
                    <Link to="/aboutus" className="footer-link">
                      Our Heritage
                    </Link>{" "}
                    <br></br>
                  </div>
                </Col>
              </Row>
              <hr></hr>
              <div className="text-center">
                <h5 className="mb-3">Shopping is safe with us.</h5>
                <h5 className="mb-3">We accept : </h5>
                <Row>
                  <Col>
                    <img src={applePay}></img>
                  </Col>
                  <Col>
                    <img src={visa}></img>
                  </Col>
                  <Col>
                    <img src={googleWallet}></img>
                  </Col>
                  <Col>
                    <img src={payPal}></img>
                  </Col>
                  <Col>
                    <img src={amex}></img>
                  </Col>
                </Row>
              </div>
              <hr></hr>
              <div className="text-center">
                <img src={logoTrademark} style={{ width: "50%" }} />
              </div>
              <hr></hr>
              <div className="text-center">
                <p>Call us : +448383728292922</p>
                <p>
                  John Paul Stepehen, Stephens road , John Lane, London RT4 2QG
                  - Registered No. 5624245 - UK Vat No. 891 2391 23
                  info@johnpaulstephen.com
                </p>
              </div>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
