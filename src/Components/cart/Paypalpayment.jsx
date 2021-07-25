import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../../css/orderConfirmed.css'
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

  // componentDidMount = async (props) => {
  //   const total = this.state.total
  //   let buttons
  //   buttons = window.paypal.Button.render(
  //     {
  //       env: 'sandbox',
  //       payment: function (data, actions) {
  //         return actions.request
  //           .post('https://mr-oyebode-backend-yqavh.ondigitalocean.apppayment/my-api/create-payment/', {
  //             total: total,
  //           })
  //           .then(function (res) {
  //             return res.id
  //           })
  //       },

  //       onAuthorize: async function (data, actions) {
  //         const response = actions.request.post(
  //           'https://mr-oyebode-backend-yqavh.ondigitalocean.apppayment/my-api/execute-payment/',
  //           {
  //             paymentID: data.paymentID,
  //             payerID: data.payerID,
  //           },
  //         )
  //         if (response) {
  //           window.location.href = '/order-confirmed'
  //         }
  //       },
  //     },
  //     '#paypal-button',
  //   )
  // }

  componentDidMount = () => {
    const value = this.state.total
    window.paypal
      .Buttons({
        createOrder(data, actions) {
          return actions.order.create({
            intent: 'capture',
            purchase_units: [
              {
                description: 'John Paul Stephen',
                amount: {
                  currency_code: 'GBP',
                  value: value,
                },
              },
            ],
          })
        },
        onApprove(data, actions) {
          window.location.href = '/order-confirmed'
        },
        onCancel(data) {
          window.location.href = '/cart'
        },
        onError(err) {
          alert('An error making this payment occured')
          window.location.href = '/cart'
        },
      })
      .render('#paypal-button-container')
  }

  render() {
    return (
      <div>
        <div className="paypal-wrapper" style={{ width: '50%' }}>
          <div id="paypal-button-container"></div>
          {/* <PayPalButton
            createOrder={(data, actions) => this.createOrder(data, actions)}
            onApprove={(data, actions) => this.onApprove(data, actions)}
            onCancel={(data) => this.onCancel(data)}
            onError={(err) => this.onError(err)}
          /> */}
        </div>
      </div>
    )
  }
}

export default Paypalpayment
