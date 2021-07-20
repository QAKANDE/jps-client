import React, { Component } from 'react'
import { Container, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../css/Login.css'

class ForgottenPassword extends Component {
  state = {
    email: '',
    emailSentAlert: false,
    emailSentErrorAlert: false,
    noEmail: false,
  }
  updateResetPassword = (e) => {
    this.setState({
      email: e.currentTarget.value,
    })
  }

  postEmail = async (e) => {
    e.preventDefault()
    if (this.state.email === '') {
      this.setState({
        noEmail: true,
      })
    } else {
      const response = await fetch(
        `https://mr-oyebode-backend-yqavh.ondigitalocean.app/users/send-reset-password-to-email/${this.state.email} `,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const messageFromApi = await response.json()
      if (messageFromApi.message === 'Email sent successfully') {
        this.setState({ emailSentAlert: true })
        setTimeout(() => {
          this.setState({
            emailSentAlert: false,
            email: '',
          })
        }, 1200)
      } else if (messageFromApi.message === 'User does not exist') {
        this.setState({ emailSentErrorAlert: true })
        setTimeout(() => {
          this.setState({
            emailSentErrorAlert: false,
            email: '',
          })
        }, 1200)
      }
    }
  }
  render() {
    return (
      <Container>
        {this.state.emailSentAlert === true ? (
          <Alert id="alert">An email has been sent to you.</Alert>
        ) : (
          <div></div>
        )}
        {this.state.emailSentErrorAlert === true ? (
          <Alert id="alert">
            User not found, please make sure you entered the correct email
          </Alert>
        ) : (
          <div></div>
        )}
        <div className="mt-5">
          <h3 className="d-flex justify-content-center">
            We Understand, These Things Happen...
          </h3>
          <h5 className="d-flex justify-content-center">
            Recover Your Account.
          </h5>
          <h5 className="d-flex justify-content-center">
            Enter Your Email Below To Reset Your Password, An Email With Details
            Will Be Sent To You Shortly.{' '}
          </h5>
          <Form>
            <Form.Group style={{ marginTop: '3rem' }}>
              <Form.Control
                htmlFor="email"
                className="mb-3"
                type="email"
                id="email"
                placeholder="Email"
                size="md"
                value={this.state.email}
                onChange={(e) => this.updateResetPassword(e)}
              />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center mb-1">
            <button
              id="forgotPasswordbtn"
              type="submit"
              className=" mt-3"
              onClick={(e) => this.postEmail(e)}
            >
              Recover Password
            </button>
          </div>
          <div className="d-flex justify-content-center mb-5 mt-4">
            <Link to={'/login'} id="loginFromRecoverPassword">
              <a>Login Here</a>
            </Link>
          </div>
        </div>
      </Container>
    )
  }
}

export default ForgottenPassword
