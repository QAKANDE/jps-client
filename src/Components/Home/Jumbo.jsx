import React, { Component } from "react";
import "../../css/Jumbo.css";
import { Link } from "react-router-dom";
class Products extends Component {
  state = {
    carouselProducts: [],
  };
  render() {
    return (
      <section className="jumbotron px-5">
        <h1>50% OFF STORE WIDE</h1>
        <p id="stylish">
          Stylish , Elegant And , <br></br> Affordable{" "}
        </p>
        <p id="affordable">Top brand product at the best prices</p>
        <Link to="/allProducts" className="button">
          SHOP NOW
          <i
            className="fa fa-arrow-right mx-3 fa-1x"
            style={{ color: "black" }}
          ></i>
        </Link>
      </section>
    );
  }
}

export default Products;
