import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

class Notification extends Component {
  state = {
    show: false,
  }

  render() {
    return <Alert id="alert">Item added to cart</Alert>
  }
}

export default Notification
