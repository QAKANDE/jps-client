import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home'
import NavSocialMedia from './Components/navbar/NavSocialMedia'
import Cart from './Components/cart/Cart'
import Details from './Components/ProductDetails/Details'
import Footer from './Components/Footer/Footer'
import PaymentSuccess from './Components/PaymentSuccess'
import Login from './Components/login/Login'
import Account from './Components/account/Account'
import NavBarCheckout from './Components/NavBarCheckout'
import WishList from './Components/wishlist/WishList'
import AccessoriesDetails from './Components/ProductDetails/AccessoriesDetails'
import AllProductsWrapper from './Components/AllProducts/Shopnow'
import AboutUs from './Components/Footer/AboutUs'
import ForgottenPassword from './Components/login/ForgottenPassword'
import UpdatePassword from './Components/login/UpdatePassword'
import OrderConfirmed from './Components/cart/OrderConfirmed'
import StockManager from './Components/Inventory/StockManager'
import UpdateInventory from './Components/Inventory/UpdateInventory'
import CookiePolicy from './Components/Footer/CookiePolicy'
import TermsOfSales from './Components/Footer/TermsOfSales'
import PrivacyPolicy from './Components/Footer/PrivacyPolicy'
import TermsOfUse from './Components/Footer/TermsOfUse'
import Notification from './Components/Home/Notification'
import { LastLocationProvider } from 'react-router-last-location'
import { Modal } from 'react-bootstrap'

class App extends Component {
    state = {
        show: false,
        showErrorModal: false,
        cartCounter: 0,
    }
    handleClose = () => {
        this.setState({ show: false })
    }
    handleShow = () => {
        this.setState({ show: true })
    }
    handleCloseErrorModal = () => {
        this.setState({ showErrorModal: false })
    }
    handleShowErrorModal = () => {
        this.setState({ showErrorModal: true })
    }

    increaseCartCounter = () => {
        this.setState({ cartCounter: this.state.cartCounter + 1 })
    }
    decreaseCartCounter = () => {
        this.setState({ cartCounter: this.state.cartCounter - 1 })
    }

    getCart = async() => {
        const guestToken = sessionStorage.getItem('guestToken')
        const response = await fetch(
            `https://mr-oyebode-backend-yqavh.ondigitalocean.app/cart/${guestToken}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            },
        )
        const cart = await response.json()
        if (cart.length !== 0) {
            this.setState({ cartCounter: cart.totalItems })
        } else {
            this.setState({ cartCounter: 0 })
        }
    }

    componentDidMount = async() => {
        this.getCart()
    }

    render() {
        return ( <
            div className = "App" >
            <
            Modal show = { this.state.showErrorModal }
            onHide = {
                () => this.handleCloseErrorModal() } >
            <
            Modal.Body id = "modal-body" >
            <
            div >
            <
            p className = "text-center"
            id = "cart-text" > { ' ' }
            Unable to add item to cart { ' ' } <
            /p>{' '} <
            /div>{' '} <
            /Modal.Body>{' '} <
            /Modal>{' '} <
            Modal show = { this.state.show }
            onHide = {
                () => this.handleClose() } >
            <
            Modal.Body id = "modal-body" >
            <
            div >
            <
            p className = "text-center"
            id = "cart-text" >
            Your item has been added to cart { ' ' } <
            /p>{' '} <
            /div>{' '} <
            /Modal.Body>{' '} <
            /Modal>{' '} <
            Router > { ' ' } <
            NavSocialMedia cartLength = { this.state.cartCounter }
            />{' '} <
            Route path = "/"
            exact render = {
                (props) => ( <
                    Home {...props }
                    show = {
                        () => this.handleShow() }
                    close = {
                        () => this.handleClose() }
                    showErrorModal = {
                        () => this.handleShowErrorModal() }
                    closeErrorModal = {
                        () => this.handleCloseErrorModal() }
                    getCart = {
                        () => this.getCart() }
                    />
                )
            }
            />{' '} <
            Route path = "/cart"
            exact render = {
                (props) => ( <
                    Cart {...props }
                    getCart = {
                        () => this.getCart() }
                    />
                )
            }
            />{' '} <
            Route path = "/details/:productId"
            exact render = {
                (props) => ( <
                    Details {...props }
                    show = {
                        () => this.handleShow() }
                    close = {
                        () => this.handleClose() }
                    showErrorModal = {
                        () => this.handleShowErrorModal() }
                    closeErrorModal = {
                        () => this.handleCloseErrorModal() }
                    getCart = {
                        () => this.getCart() }
                    />
                )
            }
            />{' '} <
            Route path = "/accessorydetails/:productId"
            exact component = { AccessoriesDetails }
            />{' '} <
            Route path = "/paymentsuccessful"
            exact component = { PaymentSuccess }
            />{' '} <
            Route path = "/login"
            exact component = { Login }
            />{' '} <
            Route path = "/account"
            exact component = { Account }
            />{' '} <
            Route path = "/wishlist"
            exact component = { WishList }
            />{' '} <
            Route path = "/allProducts"
            exact render = {
                (props) => ( <
                    AllProductsWrapper {...props }
                    show = {
                        () => this.handleShow() }
                    close = {
                        () => this.handleClose() }
                    showErrorModal = {
                        () => this.handleShowErrorModal() }
                    closeErrorModal = {
                        () => this.handleCloseErrorModal() }
                    getCart = {
                        () => this.getCart() }
                    />
                )
            }
            />{' '} <
            Route path = "/forgotPassword"
            exact component = { ForgottenPassword }
            />{' '} <
            Route path = "/updatePassword/:token/:email"
            exact component = { UpdatePassword }
            />{' '} <
            Route path = "/aboutus"
            exact component = { AboutUs }
            />{' '} <
            Route path = "/order-confirmed"
            exact render = {
                (props) => ( <
                    OrderConfirmed {...props }
                    getCart = {
                        () => this.getCart() }
                    />
                )
            }
            />{' '} <
            Route path = "/stock-manager"
            exact component = { StockManager }
            />{' '} <
            Route path = "/cookie-policy"
            exact component = { CookiePolicy }
            />{' '} <
            Route path = "/terms-of-sales"
            exact component = { TermsOfSales }
            />{' '} <
            Route path = "/terms-of-use"
            exact component = { TermsOfUse }
            />{' '} <
            Route path = "/privacy-policy"
            exact component = { PrivacyPolicy }
            />{' '} <
            Route path = "/update-inventory/:productId"
            exact component = { UpdateInventory }
            />{' '} <
            Footer / > { ' ' } <
            /Router>{' '} <
            /div>
        )
    }
}

export default App