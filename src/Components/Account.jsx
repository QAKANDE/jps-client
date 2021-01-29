import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import placeholder from "../assets/profile_pic_placeholder.jpg";
import RecentOrders from "./RecentOrders";
import Addaddress from "./Addaddress";
import { Link } from "react-router-dom";
import "../css/Account.css";

class Account extends Component {
  state = {
    userDetails: {},
    userAddress: {},
  };

  componentDidMount = async () => {
    this.getUserDetails();
    this.getUserAddress();
  };

  getUserDetails = async () => {
    const response = await fetch(
      `http://localhost:3003/users/${localStorage["userId"]}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userDetails = await response.json();
    this.setState({ userDetails });
  };

  getUserAddress = async () => {
    const response = await fetch(
      `http://localhost:3003/users/user-address/${localStorage["userId"]}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const userAddress = await response.json();
    this.setState({
      userAddress,
    });
    console.log("state", this.state.userAddress);
  };
  render() {
    return (
      <>
        <Container className="pt-5">
          {JSON.stringify(this.state.userDetails) === "{}" ? (
            <div
              className="text-center"
              style={{ marginTop: "5rem", marginBottom: "5rem" }}
            >
              <h3>
                You Are Not Logged In, Please Login Or Signup{" "}
                <Link to="/login">here</Link>
              </h3>
            </div>
          ) : (
            <div>
              <Row className="gutters-sm">
                <Col md={4} className="mb-3">
                  <Card>
                    <Card.Body>
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="user-picture"
                          class="rounded-circle"
                          width="150"
                        ></img>
                        <div class="mt-3">
                          <h4>{this.state.userDetails.userName}</h4>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                {this.state.userAddress.hasOwnProperty("message") ? (
                  <Col md={8}>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm={3}>
                            <h6 class="mb-0">Full Name</h6>
                          </Col>
                          <Col sm={9}>{this.state.userDetails.userName}</Col>
                        </Row>
                        <hr></hr>
                        <Row>
                          <Col sm={3}>
                            <h6 class="mb-0">Email</h6>
                          </Col>
                          <Col sm={9}>{this.state.userDetails.email}</Col>
                        </Row>
                        <hr></hr>
                        <Row>
                          <Col sm={3}>
                            <h6 class="mb-0">Phone Number</h6>
                          </Col>
                          <Col sm={9}>{this.state.userDetails.phoneNumber}</Col>
                        </Row>
                        <hr></hr>
                      </Card.Body>
                    </Card>
                  </Col>
                ) : (
                  <Col md={8}>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm={3}>
                            <h6 class="mb-0">Full Name</h6>
                          </Col>
                          <Col sm={9}>{this.state.userDetails.userName}</Col>
                        </Row>
                        <hr></hr>
                        <Row>
                          <Col sm={3}>
                            <h6 class="mb-0">Email</h6>
                          </Col>
                          <Col sm={9}>{this.state.userDetails.email}</Col>
                        </Row>
                        <hr></hr>
                        <Row>
                          <Col sm={3}>
                            <h6 class="mb-0">Phone Number</h6>
                          </Col>
                          <Col sm={9}>{this.state.userDetails.phoneNumber}</Col>
                        </Row>
                        <hr></hr>
                        <Row>
                          <Col sm={3}>
                            <h6 class="mb-0">Address Line 1</h6>
                          </Col>
                          <Col sm={9}>
                            {this.state.userAddress.addressLine1}
                          </Col>
                        </Row>
                        <hr></hr>
                        <Row>
                          <Col sm={3}>
                            <h6 class="mb-0">County</h6>
                          </Col>
                          <Col sm={9}>{this.state.userAddress.county}</Col>
                        </Row>
                        <hr></hr>
                        <Row>
                          <Col sm={3}>
                            <h6 class="mb-0">Post Code</h6>
                          </Col>
                          <Col sm={9}>{this.state.userAddress.postCode}</Col>
                        </Row>
                        <hr></hr>
                        <Row>
                          <Col sm={3}>
                            <h6 class="mb-0">Country</h6>
                          </Col>
                          <Col sm={9}>{this.state.userAddress.country}</Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
              </Row>
              {this.state.userAddress.hasOwnProperty("message") ? (
                <div>
                  <Addaddress fireGetAddress={() => this.getUserAddress()} />
                </div>
              ) : (
                <div></div>
              )}
              <RecentOrders />
            </div>
          )}
        </Container>
      </>
    );
  }
}

export default Account;
