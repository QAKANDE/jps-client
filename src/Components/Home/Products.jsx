import React, { Component } from 'react'
import '../../css/Products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import solo1 from '../../assets/solo1.jpg'
import solo2 from '../../assets/solo2.jpg'

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

class Products extends Component {
  state = {
    sizes: [],
    products: [],
    wishListAlert: false,
  }

  displayTShirtsOnly = (event) => {
    this.setState({
      tShirt: true,
    })
    alert(this.state.tShirt)
  }
  addToWishList = async (id, productImage, productName, productPrice) => {
    const productDetails = {
      productId: id,
      image: productImage,
      name: productName,
      price: parseInt(productPrice),
    }
    if (localStorage['userId']) {
      let response = await fetch(
        `http://localhost:3003/wishlist/${localStorage['userId']}`,
        {
          method: 'POST',
          body: JSON.stringify(productDetails),
          headers: {
            'Content-Type': 'Application/json',
          },
        },
      )
      if (response.ok) {
        this.setState({ wishListAlert: true })
        setTimeout(() => {
          this.setState({
            wishListAlert: false,
          })
        }, 1200)
      } else {
        this.setState({ wishListErrorAlert: true })
        setTimeout(() => {
          this.setState({
            wishListErrorAlert: false,
          })
        }, 1200)
      }
    } else if (localStorage['guestToken']) {
      this.setState({ wishListErrorAlert: true })
      setTimeout(() => {
        this.setState({
          wishListErrorAlert: false,
        })
      }, 1200)
    }
  }
  render() {
    return (
      <>
        <Container>
          <div id="featured-text" className="mt-5">
            <h2>Our products</h2>
          </div>
          <CardDeck>
            {this.props.productsAsProps.map((prod) => {
              return (
                <div className="product-image-wrapper col-sm-4">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={prod.imageUrl} alt="" />
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
                              prod.imageUrl,
                              prod.name,
                              prod.color,
                              prod.price,
                              prod.sizes,
                              prod.total,
                              prod.stock,
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
                          this.addToWishList(
                            prod._id,
                            prod.imageUrl,
                            prod.name,
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
              )
            })}
          </CardDeck>
          {this.state.wishListAlert === true ? (
            <Alert id="alert">Item added to wishlist</Alert>
          ) : (
            <div></div>
          )}
          {this.state.wishListErrorAlert === true ? (
            <Alert id="alert">
              Unable to add item to wishlist. Please make sure you are signed
              in.
            </Alert>
          ) : (
            <div></div>
          )}
        </Container>
      </>
    )
  }
}

export default Products
