import React, { Component } from 'react'

import ReactDOM from 'react-dom'
// const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM })
import '../../css/orderConfirmed.css'

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
        env: 'production',
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
            window.location.href = '/order-confirmed'
          }
        },
      },
      '#paypal-button-container',
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
        <div className="paypal-wrapper" style={{ width: '50%' }}>
          <div id="#paypal-button-container"></div>
          {/* <PayPalButton
            createOrder={(data, actions) => this.createOrder(data, actions)}
            onApprove={(data, actions) => this.onApprove(data, actions)}
          /> */}
        </div>
      </div>
    )
  }
}

export default Paypalpayment
