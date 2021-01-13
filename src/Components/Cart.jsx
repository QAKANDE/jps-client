import React, { Component } from 'react';
import "../css/Cart.css"
import hero1 from "../assets/hero1.png"
import CartTotal from "./CartTotal"


class Cart extends Component {
    state = {
        cart: [] ,
        subTotal: "",
        tax: 30, 
        finalTotal: "",
        shippingCost : 50
    }
    
    componentDidMount = async () => {
        const cartt = []
        const total = []
        const response = await fetch("http://localhost:3001/cart/874562f4f66b1fbd06ffdf5b", {
            method: "GET" ,
            headers: {
               "Content-type":"application/json" 
            }
        })
        const cart = await response.json()
        cart.products.map((product) => {
            cartt.push(product)
            total.push(product.total)
        })
        const subTotal = parseInt(total.reduce((a, b) => a + b, 0))
        const finalTotal = parseInt(subTotal + this.state.tax + this.state.shippingCost )

        this.setState({
            cart: cartt,
            subTotal,
            finalTotal
        })
        console.log(subTotal)
        
    }
    render() { 
        return ( 
            <>
                <div id="cart_items">
                <div className="container">
                <div class="breadcrumbs">
				<ol class="breadcrumb">
				  <li><a href="#">Home</a></li>
				  <li class="active">Shopping Cart</li>
				</ol>
			</div>
            <div class="table-responsive cart_info">
            <table class="table table-condensed">
					<thead>
                                    <tr class="cart_menu">
                            <td>
                                            
                            </td>
							<td class="image">Name</td>
							<td class="price">Price</td>
							<td class="quantity">Quantity</td>
							<td class="total">Total</td>
							<td></td>
						</tr>
                                </thead>
                                <tbody>
                                    {this.state.cart.map((item) => {
                                        return <tr>
                                            <td>
                                                <img src={hero1} id="cart-item-image"/>
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>£ {item.total}</td>
                                        </tr>
                                    })}
                                </tbody>
                                </table>
            </div>
                    </div>

                </div>
                <CartTotal
                    subTotal={this.state.subTotal}
                    finalTotal={this.state.finalTotal}
                    tax={this.state.tax}
                    shippingCost={this.state.shippingCost}
                />
            </>
         );
    }
}
 
export default Cart;