import React, { Component } from 'react'
import OrderConfirmed from './OrderConfirmed'
import ReactDOM from 'react-dom'
// const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM })

class Paypalpayment extends Component {
  state = {
    total: this.props.total.toString(),
    orderConfirmed: false,
    paypalDisplay: true,
  }

  // sendEmailDetails = async () => {
  //   const response = await fetch(
  //     'https://mr-oyebode-backend-yqavh.ondigitalocean.app/cart/transactional-email-customer',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         customerEmail: this.props.email,
  //         id: this.props.id,
  //       }),
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //     },
  //   )
  // }
  // sendEmailDetailsToSales = async () => {
  //   const response = await fetch(
  //     'https://mr-oyebode-backend-yqavh.ondigitalocean.app/cart/transactional-email-to-sales',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         id: this.props.id,
  //       }),
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //     },
  //   )
  // }

  // sendOrderDetails = async () => {
  //   const response = await fetch(
  //     'https://mr-oyebode-backend-yqavh.ondigitalocean.app/payment/send-royal-mail-order',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         fullName: this.props.fullName,
  //         addressLine1: this.props.addressLine1,
  //         city: this.props.city,
  //         postCode: this.props.postCode,
  //         email: this.props.email,
  //         subTotal: parseInt(this.props.subTotal),
  //         total: parseInt(this.props.total),
  //         billingAddressFullName: this.props.fullName,
  //         billingAddressaddressLine1: this.props.addressLine1,
  //         billingAddresscity: this.props.city,
  //         billingAddresspostCode: this.props.postCode,
  //         billingAddressemail: this.props.email,
  //       }),
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //     },
  //   )
  //   const details = await response.json()

  //   if (details.failedOrders.length === 0) {
  //     this.sendEmailDetails()
  //     this.sendEmailDetailsToSales()
  //   } else {
  //     this.setState({ error: true })
  //   }
  // }

  componentDidMount = async (props) => {
    const total = this.state.total
    let buttons
    buttons = window.paypal.Button.render(
      {
        env: 'sandbox',
        payment: function (data, actions) {
          return actions.request
            .post(
              'https://mr-oyebode-backend-yqavh.ondigitalocean.app/payment/my-api/create-payment/',
              {
                total: total,
              },
            )
            .then(function (res) {
              return res.id
            })
        },

        onAuthorize: async function (data, actions) {
          const response = actions.request.post(
            'https://mr-oyebode-backend-yqavh.ondigitalocean.app/payment/my-api/execute-payment/',
            {
              paymentID: data.paymentID,
              payerID: data.payerID,
            },
          )
          if (response) {
            window.location.href = 'www.johnpaulstephen.com/order-confirmed'
          }
        },
      },
      '#paypal-button',
    )
  }

  // createOrder(data, actions) {
  //   const value = this.state.total
  //   return actions.order.create({
  //     purchase_units: [
  //       {
  //         amount: {
  //           value: value,
  //         },
  //       },
  //     ],
  //   })
  // }

  // onApprove(data, actions) {
  //   return this.setState({ orderConfirmed: true })
  // }
  render() {
    return (
      <div>
        <div className=" mt-5 mb-5">
          <div id="paypal-button"></div>
          {/* <PayPalButton
            createOrder={(data, actions) => this.createOrder(data, actions)}
            onApprove={(data, actions) => this.onApprove(data, actions)}
          /> */}
        </div>
        {/* {this.state.orderConfirmed === true ? (
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
        )} */}
      </div>
    )
  }
}

export default Paypalpayment
