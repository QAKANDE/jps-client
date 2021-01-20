import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "../css/CartTotal.css";
import { loadStripe } from "@stripe/stripe-js";
const stripeTestPromise = loadStripe(
  "pk_test_51HrjVqFcebO7I650cr4OP6bitBa3ExCpu3Fc3IkYuA36TjnMdbPDmsTz6PejmS9LRDMRwpdB4fKqeTCqjZaDK8Xp003k14DkTf"
);

class CartTotal extends Component {
  state = {
    checkOut: false,
  };

  displayCheckOut = () => {
    this.setState({
      checkOut: true,
    });
  };
  checkOut = async () => {
    const stripe = await stripeTestPromise;
    const res = await fetch(
      "http://localhost:3001/payment/create-checkout-session",
      {
        method: "POST",
        body: JSON.stringify({
          userId: this.props.userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const session = await res.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      alert("sucess");
    }
  };

  render() {
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Header>Total Transaction</Card.Header>
            <div style={{ paddingTop: "2rem" }}>
              <div className="d-flex justify-content-between">
                <h5>Sub-total</h5>
                <p>£ {this.props.subTotal}</p>
              </div>
              <div className="d-flex justify-content-between">
                <h5>Tax</h5>
                <p>£ {this.props.tax}</p>
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
                <button onClick={()=> this.props.action()}>Proceed to check out</button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default CartTotal;
