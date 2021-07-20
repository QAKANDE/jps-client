import React, { Component } from 'react'
import {
  Row,
  Col,
  Container,
  Carousel,
  CarouselItem,
  Form,
} from 'react-bootstrap'
import Review from './Review'
import { addCart } from '../../Helpers/functions'

class AccessoriesDetails extends Component {
  state = {
    details: {},
    id: '',
    quantity: 1,
    alert: false,
    errorAlert: false,
    size: 'No size required',
    color: 'No color required',
  }
  componentDidMount = async () => {
    const accessoryId = this.props.match.params.productId
    const response = await fetch(
      `https://mr-oyebode-backend-yqavh.ondigitalocean.app/accessories/${accessoryId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const details = await response.json()
    this.setState({
      details,
      id: accessoryId,
    })
    this.getReviews()
  }

  addCart = async (id, productName, productPrice) => {
    try {
      if (!localStorage['userId']) {
        const productDetails = {
          productId: id,
          quantity: this.state.quantity,
          name: productName,
          price: parseInt(productPrice),
          userId: localStorage['guestToken'],
        }
        let response = await fetch(
          `http://localhost:3001/cart/check-out-as-guest`,
          {
            method: 'POST',
            body: JSON.stringify(productDetails),
            headers: {
              'Content-Type': 'Application/json',
            },
          },
        )
        if (response.ok) {
          alert('success')
          const response = await fetch(
            `http://localhost:3001/cart/${localStorage['guestToken']}`,
            {
              method: 'GET',
              headers: {
                'Content-type': 'application/json',
              },
            },
          )
          const cart = await response.json()
          this.props.secondAction(cart.totalItems)
          // this.setState({ alert: true })
          // setTimeout(() => {
          //     this.setState({
          //         alert: false
          //     });
          // }, 1200);
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
  getReviews = async () => {
    const response = await fetch(
      `http://localhost:3001/reviews/${this.props.match.params.productId}`,
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
    console.log('', this.state.reviews)
  }
  render() {
    return (
      <Container style={{ marginTop: '2rem', marginBottom: '3rem' }}>
        <Row>
          <Col md={4}>
            <div className="view-product">
              <img src={this.state.details.image} />
            </div>
          </Col>
          <Col sm={8}>
            <div className="product-information">
              <h2>{this.state.details.name}</h2>
              <p>{this.state.details.description}</p>

              <span>
                <span>£ {this.state.details.price}</span>
                <button
                  type="button"
                  className="btn btn-fefault"
                  id="cart"
                  onClick={() =>
                    addCart(
                      this.state.details._id,
                      this.state.quantity,
                      this.state.details.image,
                      this.state.details.name,
                      this.state.size,
                      this.state.color,
                      this.state.details.price,
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

export default AccessoriesDetails
