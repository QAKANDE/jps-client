import React, { Component } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import SignUp from "../Components/SignUp";
import CheckoutasGuest from "../Components/Checkoutasguest";

class Checkout extends Component {
  state = {
    signUpForm: true,
    checkOutAsGuestForm: false,
    backToSignUpText: "black",
    checkOutAsGuestText: "orange",
    backToSignUpTextCursor: "default",
    checkOutAsGuestTextCursor: "pointer",
  };

  displayCheckOutAsGuest = () => {
    this.setState({
      checkOutAsGuestForm: true,
      signUpForm: false,
      backToSignUpText: "orange",
      checkOutAsGuestText: "black",
      backToSignUpTextCursor: "pointer",
      checkOutAsGuestTextCursor: "default",
    });
  };

  displaySignUpForm = () => {
    this.setState({
      signUpForm: true,
      checkOutAsGuestForm: false,
      backToSignUpText: "black",
      checkOutAsGuestText: "orange",
      backToSignUpTextCursor: "default",
      checkOutAsGuestTextCursor: "pointer",
    });
  };
  render() {
    return (
      <>
        <Container style={{ marginTop: "3rem" }}>
          <div className="text-center">
            <h5
              style={{
                color: this.state.backToSignUpText,
                cursor: this.state.backToSignUpTextCursor,
                display: "inline",
              }}
              onClick={() => this.displaySignUpForm()}
            >
              Please register and checkout below to easily get access to your
              order history or{" "}
            </h5>
            <h5
              style={{
                color: this.state.checkOutAsGuestText,
                cursor: this.state.checkOutAsGuestTextCursor,
                display: "inline-block",
              }}
              onClick={() => this.displayCheckOutAsGuest()}
            >
              checkout as guest
            </h5>
          </div>
          {this.state.signUpForm === true ? (
            <div>
              <SignUp />
            </div>
          ) : (
            <div>
              <CheckoutasGuest />
            </div>
          )}
        </Container>
      </>
    );
  }
}

export default Checkout;
