import React, { Component } from 'react';
import "../css/CartTotal.css"

class CartTotal extends Component {
    state = { 
        checkOut : false
    }

    displayCheckOut = () => {
        this.setState({
            checkOut : true
        })
    }
    
    render() { 
        return ( 
            <>
                <div className="container cart-total">
                    <div className="d-flex justify-content-between total-items">
                        <p>SubTotal</p>
                        <p>£ {this.props.subTotal}</p>
                    </div>
                    <div className="d-flex justify-content-between total-items">
                        <p>Tax</p>
                        <p>£ {this.props.tax }</p>
                    </div>
                    <div className="d-flex justify-content-between total-items">
                        <p>Shipping Cost</p>
                        <p>£ {this.props.shippingCost}</p>
                    </div>
                    <div className="d-flex justify-content-between total-items">
                        <p>Total</p>
                        <p>£ {this.props.finalTotal}</p>
                    </div>
                    <button onClick = {this.props.action}>
                        CheckOut
                    </button>
                </div>
                
            </>
         );
    }
}
 
export default CartTotal;