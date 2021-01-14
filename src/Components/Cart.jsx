import React, { Component } from 'react';
import "../css/Cart.css"
import hero1 from "../assets/hero1.png"
import CartTotal from "./CartTotal"
import Checkout from "./Checkout"
import {Row , Col, Container}  from "react-bootstrap"


class Cart extends Component {
    state = {
        cart: [] ,
        subTotal: "",
        tax: 30, 
        finalTotal: "",
        shippingCost: 50,
        displayCheckOut: false,
        quantity : ""
    }
    
    componentDidMount = async () => {
        const cartt = []
        const total = []
        const response = await fetch(`http://localhost:3001/cart/${localStorage["guestToken"]}`, {
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
        
    }

    displayCheckOut = () => {
        this.setState({
            displayCheckOut : true
        })
    }

    increaseQuantity = async (id, productName, productPrice, previousQuantity) => {
        const quantity = previousQuantity + 1
          const productDetails = {
                    productId: id,
                    quantity : quantity,
                    name: productName,
                    price: parseInt(productPrice),
                    userId : localStorage["guestToken"]
        }
        console.log(productDetails)
        console.log(previousQuantity)
                let response = await fetch(`http://localhost:3001/cart/check-out-as-guest`,
                    {
                        method: "POST",
                        body: JSON.stringify(productDetails),
                        headers: {
                        "Content-Type": "Application/json",
                            },
                    })
    }

    decreaseQuantity = async (id, productName, productPrice, previousQuantity) => {
        if (previousQuantity === 1) {
            alert("Quantity cannot be less than 1")
        }
        else {
            const quantity = previousQuantity - 1
              const productDetails = {
                        productId: id,
                        quantity : quantity,
                        name: productName,
                        price: parseInt(productPrice),
                        userId : localStorage["guestToken"]
            }
                    let response = await fetch(`http://localhost:3001/cart/check-out-as-guest`,
                        {
                            method: "POST",
                            body: JSON.stringify(productDetails),
                            headers: {
                            "Content-Type": "Application/json",
                                },
                        })
        }
    }
    render() { 
        return ( 
            <Container>
                <Row>
                    <Col md={9}>
                        
                <div id="cart_items">
                <div className="container">
                <div className="breadcrumbs">
				<ol className="breadcrumb">
				  <li><a href="#">Home</a></li>
				  <li className="active">Shopping Cart</li>
				</ol>
			</div>
            <div className="table-responsive cart_info">
            <table className="table table-condensed">
					<thead>
                                    <tr className="cart_menu">
                            <td>
                                            
                            </td>
							<td className="image">Item</td>
							<td className="price">Price</td>
							<td id ="quantity">Quantity</td>
							<td className="total">Total</td>
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
                                            <td>
                                                
                                                <button className="px-3"
                                                    id="quantity-increase"
                                                    onClick={() => this.increaseQuantity(
                                                        item.productId,
                                                        item.name,
                                                        item.price,
                                                        item.quantity
                                                    )}>+</button>
                                               
                                                         {item.quantity}
                                                   
                                                <button className="px-3"
                                                    id="quantity-decrease"
                                                    onClick={() => this.decreaseQuantity(
                                                        item.productId,
                                                        item.name,
                                                        item.price,
                                                        item.quantity
                                                    )}>-</button>     
                                            </td>
                                            <td>£ {item.total}</td>
                                            <td>
                                             <button className="px-3">X</button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                                </table>
            </div>
                    </div>

                </div>
                    </Col>
                    <Col md={3}>               
                <CartTotal
                    subTotal={this.state.subTotal}
                    finalTotal={this.state.finalTotal}
                    tax={this.state.tax}
                            shippingCost={this.state.shippingCost}
                           action={this.displayCheckOut}
                />
                    </Col>
                </Row>
                {this.state.displayCheckOut === true ? <Checkout/> : <div></div> }
            </Container>
         );
    }
}
 
export default Cart;