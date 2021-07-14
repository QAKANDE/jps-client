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
    this.setState({
      products,
    })
  }

  componentDidMount = async () => {
    if (!localStorage['userId']) {
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
      localStorage['guestToken'] = this.state.guestToken
      this.getProducts()

      console.log(window.history.back)
    } else if (localStorage['userId']) {
      localStorage.removeItem('guestToken')
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
    productSizesAsString,
  ) => {
    try {
      if (localStorage['guestToken']) {
        const productDetails = {
          productId: id,
          quantity: this.state.quantity,
          image: productImage,
          name: productName,
          size: this.state.initialSize,
          color: productColor,
          price: parseInt(productPrice),
          sizeFromClient: productSizesAsString,
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
          size: this.state.initialSize,
          color: productColor,
          price: parseInt(productPrice),
          sizeFromClient: productSizesAsString,
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
      <div>
        <Jumbo />
        <Container>
          <div>
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
                productSizes,
              ) =>
                this.addCart(
                  id,
                  quantity,
                  productImage,
                  productName,
                  productSize,
                  productColor,
                  productPrice,
                  productSizes,
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
