import React, { Component } from 'react'
import OrderConfirmed from './OrderConfirmed'
import ReactDOM from 'react-dom'
const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM })

class Paypalpayment extends Component {
  state = {
    total: this.props.total.toString(),
    orderConfirmed: false,
    paypalDisplay: true,
  }

  componentDidMount = () => {
    this.setState({ orderConfirmed: true })
  }

  createOrder(data, actions) {
    const value = this.state.total
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: value,
          },
        },
      ],
    })
  }

  onApprove(data, actions) {
    // return (window.location.href = 'http://localhost:3000/order-confirmed')
    return this.setState({ orderConfirmed: true })
  }
  render() {
    return (
      <div>
        <div className=" mt-5 mb-5">
          <PayPalButton
            createOrder={(data, actions) => this.createOrder(data, actions)}
            onApprove={(data, actions) => this.onApprove(data, actions)}
          />
        </div>
        {this.state.orderConfirmed === true ? (
          <OrderConfirmed
            fullName={this.props.fullName}
            addressLine1={this.props.addressLine1}
            city={this.props.city}
            postCode={this.props.postCode}
            email={this.props.email}
            total={this.props.total}
            subTotal={this.props.subTotal}
            productId={this.props.productId}
            sizeId={this.props.sizeId}
            quantity={this.props.quantity}
            stockId={this.props.stockId}
            size={this.props.size}
            currentQuantity={this.props.currentQuantity}
            id={this.props.id}
          />
        ) : (
          <div></div>
        )}
      </div>
    )
  }
}

export default Paypalpayment
