import React, { Component } from 'react'

class OrderConfirmed extends Component {
  state = { success: false }
  componentDidMount = async () => {
    const response = await fetch(
      'http://localhost:3003/payment/send-royal-mail-order',
      {
        method: 'POST',
        body: JSON.stringify({
          fullName: this.props.fullName,
          addressLine1: this.props.addressLine1,
          city: this.props.city,
          postCode: this.props.postCode,
          email: this.props.email,
          subTotal: parseInt(this.props.subTotal),
          total: parseInt(this.props.total),
          billingAddressFullName: this.props.fullName,
          billingAddressaddressLine1: this.props.addressLine1,
          billingAddresscity: this.props.city,
          billingAddresspostCode: this.props.postCode,
          billingAddressemail: this.props.email,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      },
    )
    const details = await response.json()
    console.log(details)
    if (details.createdOrders.length !== 0) {
      this.setState({ success: true })
    } else {
      console.log(details)
    }
  }

  render() {
    return (
      <div>
        {this.state.success === true ? (
          <div>Dear {this.props.fullName}, your order is successful</div>
        ) : (
          <div></div>
        )}
        <div></div>
      </div>
    )
  }
}

export default OrderConfirmed
