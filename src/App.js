import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/Home";
import NavSocialMedia from "./Components/NavSocialMedia";
import Cart from "./Components/Cart";
import Details from "./Components/Details";
import Footer from "./Components/Footer";
import PaymentSuccess from "./Components/PaymentSuccess";

class App extends Component {
    state = {
        length: "",
    };

    getGuestToken = (cartLength) => {
        this.setState({
            length: cartLength,
        });
    };
    render() {
        return ( <
            div className = "App" >
            <
            Router >
            <
            NavSocialMedia itemsLength = { this.state.length }
            />{" "} <
            Route path = "/"
            exact render = {
                (props) => < Home {...props }
                action = { this.getGuestToken }
                />} /
                >
                <
                Route path = "/cart"
                exact component = { Cart }
                />{" "} <
                Route path = "/details/:productId"
                exact component = { Details }
                />{" "} <
                Route path = "/paymentsuccessful"
                exact component = { PaymentSuccess }
                />{" "} <
                Footer / > { " " } <
                /Router>{" "} <
                /div>
            );
        }
    }

    export default App;