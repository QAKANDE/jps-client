import React, { Component } from 'react'
import '../../css/Details.css'

import { Row, Col, Container, Alert } from 'react-bootstrap'

import Review from './Review'

class Details extends Component {
  state = {
    details: {},
    id: '',
    quantity: 1,
    imageUrl: '',
    alert: false,
    errorAlert: false,
    sizeSelected: 'None',
    description: [],
    sizesFromApi: [],
    sizeToBeSent: '',
    showDescription: true,
    showDetails: false,
  }

  showDescription = () => {
    this.setState({
      showDescription: true,
      showDetails: false,
    })
  }
  showDetails = () => {
    this.setState({
      showDescription: false,
      showDetails: true,
    })
  }

  componentDidMount = async () => {
    const sizeArr = []
    const desc = []
    const productId = this.props.match.params.productId
    const response = await fetch(
      `https://mr-oyebode-backend-yqavh.ondigitalocean.app/product/${productId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const details = await response.json()

    details.description.map((des) => {
      return desc.push(des)
    })

    this.setState({
      details,
      imageUrl: details.imageUrl[0].url,
      sizesFromApi: sizeArr,
      description: desc,
      id: productId,
      sizeToBeSent: sizeArr.join(''),
    })
    console.log(this.state.imageUrl)

    this.getReviews()
  }

  getReviews = async () => {
    const response = await fetch(
      `https://mr-oyebode-backend-yqavh.ondigitalocean.app/reviews/${this.props.match.params.productId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const reviews = await response.json()
    this.setState({
      reviews,
    })
  }
  addCart = async (
    id,
    productImage,
    productName,
    productPrice,
    productStock,
  ) => {
    try {
      const guestToken = sessionStorage.getItem('guestToken')
      const userId = sessionStorage.getItem('userId')
      if (guestToken) {
        const productDetails = {
          productId: id,
          quantity: this.state.quantity,
          image: productImage,
          name: productName,
          price: parseInt(productPrice),
          stock: productStock,
          userId: guestToken,
        }
        let response = await fetch(
          `https://mr-oyebode-backend-yqavh.ondigitalocean.app/cart/check-out-as-guest`,
          {
            method: 'POST',
            body: JSON.stringify(productDetails),
            headers: {
              'Content-Type': 'Application/json',
            },
          },
        )
        if (response.ok) {
          this.props.show()
          setTimeout(() => {
            this.props.close()
          }, 1200)
          this.props.getCart()
        } else {
          this.props.showErrorModal()
          setTimeout(() => {
            this.props.closeErrorModal()
          }, 1200)
        }
      } else if (userId) {
        const productDetails = {
          productId: id,
          quantity: this.state.quantity,
          image: productImage,
          name: productName,
          price: parseInt(productPrice),
          stock: productStock,
          userId: userId,
        }
        let response = await fetch(
          `https://mr-oyebode-backend-yqavh.ondigitalocean.app/cart/check-out-as-guest`,
          {
            method: 'POST',
            body: JSON.stringify(productDetails),
            headers: {
              'Content-Type': 'Application/json',
            },
          },
        )
        if (response.ok) {
          this.props.show()
          setTimeout(() => {
            this.props.close()
          }, 1200)
          this.props.getCart()
        } else {
          this.props.showErrorModal()
          setTimeout(() => {
            this.props.closeErrorModal()
          }, 1200)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <Container style={{ marginTop: '2rem', marginBottom: '3rem' }}>
        <Row>
          <Col md={4}>
            <div className="view-product">
              <img src={this.state.imageUrl} />
            </div>
          </Col>
          <Col sm={8}>
            <div className="product-information">
              <h1 className="text-center">{this.state.details.name}</h1>
              <div className="d-flex justify-content-center mt-5 mb-5">
                <div id="details-description">
                  <p
                    onClick={() => this.showDescription()}
                    className={
                      this.state.showDescription === true
                        ? 'activeDesctiption-details'
                        : 'inactiveDesctiption-details'
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    DESCRIPTION
                  </p>
                  <p
                    onClick={() => this.showDetails()}
                    className={
                      this.state.showDetails === true
                        ? 'activeDesctiption-details'
                        : 'inactiveDesctiption-details'
                    }
                    style={{ cursor: 'pointer', fontWeight: '500' }}
                    id="details-para"
                  >
                    DETAILS
                  </p>
                </div>
              </div>
              {this.state.showDescription === true ? (
                <div>
                  {this.state.description.map((des) => {
                    return (
                      <p className="text-center" id="description-text">
                        {des}
                      </p>
                    )
                  })}
                </div>
              ) : (
                <div></div>
              )}
              {this.state.showDetails === true ? (
                <div>
                  <p className="text-center" id="description-text">
                    100% ringspun combed cotton
                  </p>
                  <p className="text-center" id="description-text">
                    Shoulder to shoulder neck tape
                  </p>
                  <p className="text-center" id="description-text">
                    Two-layer neck rib with elastane Double stitched
                  </p>
                  <p className="text-center" id="description-text">
                    Double preshrunk cotton
                  </p>
                  <p className="text-center" id="description-text">
                    Washable at 40 degrees
                  </p>
                </div>
              ) : (
                <div></div>
              )}
              <h1 className="text-center mt-5" id="price-text">
                £ {this.state.details.price}
              </h1>
              <div className="d-flex justify-content-center">
                <button
                  className="add-to-cart"
                  onClick={() =>
                    this.addCart(
                      this.state.details._id,
                      this.state.imageUrl,
                      this.state.details.name,
                      this.state.details.price,
                      this.state.details.stock,
                    )
                  }
                >
                  <i className="fa fa-shopping-cart"></i>
                  Add to cart
                </button>
              </div>
            </div>
          </Col>
        </Row>
        {/* <Review id={this.props.match.params.productId} /> */}
      </Container>
    )
  }
}

export default Details
