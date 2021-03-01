import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";
import "../../css/Login.css";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    loginDetails: {
      email: "",
      password: "",
    },
    signUpDetails: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    loginAlert: false,
    signUpAlert: false,
  };

  updateLoginDetails = (e) => {
    let loginDetails = this.state.loginDetails;
    let id = e.currentTarget.id;
    loginDetails[id] = e.currentTarget.value;
    this.setState({ loginDetails });
  };

  updateSignUpDetails = (e) => {
    let signUpDetails = this.state.signUpDetails;
    let id = e.currentTarget.id;
    signUpDetails[id] = e.currentTarget.value;
    this.setState({ signUpDetails });
  };

  postLoginDetails = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.loginDetails.email,
        password: this.state.loginDetails.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const token = await response.json();
    if (response.ok) {
      const authorize = await fetch(
        `http://localhost:3001/users/${this.state.loginDetails.email}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token.newAccessToken,
          },
        }
      );
      if (authorize.ok) {
        const userDetails = await authorize.json();
        localStorage["userId"] = userDetails._id;
        localStorage["userEmail"] = this.state.loginDetails.email;
        alert("Log in successful");
        this.setState({
          loginDetails: {
            email: "",
            password: "",
          },
        });
        this.setState({ wishListAlert: true });
        setTimeout(() => {
          this.setState({
            wishListAlert: false,
          });
        }, 1200);
        window.location.href = `http://localhost:3000/`;
      }
    }
  };

  render() {
    return (
      <>
        <Container id="form">
          <h2 className="text-center mb-5">Login to your account</h2>
          <Form>
            <Form.Group>
              <Form.Control
                htmlFor="email"
                type="email"
                id="email"
                value={this.state.loginDetails.email}
                size="md"
                onChange={(e) => this.updateLoginDetails(e)}
                placeholder="Enter Email"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                htmlFor="password"
                type="password"
                id="password"
                value={this.state.loginDetails.password}
                size="md"
                onChange={(e) => this.updateLoginDetails(e)}
                placeholder="Enter Password"
              />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <div className="text-center mt-4 mb-4">
              <Link to="forgotPassword" id="forgot-password-link">
                Forgotten Password ?{" "}
              </Link>
            </div>
            <div className="text-center">
              <button
                id="login-button"
                onClick={(e) => this.postLoginDetails(e)}
              >
                Login
              </button>
            </div>
          </Form>
        </Container>
      </>
    );
  }
}

export default Login;
