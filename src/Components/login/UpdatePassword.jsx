import React, { Component } from 'react'
import { Container, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class UpdatePassword extends Component {
  state = {
    password: '',
    passwordUpdatedAlert: false,
    passwordUpdatedError: false,
    noPassword: false,
    tokenUsedError: false,
  }
  updateResetPassword = (e) => {
    this.setState({
      password: e.currentTarget.value,
    })
  }

  updatePassword = async (e) => {
    e.preventDefault()

    if (this.state.password === '') {
      this.setState({
        noPassword: true,
      })
    } else {
      const token = this.props.match.params.token
      const email = this.props.match.params.email
      const response = await fetch(
        `https://mr-oyebode-backend-yqavh.ondigitalocean.app/users/reset-password/${token}/${email} `,
        {
          method: 'POST',
          body: JSON.stringify({
            password: this.state.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const messageFromApi = await response.json()
      if (messageFromApi.message === 'Password updated') {
        const deleteToken = await fetch(
          `https://mr-oyebode-backend-yqavh.ondigitalocean.app/users/delete-reset-token/${email}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        this.setState({ passwordUpdatedAlert: true })
        setTimeout(() => {
          this.setState({
            passwordUpdatedAlert: false,
            password: '',
          })
        }, 1200)
        window.location.href = `http://localhost:3000/`
      } else if (messageFromApi.message === 'An error occured') {
        this.setState({ passwordUpdatedError: true })
        setTimeout(() => {
          this.setState({
            passwordUpdatedError: false,
            email: '',
          })
        }, 1200)
      } else if (messageFromApi.message === 'Invalid token') {
        this.setState({ tokenUsedError: true })
        setTimeout(() => {
          this.setState({
            tokenUsedError: false,
            email: '',
          })
        }, 1200)
      }
    }
  }
  render() {
    return (
      <Container>
        <div className="mt-5">
          {this.state.passwordUpdatedAlert === true ? (
            <Alert id="alert">Password updated.</Alert>
          ) : (
            <div></div>
          )}
          {this.state.passwordUpdatedError === true ? (
            <Alert id="alert">An error occured</Alert>
          ) : (
            <div></div>
          )}
          {this.state.tokenUsedError === true ? (
            <Alert id="alert">Token has been used.</Alert>
          ) : (
            <div></div>
          )}
          <h3 className="d-flex justify-content-center">
            Update your password
          </h3>

          <Form>
            <Form.Group style={{ marginTop: '3rem' }}>
              <Form.Control
                htmlFor="password"
                className="mb-3"
                type="password"
                id="password"
                placeholder="Enter new password"
                size="md"
                value={this.state.password}
                onChange={(e) => this.updateResetPassword(e)}
              />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center mb-5">
            <button
              id="updatePasswordBtn"
              type="submit"
              className=" mt-3"
              onClick={(e) => this.updatePassword(e)}
            >
              Update Password
            </button>
          </div>
        </div>
      </Container>
    )
  }
}

export default UpdatePassword
