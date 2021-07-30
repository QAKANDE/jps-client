import React, { Component, createRef } from 'react'
import { Card } from 'react-bootstrap'
import '../../css/CartTotal.css'
import { loadStripe } from '@stripe/stripe-js'

class CartTotal extends Component {
  state = {
    checkOut: false,
  }

  displayCheckOut = () => {
    if (this.props.size === 'None selected') {
      alert('size')
    } else if (this.props.color === 'None selected') {
      alert('color')
    } else {
      this.setState({
        checkOut: true,
      })
    }
  }

  render() {
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Header>Total Transaction</Card.Header>
            <div style={{ paddingTop: '2rem' }}>
              <div className="d-flex justify-content-between">
                <h5>Sub-total</h5>
                <p>£ {this.props.subTotal}</p>
              </div>
              <div className="d-flex justify-content-between">
                <h5>Shipping Cost</h5>
                <p>£ {this.props.shippingCost}</p>
              </div>
              <hr></hr>
              <div className="d-flex justify-content-between">
                <h5>Total to be paid</h5>
                <p>£ {this.props.finalTotal}</p>
              </div>
              <hr></hr>
              <div className="text-center">
                <button
                  id="proceed-to-checkout"
                  onClick={() => this.props.action()}
                >
                  Proceed to check out
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default CartTotal
