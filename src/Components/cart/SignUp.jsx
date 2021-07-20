import React, { Component } from 'react'
import { Form, Container, Row, Col, Alert } from 'react-bootstrap'
import CheckoutasGuest from './Checkoutasguest'
import '../../css/Signup.css'
class SignUp extends Component {
  state = {
    details: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
    alert: false,
    errorAlert: false,
    displayCheckOut: false,
    signUpcompleted: false,
  }

  updateDetails = (event) => {
    let details = this.state.details
    let id = event.currentTarget.id
    details[id] = event.currentTarget.value
    this.setState({
      details,
    })
  }

  signUp = async (e) => {
    e.preventDefault()
    if (localStorage['userId']) {
      const res = await fetch(
        'https://mr-oyebode-backend-yqavh.ondigitalocean.app/users/register',
        {
          method: 'POST',
          body: JSON.stringify({
            userName: this.state.details.name,
            email: this.state.details.email,
            phoneNumber: this.state.details.phoneNumber,
            password: this.state.details.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (res.status !== 400) {
        this.setState({
          alert: true,
        })
        setTimeout(() => {
          this.setState({
            alert: false,
            displayCheckOut: true,
            signUpcompleted: true,
          })
        }, 1200)
      } else if (res.status === 400) {
        this.setState({
          errorAlert: true,
        })
        setTimeout(() => {
          this.setState({
            errorAlert: false,
          })
        }, 1200)
      }
    } else if (localStorage['guestToken']) {
      const res = await fetch(
        `https://mr-oyebode-backend-yqavh.ondigitalocean.app/users/guest-token-already-exists/${localStorage['guestToken']}`,
        {
          method: 'POST',
          body: JSON.stringify({
            userName: this.state.details.name,
            email: this.state.details.email,
            phoneNumber: this.state.details.phoneNumber,
            password: this.state.details.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.status !== 400) {
        this.setState({
          alert: true,
        })
        setTimeout(() => {
          this.setState({
            alert: false,
            displayCheckOut: true,
            signUpcompleted: true,
          })
        }, 1200)
      } else if (res.status === 400) {
        this.setState({
          errorAlert: true,
        })
        setTimeout(() => {
          this.setState({
            errorAlert: false,
          })
        }, 1200)
      }
    }
  }
  render() {
    return (
      <>
        {this.state.displayCheckOut === false ? (
          <div>
            <Form className="mt-3">
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="firstName">Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ex. John"
                      id="name"
                      onChange={(e) => this.updateDetails(e)}
                      value={this.state.details.name}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                      placeholder="Ex: abcd@abc.com"
                      type="email"
                      id="email"
                      onChange={(e) => this.updateDetails(e)}
                      value={this.state.details.email}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
                    <Form.Control
                      placeholder="Ex: 070 0000 8000"
                      id="phoneNumber"
                      type="text"
                      onChange={(e) => this.updateDetails(e)}
                      value={this.state.details.phoneNumber}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                      id="password"
                      type="password"
                      onChange={(e) => this.updateDetails(e)}
                      value={this.state.details.password}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center">
                <button onClick={(e) => this.signUp(e)} id="sign-up">
                  Sign up and proceed to checkout
                </button>
              </div>
            </Form>
            {this.state.alert === true ? (
              <Alert id="alert" className="mt-2">
                <h5 className="text-center">Sign Up successful</h5>
              </Alert>
            ) : (
              <div></div>
            )}
            {this.state.errorAlert === true ? (
              <Alert id="alert" className="mt-2">
                <h5 className="text-center">Something went wrong...</h5>
              </Alert>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div>
            <CheckoutasGuest />
          </div>
        )}
      </>
    )
  }
}

export default SignUp
