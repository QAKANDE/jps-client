import React, { Component } from 'react'
import hero2 from '../../assets/hero2.png'
import '../../css/Details.css'
import ProductDetailsCarousel from './ProductDetailsCarousel'
import {
  Row,
  Col,
  Container,
  Carousel,
  CarouselItem,
  Form,
  Alert,
} from 'react-bootstrap'
// import {addCart} from "../../Helpers/functions"
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
  }

  componentDidMount = async () => {
    const sizeArr = []
    const desc = []
    const productId = this.props.match.params.productId
    const response = await fetch(`http://localhost:3003/product/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const details = await response.json()
    details.sizes.map((size) => {
      return sizeArr.push(size)
    })
    details.description.map((des) => {
      return desc.push(des)
    })

    this.setState({
      details,
      imageUrl: details.images[0].imageUrl,
      sizesFromApi: sizeArr,
      description: desc,
      id: productId,
      sizeToBeSent: sizeArr.join(''),
    })

    this.getReviews()
  }

  getReviews = async () => {
    const response = await fetch(
      `http://localhost:3003/reviews/${this.props.match.params.productId}`,
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
      <Container style={{ marginTop: '2rem', marginBottom: '3rem' }}>
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
        <Row>
          <Col md={4}>
            <div className="view-product">
              <img src={this.state.imageUrl} />
            </div>
          </Col>
          <Col sm={8}>
            <div className="product-information">
              <h2>{this.state.details.name}</h2>
              {this.state.description.map((des) => {
                return <p>{des}</p>
              })}
              <Form>
                <select
                  className="mt-3 mb-3"
                  id="drop-down-form"
                  onChange={(e) =>
                    this.setState({
                      sizeSelected: e.target.value,
                    })
                  }
                >
                  <option value="None">Select size</option>
                  {this.state.sizesFromApi.map((size) => {
                    return <option value={size}>{size}</option>
                  })}
                </select>
              </Form>
              <span>
                <span>£ {this.state.details.price}</span>

                <button
                  type="button"
                  className="btn btn-fefault"
                  id="cart"
                  onClick={() =>
                    this.addCart(
                      this.state.details._id,
                      this.state.quantity,
                      this.state.details.image,
                      this.state.details.name,
                      this.state.sizeSelected,
                      this.state.details.color,
                      this.state.details.price,
                      this.state.sizeToBeSent,
                    )
                  }
                >
                  <i className="fa fa-shopping-cart"></i>
                  Add to cart
                </button>
              </span>
              <p>
                <b>Availability:</b> In Stock
              </p>
            </div>
          </Col>
        </Row>
        <Review id={this.props.match.params.productId} />
      </Container>
    )
  }
}

export default Details
