import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";
import "../css/Login.css";

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
        window.location.href = `http://localhost:3002/`;
      }
    }
  };

  postSignUpDetails = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3003/users/register", {
      method: "POST",
      body: JSON.stringify({
        userName: this.state.signUpDetails.name,
        email: this.state.signUpDetails.email,
        phoneNumber: this.state.signUpDetails.phoneNumber,
        password: this.state.signUpDetails.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userDetails = await response.json();

    if (response.ok) {
      alert("Sign up succesfull");
      localStorage["userId"] = userDetails;
      this.setState({
        signUpDetails: {
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
        },
      });
      window.location.href = `http://localhost:3002/`;
    }
  };
  render() {
    return (
      <>
        <Container id="form">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-1">
              <div className="login-form">
                <h2>Login to your account</h2>
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
                  <button
                    id="login-button"
                    onClick={(e) => this.postLoginDetails(e)}
                  >
                    Login
                  </button>
                </Form>
              </div>
            </div>
            <div className="col-sm-1" style={{ marginLeft: "2rem" }}>
              <h2 className="or">OR</h2>
            </div>
            <div className="col-sm-4" style={{ marginLeft: "1rem" }}>
              <div className="signup-form">
                <h2>New User Signup!</h2>
                <Form>
                  <Form.Group>
                    <Form.Control
                      htmlFor="name"
                      type="text"
                      id="name"
                      value={this.state.signUpDetails.name}
                      size="md"
                      onChange={(e) => this.updateSignUpDetails(e)}
                      placeholder="Enter name"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      htmlFor="email"
                      type="email"
                      id="email"
                      value={this.state.signUpDetails.email}
                      size="md"
                      onChange={(e) => this.updateSignUpDetails(e)}
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      htmlFor="phoneNumber"
                      type="text"
                      id="phoneNumber"
                      value={this.state.signUpDetails.phoneNumber}
                      size="md"
                      onChange={(e) => this.updateSignUpDetails(e)}
                      placeholder="Enter phone number"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Control
                      htmlFor="password"
                      type="password"
                      id="password"
                      value={this.state.signUpDetails.password}
                      size="md"
                      onChange={(e) => this.updateSignUpDetails(e)}
                      placeholder="Enter password"
                    />
                  </Form.Group>
                  <button
                    id="signup-button"
                    onClick={(e) => this.postSignUpDetails(e)}
                  >
                    Sign Up
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

export default Login;
