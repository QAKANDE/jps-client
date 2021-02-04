import React, { Component } from "react";
import "../../css/Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlusSquare } from "@fortawesome/free-solid-svg-icons";

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

import BottomProducts from "./BottomProducts";
import { Link } from "react-router-dom";

class Accessories extends Component {
  state = {};

  componentDidMount = async () => {
    // const response = await fetch("http://localhost:3003/accessories/", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const accessories = await response.json();
    // this.setState({
    //   accessories,
    // });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={9}>
            <div id="featured-text">
              <h2>Accessories</h2>
            </div>

            <CardDeck>
              {this.props.accessoriesAsProps.map((prod) => {
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
                          <Link to={`/accessorydetails/${prod._id}`}>
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
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Accessories;
