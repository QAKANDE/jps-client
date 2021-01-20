import React, { Component } from "react";
import "../css/PaymentSuccess.css";

class PaymentSuccess extends Component {
  state = {};

  componentDidMount = async () => {
    const res = await fetch(
      "http://localhost:3001/payment/delete-payment-price-and-cart",
      {
        method: "DELETE",
        body: JSON.stringify({
          userId: localStorage["guestToken"],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.removeItem("guestToken");
  };
  render() {
    return (
      <>
        <div id="bg">
          <div id="card">
            <span id="card__success">
              <i id="ion-checkmark"></i>
            </span>

            <h1 id="card__msg">Payment Complete</h1>
            <h2 id="card__submsg">Thank you for your transfer</h2>
            <div id="card_body">
              <img
                src="http://nathgreen.co.uk/assets/img/nath.jpg"
                id="card__avatar"
              />
              <div id="card__recipient-info">
                <p id="card__recipient">Nath Green</p>
                <p id="card__email">hello@nathgreen.co.uk</p>
              </div>
              <h1 id="card__price">
                <span>£</span>20<span>.00</span>
              </h1>
            </div>
            <div id="card__tags">
              <span id="card__tag">completed</span>
              <span id="card__tag">#123456789</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PaymentSuccess;
