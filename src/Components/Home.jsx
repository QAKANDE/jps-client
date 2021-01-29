import React, { Component } from "react";
import Jumbo from "./Jumbo";
import Products from "./Products";

class Home extends Component {
  state = {
    guestToken: "",
    itemsLength: "",
  };

  getCartLength = (token) => {
    this.setState({
      itemsLength: token,
    });
  };

  componentDidMount = async () => {
    if (!localStorage["userId"]) {
      const guestResponse = await fetch(
        "http://localhost:3001/cart/guest/guest-token",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const guestToken = await guestResponse.json();
      this.setState({
        guestToken,
      });
      localStorage["guestToken"] = this.state.guestToken;
    } else if (localStorage["userId"]) {
      localStorage.removeItem("guestToken");
    }
    // this.props.action(this.state.itemsLength)
  };
  render() {
    return (
      <div>
        <Jumbo />
        <Products secondAction={this.getCartLength} />
      </div>
    );
  }
}

export default Home;
