import React, { Component } from 'react'
import Jumbo from './Jumbo'
import Products from './Products'
import Accessories from './Accessories'
import { Alert, Row, Col, Form, Container } from 'react-bootstrap'
import '../../css/Home.css'

// import { addCart } from "../../Helpers/functions";

class Home extends Component {
  state = {
    guestToken: '',
    itemsLength: '',
    products: [],
    accessories: [],
    quantity: 1,
    alert: false,
    errorAlert: false,
    wishListAlert: false,
    wishListErrorAlert: false,
    tShirtdisplay: false,
    accessoriesDisplay: false,
    displayAll: true,
    initialSize: 'None',
  }

  getCartLength = (token) => {
    this.setState({
      itemsLength: token,
    })
  }

  getProducts = async () => {
    const response = await fetch('http://localhost:3003/product/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const products = await response.json()
    console.log(products)
    this.setState({
      products,
    })
  }

  componentDidMount = async () => {
    const userId = sessionStorage.getItem('userId')
    if (!userId) {
      const guestResponse = await fetch(
        'http://localhost:3003/cart/guest/guest-token',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const guestToken = await guestResponse.json()
      this.setState({
        guestToken,
      })
      sessionStorage.setItem('guestToken', this.state.guestToken)
      this.getProducts()
    } else if (userId) {
      sessionStorage.removeItem('guestToken')
      this.getProducts()
    }
    // this.props.action(this.state.itemsLength)
  }

  addCart = async (
    id,
    productImage,
    productName,
    productColor,
    productPrice,
    productSizes,
    productTotal,
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
          this.setState({ alert: true })
          setTimeout(() => {
            this.setState({
              alert: false,
            })
          }, 1200)
        } else {
          this.setState({ errorAlert: true })
          setTimeout(() => {
            this.setState({
              errorAlert: false,
            })
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
          this.setState({ alert: true })
          setTimeout(() => {
            this.setState({
              alert: false,
            })
          }, 1200)
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
      <div>
        <Jumbo />
        <Container>
          <div>
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
            <Products
              secondAction={this.getCartLength}
              productsAsProps={this.state.products}
              addToCartAsProps={(
                id,
                quantity,
                productImage,
                productName,
                productSize,
                productColor,
                productPrice,
                productStock,
              ) =>
                this.addCart(
                  id,
                  quantity,
                  productImage,
                  productName,
                  productSize,
                  productColor,
                  productPrice,
                  productStock,
                )
              }
              addToWishListAsProps={(
                id,
                productImage,
                productName,
                productColor,
                productPrice,
              ) =>
                this.addToWishList(
                  id,
                  productImage,
                  productName,
                  productColor,
                  productPrice,
                )
              }
            />
          </div>
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
        </Container>
      </div>
    )
  }
}

export default Home
