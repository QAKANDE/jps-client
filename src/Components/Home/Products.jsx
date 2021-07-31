import React, { Component } from 'react'
import '../../css/Products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import solo1 from '../../assets/solo1.jpg'
import solo2 from '../../assets/solo2.jpg'
import { Modal } from 'react-bootstrap'

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
    show: false,
    imageUrl: '',
  }

  displayTShirtsOnly = (event) => {
    this.setState({
      tShirt: true,
    })
    alert(this.state.tShirt)
  }
  handleShow = async (title, color) => {
    const response = await fetch(
      'https://mr-oyebode-backend-yqavh.ondigitalocean.app/product/color-code-image',
      {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          color: color,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const details = await response.text()
    this.setState({ show: true, imageUrl: details })
  }
  handleClose = () => {
    this.setState({ show: false, imageUrl: '' })
  }

  // addToWishList = async (id, productImage, productName, productPrice) => {
  //   const productDetails = {
  //     productId: id,
  //     image: productImage,
  //     name: productName,
  //     price: parseInt(productPrice),
  //   }
  //   if (localStorage['userId']) {
  //     let response = await fetch(
  //       `https://mr-oyebode-backend-yqavh.ondigitalocean.app/wishlist/${localStorage['userId']}`,
  //       {
  //         method: 'POST',
  //         body: JSON.stringify(productDetails),
  //         headers: {
  //           'Content-Type': 'Application/json',
  //         },
  //       },
  //     )
  //     if (response.ok) {
  //       this.setState({ wishListAlert: true })
  //       setTimeout(() => {
  //         this.setState({
  //           wishListAlert: false,
  //         })
  //       }, 1200)
  //     } else {
  //       this.setState({ wishListErrorAlert: true })
  //       setTimeout(() => {
  //         this.setState({
  //           wishListErrorAlert: false,
  //         })
  //       }, 1200)
  //     }
  //   } else if (localStorage['guestToken']) {
  //     this.setState({ wishListErrorAlert: true })
  //     setTimeout(() => {
  //       this.setState({
  //         wishListErrorAlert: false,
  //       })
  //     }, 1200)
  //   }
  // }
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
                <div className="product-image-wrapper col-sm-4 col-md-6 col-lg-4">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={prod.imageUrl[0].url} alt="" />
                      <h2>£ {prod.price}</h2>
                      <p>{prod.name}</p>
                      <div className="d-flex justify-content-center">
                        <Row id="color-code-wrapper">
                          {prod.stock.map((colorCode) => {
                            return (
                              <Col
                                style={{ backgroundColor: colorCode.colorCode }}
                                id="color-code"
                                className="mx-2"
                                onClick={() =>
                                  this.handleShow(
                                    prod.name,
                                    colorCode.colorCode,
                                  )
                                }
                              >
                                &nbsp;
                              </Col>
                            )
                          })}
                        </Row>
                      </div>
                      <button
                        onClick={() =>
                          this.props.addToCartAsProps(
                            prod._id,
                            prod.imageUrl[0].url,
                            prod.name,
                            prod.color,
                            prod.price,
                            prod.sizes,
                            prod.total,
                            prod.stock,
                          )
                        }
                        className="add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </button>
                    </div>
                    {/* <div className="product-overlay">
                      <div className="overlay-content">
                        <h2>£ {prod.price}</h2>
                        <p>{prod.name}</p>
                        <button
                          onClick={() =>
                            this.props.addToCartAsProps(
                              prod._id,
                              prod.imageUrl[0].url,
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
                    </div> */}
                  </div>

                  <div className="choose">
                    <div className="d-flex justify-content-between">
                      <Link to={`/details/${prod._id}`} id="more-details">
                        <FontAwesomeIcon
                          icon={faPlusSquare}
                          className="fa-1x "
                        />
                        More details
                      </Link>
                      <Link to to="/allProducts" id="more-details">
                        <FontAwesomeIcon
                          icon={faPlusSquare}
                          className="fa-1x "
                        />
                        View all products
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardDeck>
          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Body>
              <div>
                <p id="modal-cancel-div" onClick={() => this.handleClose()}>
                  X
                </p>
              </div>
              <img src={this.state.imageUrl} id="modal-image" />
            </Modal.Body>
          </Modal>
        </Container>
      </>
    )
  }
}

export default Products
