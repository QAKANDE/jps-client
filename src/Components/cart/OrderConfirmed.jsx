import React, { Component } from 'react'

class OrderConfirmed extends Component {
  state = { success: false, error: false }

  updateStock = async () => {
    const quantityInDatabaseInInteger = parseInt(this.props.currentQuantity)
    const currentQuantityInInteger = parseInt(this.props.quantity)
    const quantity = quantityInDatabaseInInteger - currentQuantityInInteger

    const response = await fetch(
      'http://localhost:3003/product/update-stock-quantity',
      {
        method: 'PUT',
        body: JSON.stringify({
          productId: this.props.productId,
          sizeId: this.props.sizeId,
          quantity: quantity,
          stockId: this.props.stockId,
          size: this.props.size,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      },
    )
    const details = await response.json()
  }
  componentDidMount = async () => {
    this.updateStock()
    // const response = await fetch(
    //   'http://localhost:3003/payment/send-royal-mail-order',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       fullName: this.props.fullName,
    //       addressLine1: this.props.addressLine1,
    //       city: this.props.city,
    //       postCode: this.props.postCode,
    //       email: this.props.email,
    //       subTotal: parseInt(this.props.subTotal),
    //       total: parseInt(this.props.total),
    //       billingAddressFullName: this.props.fullName,
    //       billingAddressaddressLine1: this.props.addressLine1,
    //       billingAddresscity: this.props.city,
    //       billingAddresspostCode: this.props.postCode,
    //       billingAddressemail: this.props.email,
    //     }),
    //     headers: {
    //       'Content-type': 'application/json',
    //     },
    //   },
    // )
    // const details = await response.json()

    // if (details.failedOrders.length === 0) {
    //   this.updateStock()
    //   this.setState({ success: true })
    // } else {
    //   this.setState({ error: true })
    // }
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
