import React, { Component } from 'react'
import '../../css/Products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import {
  Row,
  Col,
  Container,
  CardDeck,
  Card,
  Accordion,
  Button,
  Alert,
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

class Accessories extends Component {
  state = {
    size: 'No size required',
    color: 'No color required',
    quantity: 1,
    alert: false,
    errorAlert: false,
    wishListAlert: false,
    wishListErrorAlert: false,
  }

  addCart = async (
    id,
    quantity,
    productImage,
    productName,
    productSize,
    productColor,
    productPrice,
    productSizes,
  ) => {
    try {
      if (localStorage['guestToken']) {
        const productDetails = {
          productId: id,
          quantity: quantity,
          image: productImage,
          name: productName,
          size: productSize,
          color: productColor,
          price: parseInt(productPrice),
          sizeFromClient: productSizes,
          userId: localStorage['guestToken'],
        }
        let response = await fetch(
          `http://localhost:3003/cart/check-out-as-guest`,
          {
            method: 'POST',
            body: JSON.stringify(productDetails),
            headers: {
              'Content-Type': 'Application/json',
            },
          },
        )
        if (response.ok) {
          const createPriceResponse = await fetch(
            'http://localhost:3003/payment/create-product-price',
            {
              method: 'POST',
              body: JSON.stringify({
                userId: localStorage['guestToken'],
                productName: productName,
                productPrice: parseInt(productPrice * 100),
                productId: id,
                quantity: this.state.quantity,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          if (createPriceResponse.ok) {
            this.setState({ alert: true })
            setTimeout(() => {
              this.setState({
                alert: false,
              })
            }, 1200)
          }
        } else {
          this.setState({ errorAlert: true })
          setTimeout(() => {
            this.setState({
              errorAlert: false,
            })
          }, 1200)
        }
      } else if (localStorage['userId']) {
        const productDetails = {
          productId: id,
          quantity: this.state.quantity,
          image: productImage,
          name: productName,
          size: productSize,
          color: productColor,
          price: parseInt(productPrice),
          sizeFromClient: productSizes,
          userId: localStorage['userId'],
        }
        let response = await fetch(
          `http://localhost:3003/cart/check-out-as-guest`,
          {
            method: 'POST',
            body: JSON.stringify(productDetails),
            headers: {
              'Content-Type': 'Application/json',
            },
          },
        )
        if (response.ok) {
          const createPriceResponse = await fetch(
            'http://localhost:3003/payment/create-product-price',
            {
              method: 'POST',
              body: JSON.stringify({
                userId: localStorage['userId'],
                productName: productName,
                productPrice: parseInt(productPrice * 100),
                productId: id,
                quantity: this.state.quantity,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          if (createPriceResponse.ok) {
            this.setState({ alert: true })
            setTimeout(() => {
              this.setState({
                alert: false,
              })
            }, 1200)
          }
        } else {
          this.setState({ errorAlert: true })
          setTimeout(() => {
            this.setState({
              errorAlert: false,
            })
          }, 1200)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <Container>
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
                          this.addCart(
                            prod._id,
                            this.state.quantity,
                            prod.image,
                            prod.name,
                            this.state.size,
                            this.state.color,
                            prod.price,
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
                          prod.color,
                          prod.price,
                        )
                      }
                      style={{ cursor: 'pointer' }}
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
            )
          })}
        </CardDeck>
        {this.state.alert === true ? (
          <Alert id="alert">Item added to cart</Alert>
        ) : (
          <div></div>
        )}
        {this.state.errorAlert === true ? (
          <Alert id="alert">Unable to add item to cart</Alert>
        ) : (
          <div></div>
        )}
        {this.state.wishListAlert === true ? (
          <Alert id="alert">Item added to wishlist</Alert>
        ) : (
          <div></div>
        )}
        {this.state.wishListErrorAlert === true ? (
          <Alert id="alert">
            Unable to add item to wishlist. Please make sure you are signed in.
          </Alert>
        ) : (
          <div></div>
        )}
      </Container>
    )
  }
}

export default Accessories
