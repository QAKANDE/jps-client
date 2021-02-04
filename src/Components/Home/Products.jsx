import React, { Component } from "react";
import "../../css/Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import Accessories from "./Accessories";

import {
  Row,
  Col,
  Container,
  CardDeck,
  Card,
  Accordion,
  Button,
  Alert,
} from "react-bootstrap";

import { Link } from "react-router-dom";

class Products extends Component {
  state = {};

  displayTShirtsOnly = (event) => {
    this.setState({
      tShirt: true,
    });
    alert(this.state.tShirt);
  };
  render() {
    return (
      <Container>
        <div id="featured-text">
          <h2>T-shirts</h2>
        </div>

        <CardDeck>
          {this.props.productsAsProps.map((prod) => {
            return (
              <div className="product-image-wrapper col-sm-4">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src={prod.image} alt="" />
                    <h2>£ {prod.price}</h2>
                    <p>{prod.name}</p>
                    <a href="#" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart"></i>Add to cart
                    </a>
                  </div>
                  <div className="product-overlay">
                    <div className="overlay-content">
                      <h2>£ {prod.price}</h2>
                      <p>{prod.name}</p>
                      <button
                        onClick={() =>
                          this.props.addToCartAsProps(
                            prod._id,
                            prod.image,
                            prod.name,
                            prod.size,
                            prod.color,
                            prod.price
                          )
                        }
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </button>
                    </div>
                  </div>
                </div>
                <div className="choose">
                  <ul className="nav nav-pills nav-justified">
                    <li
                      onClick={() =>
                        this.addToWishListAsProps(
                          prod._id,
                          prod.image,
                          prod.name,
                          prod.size,
                          prod.color,
                          prod.price
                        )
                      }
                      style={{ cursor: "pointer" }}
                      id="add-to-wishlist"
                    >
                      <FontAwesomeIcon icon={faHeart} className="fa-1x" />
                      Add to wishlist
                    </li>
                    <li className="">
                      <Link to={`/details/${prod._id}`}>
                        <FontAwesomeIcon
                          icon={faPlusSquare}
                          className="fa-1x"
                        />
                        More details
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </CardDeck>
      </Container>
    );
  }
}

export default Products;
