import React, { Component } from 'react';
import {BrowserRouter as Router , Route } from 'react-router-dom'
import Home from "./Components/Home"
import NavSocialMedia from "./Components/NavSocialMedia"
import Cart from "./Components/Cart"


class App extends Component {
   
  state = {
    guestToken : ""
  }
  

  getGuestToken = (token) => {
    this.setState({
      guestToken:token
    })
  }
  render() {
    return (
      <div className="App">
        <Router>
          <NavSocialMedia />
          <Route path="/" exact component={Home}  />
          <Route path="/cart" exact component={Cart} />
        </Router>
      </div>
    );
  }
}

export default App;
