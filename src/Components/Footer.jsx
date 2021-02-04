import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Footer.css";
import footerLogo from "../assets/jpslogo3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegistered } from "@fortawesome/free-solid-svg-icons";

class Footer extends Component {
  state = {};
  render() {
    return (
      <>
        <div id="footer-wrapper">
          <div id="footer">
            <Container>
              <Row className="pt-3 pb-3">
                <Col>
                  <div>
                    <h5>How Can We Help ? </h5>
                    <a>Help</a> <br></br>
                    <a>Track my order</a> <br></br>
                    <a>Returns</a> <br></br>
                    <a>Get Exclusive offers and discount</a>
                  </div>
                </Col>
                <Col>
                  <div>
                    <h5>About JohnPaulStephen</h5>
                    <br></br>
                    <img src={footerLogo} id="footer-logo" />
                    <div className="text-center mb-3 mt-3">
                      <FontAwesomeIcon icon={faRegistered}></FontAwesomeIcon>
                      <span className="mx-2">JohnPaulStephen</span>
                      <span>2021</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <h5>Information</h5>
                    <a>Delivery Information</a> <br></br>
                    <a>Terms & Conditions</a> <br></br>
                    <a>Privacy Policy</a> <br></br>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
