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
        <div className="bg">
          <div className="card">
            <span className="card__success">
              <i className="ion-checkmark"></i>
            </span>

            <h1 className="card__msg">Payment Complete</h1>
            <h2 className="card__submsg">Thank you for your transfer</h2>
            <div className="card_body">
              <img
                src="http://nathgreen.co.uk/assets/img/nath.jpg"
                className="card__avatar"
              />
              <div className="card__recipient-info">
                <p className="card__recipient">Nath Green</p>
                <p className="card__email">hello@nathgreen.co.uk</p>
              </div>
              <h1 className="card__price">
                <span>£</span>20<span>.00</span>
              </h1>
            </div>
            <div className="card__tags">
              <span className="card__tag">completed</span>
              <span className="card__tag">#123456789</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PaymentSuccess;
