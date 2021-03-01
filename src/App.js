import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import NavSocialMedia from "./Components/navbar/NavSocialMedia";
import Cart from "./Components/cart/Cart";
import Details from "./Components/ProductDetails/Details";
import Footer from "./Components/Footer/Footer";
import PaymentSuccess from "./Components/PaymentSuccess";
import Login from "./Components/login/Login";
import Account from "./Components/account/Account";
import NavBarCheckout from "./Components/NavBarCheckout";
import WishList from "./Components/wishlist/WishList";
import AccessoriesDetails from "./Components/ProductDetails/AccessoriesDetails";
import AllProductsWrapper from "./Components/AllProducts/AllProductsWrapper";
import AboutUs from "./Components/Footer/AboutUs";
import ForgottenPassword from "./Components/login/ForgottenPassword";
import UpdatePassword from "./Components/login/UpdatePassword";


import { LastLocationProvider } from "react-router-last-location";

function App() {
    return ( <
        div className = "App" >
        <
        Router > { " " } <
        NavSocialMedia / >
        <
        Route path = "/"
        exact render = {
            (props) => < Home {...props }
            />} / >
            <
            Route path = "/cart"
            exact component = { Cart }
            />{" "} <
            Route path = "/details/:productId"
            exact component = { Details }
            />{" "} <
            Route
            path = "/accessorydetails/:productId"
            exact
            component = { AccessoriesDetails }
            />{" "} <
            Route path = "/paymentsuccessful"
            exact component = { PaymentSuccess }
            />{" "} <
            Route path = "/login"
            exact component = { Login }
            />{" "} <
            Route path = "/account"
            exact component = { Account }
            />{" "} <
            Route path = "/wishlist"
            exact component = { WishList }
            />{" "} <
            Route path = "/allProducts"
            exact component = { AllProductsWrapper }
            />{" "} <
            Route path = "/forgotPassword"
            exact component = { ForgottenPassword }
            />{" "} <
            Route
            path = "/updatePassword/:token/:email"
            exact
            component = { UpdatePassword }
            />{" "} <
            Route path = "/aboutus"
            exact component = { AboutUs }
            />{" "}  <Footer / > <
            /Router>{" "} < /
            div >
        );
    }

    export default App;