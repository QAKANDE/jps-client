import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/Home";
import NavSocialMedia from "./Components/NavSocialMedia";
import Cart from "./Components/Cart";
import Details from "./Components/Details";
import Footer from "./Components/Footer";
import PaymentSuccess from "./Components/PaymentSuccess";
import Login from "./Components/Login";
import Account from "./Components/Account";

function App() {
    return ( <
        div className = "App" >
        <
        Router >
        <
        NavSocialMedia / >
        <
        Route path = "/"
        exact render = {
            (props) => < Home {...props }
            />} / >
            <
            Route path = "/cart"
            exact component = { Cart }
            /> <
            Route path = "/details/:productId"
            exact component = { Details }
            /> <
            Route path = "/paymentsuccessful"
            exact component = { PaymentSuccess }
            /> <
            Route path = "/login"
            exact component = { Login }
            /> <
            Route path = "/account"
            exact component = { Account }
            /> <
            Footer / >
            <
            /Router> <
            /div>
        );
    }

    export default App;