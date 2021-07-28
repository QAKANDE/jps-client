import React, { Component } from 'react'
import '../../css/orderConfirmed.css'
import { Link } from 'react-router-dom'

class OrderConfirmed extends Component {
  state = { success: false, error: false }

  // updateStock = async () => {
  //   const quantityInDatabaseInInteger = parseInt(this.props.currentQuantity)
  //   const currentQuantityInInteger = parseInt(this.props.quantity)
  //   const quantity = quantityInDatabaseInInteger - currentQuantityInInteger

  //   const response = await fetch(
  //     'https://mr-oyebode-backend-yqavh.ondigitalocean.app/product/update-stock-quantity',
  //     {
  //       method: 'PUT',
  //       body: JSON.stringify({
  //         productId: this.props.productId,
  //         sizeId: this.props.sizeId,
  //         quantity: quantity,
  //         stockId: this.props.stockId,
  //         size: this.props.size,
  //       }),
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //     },
  //   )
  //   const details = await response.json()
  // }

  sendEmailDetails = async (id, email, orderId, userId) => {
    const response = await fetch(
      'https://mr-oyebode-backend-yqavh.ondigitalocean.app/cart/transactional-email-customer',
      {
        method: 'POST',
        body: JSON.stringify({
          customerEmail: this.props.email,
          id: id,
          customerEmail: email,
          orderId: orderId,
          userId: userId,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      },
    )
  }
  sendEmailDetailsToSales = async (id) => {
    const response = await fetch(
      'https://mr-oyebode-backend-yqavh.ondigitalocean.app/cart/transactional-email-to-sales',
      {
        method: 'POST',
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      },
    )
  }
  componentDidMount = async () => {
    const response = await fetch(
      'https://mr-oyebode-backend-yqavh.ondigitalocean.app/payment/send-royal-mail-order',
      {
        method: 'POST',
        body: JSON.stringify({
          id: sessionStorage.getItem('guestToken'),
        }),
        headers: {
          'Content-type': 'application/json',
        },
      },
    )
    const details = await response.json()

    if (details.details.failedOrders.length === 0) {
      this.sendEmailDetailsToSales(details.cartId)
      this.sendEmailDetails(
        details.cartId,
        details.custEmail,
        details.orderId,
        sessionStorage.getItem('guestToken'),
      )
      this.props.getCart()
      this.setState({ success: true })
    } else {
      this.setState({ error: true })
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.success === true ? (
          <div id="order-complete">
            <h5 className="text-center pt-5">
              Dear Customer, thank you for your order.
            </h5>
            <h5 className="text-center pb-3">
              Your order details will be sent to the email you provided shortly.
            </h5>
            <h5 className="text-center pb-5">
              You can continue shopping
              <Link className="continue-shopping-link" to="/allProducts">
                here
              </Link>
            </h5>
          </div>
        ) : (
          <div className="lds-hourglass"></div>
        )}
        {this.state.error === true ? (
          <div id="order-complete">
            <h5 className="text-center pt-5">
              Dear Customer, there was an error placing your order.
            </h5>
            <h5 className="text-center pb-5">
              Please continue shopping
              <Link className="continue-shopping-link" to="/allProducts">
                here
              </Link>
              .
            </h5>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    )
  }
}

export default OrderConfirmed
