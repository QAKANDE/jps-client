import React, { Component } from 'react'
import '../../css/Cart.css'
import CartTotal from '../../Components/cart/CartTotal'
import Checkout from '../../Components/cart/Checkout'
import { Row, Col, Container, Card, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Alert } from 'react-bootstrap'
import { loadStripe } from '@stripe/stripe-js'

const stripeTestPromise = loadStripe(
  'pk_test_51HrjVqFcebO7I650cr4OP6bitBa3ExCpu3Fc3IkYuA36TjnMdbPDmsTz6PejmS9LRDMRwpdB4fKqeTCqjZaDK8Xp003k14DkTf',
)

class Cart extends Component {
  state = {
    allCart: {},
    cart: [],
    subTotal: '',
    tax: 30,
    finalTotal: '',
    shippingCost: 4.99,
    displayCheckOut: false,
    quantity: '1',
    itemsLength: '',
    userId: '',
    alert: false,
    sizes: [],
    sizeSelected: '',
    stock: [],
    color: 'None selected',
    size: 'None selected',
    productId: '',
    sizeId: '',
    stockId: '',
    currentQuantity: '',
    id: '',
  }

  componentDidMount = async () => {
    this.getCart()
  }

  getCart = async () => {
    const cartt = []
    const total = []
    const stock = []
    const guestToken = sessionStorage.getItem('guestToken')
    const userId = sessionStorage.getItem('userId')

    if (userId) {
      const response = await fetch(
        `https://mr-oyebode-backend-yqavh.ondigitalocean.app/cart/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        },
      )
      const cart = await response.json()
      console.log(cart)

      cart.products.map((product) => {
        cartt.push(product)
        total.push(product.total)
      })

      const subTotal = parseInt(total.reduce((a, b) => a + b, 0))
      const finalTotal = parseInt(subTotal + this.state.shippingCost)

      this.setState({
        allCart: cart,
        cart: cartt,
        subTotal,
        finalTotal,
        itemsLength: cart.totalItems,
        userId: cart.userId,
        stock: cart.stock,
      })
    } else if (guestToken) {
      const response = await fetch(
        `https://mr-oyebode-backend-yqavh.ondigitalocean.app/cart/${guestToken}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        },
      )
      const cart = await response.json()

      cart.products.map((product) => {
        cartt.push(product)
        total.push(product.total)
        stock.push(product.stock)
      })

      const subTotal = parseInt(total.reduce((a, b) => a + b, 0))
      const finalTotal = subTotal + this.state.shippingCost
      alert(finalTotal)

      this.setState({
        cart: cartt,
        subTotal,
        finalTotal,
        itemsLength: cart.totalItems,
        userId: cart.userId,
        stock: stock,
        id: cart._id,
      })
    }
  }

  displayCheckOut = () => {
    this.setState({
      displayCheckOut: true,
    })
  }

  increaseQuantity = async (
    id,
    productName,
    previousQuantity,
    productImage,
    productSize,
    productColor,
    productPrice,
  ) => {
    const productSizes = this.state.sizes.join('')
    const guestToken = sessionStorage.getItem('guestToken')
    const userId = sessionStorage.getItem('userId')
    if (guestToken) {
      const quantity = previousQuantity + 1
      const productDetails = {
        productId: id,
        quantity: parseInt(quantity),
        image: productImage,
        name: productName,
        size: productSize,
        color: productColor,
        price: parseInt(productPrice),
        sizeFromClient: productSizes,
        total: parseInt(productPrice),
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
        this.setState({ quantity: quantity.toString() })
        this.getCart()
      }
    } else if (userId) {
      const quantity = previousQuantity + 1
      const productDetails = {
        productId: id,
        quantity: quantity,
        image: productImage,
        name: productName,
        size: productSize,
        color: productColor,
        price: parseInt(productPrice),
        sizeFromClient: productSizes,
        total: parseInt(productPrice),
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
        this.setState({ quantity: quantity.toString() })
        this.getCart()
      }
    }
  }

  decreaseQuantity = async (
    id,
    productName,
    previousQuantity,
    productImage,
    productSize,
    productColor,
    productPrice,
  ) => {
    const productSizes = this.state.sizes.join('')
    const quantity = previousQuantity - 1
    const guestToken = sessionStorage.getItem('guestToken')
    const userId = sessionStorage.getItem('userId')
    if (guestToken) {
      const productDetails = {
        productId: id,
        quantity: parseInt(quantity),
        image: productImage,
        name: productName,
        size: productSize,
        color: productColor,
        price: parseInt(productPrice),
        sizeFromClient: productSizes,
        total: parseInt(productPrice),
        userId: guestToken,
      }
      if (previousQuantity === 1) {
        this.setState({ alert: true })
        setTimeout(() => {
          this.setState({
            alert: false,
          })
        }, 1200)
      } else {
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
          this.setState({ quantity: quantity.toString() })
          this.getCart()
        }
      }
    } else if (userId) {
      const productDetails = {
        productId: id,
        quantity: parseInt(quantity),
        image: productImage,
        name: productName,
        size: productSize,
        color: productColor,
        price: parseInt(productPrice),
        sizeFromClient: productSizes,
        total: parseInt(productPrice),
        userId: userId,
      }
      if (previousQuantity === 1) {
        this.setState({ alert: true })
        setTimeout(() => {
          this.setState({
            alert: false,
          })
        }, 1200)
      } else {
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
          this.setState({ quantity: quantity.toString() })
          this.getCart()
        }
      }
    }
  }

  deleteItem = async (id) => {
    const guestToken = sessionStorage.getItem('guestToken')

    let response = await fetch(
      `https://mr-oyebode-backend-yqavh.ondigitalocean.app/cart/delete-item/${id}`,
      {
        method: 'DELETE',
        body: JSON.stringify({
          userId: guestToken,
        }),
        headers: {
          'Content-Type': 'Application/json',
        },
      },
    )
    if (response.ok) {
      this.getCart()
    } else {
      alert('some')
    }
  }

  editSize = async (e, userId, productId, size) => {
    e.preventDefault()

    let response = await fetch(
      `https://mr-oyebode-backend-yqavh.ondigitalocean.app/cart/edit-product-size/${userId}/${productId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          size: size,
        }),
        headers: {
          'Content-Type': 'Application/json',
        },
      },
    )
    this.getCart()
  }
  editColor = async (e, userId, productId, color) => {
    e.preventDefault()

    let response = await fetch(
      `https://mr-oyebode-backend-yqavh.ondigitalocean.app/cart/edit-product-color/${userId}/${productId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          color: color,
        }),
        headers: {
          'Content-Type': 'Application/json',
        },
      },
    )
    this.getCart()
  }
  render() {
    return (
      <Container style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        {this.state.alert === true ? (
          <Alert id="alert">Quantity cannot be less than 1</Alert>
        ) : (
          <div></div>
        )}
        {this.state.cart.length === 0 ? (
          <div className="text-center" id="empty-cart-div">
            <h3>Your Cart Is Empty, Please Add Items To Cart</h3>
          </div>
        ) : (
          <section>
            <Row>
              <Col lg={8}>
                <Card>
                  <Card.Body>
                    <Card.Header>{this.state.itemsLength} item(s)</Card.Header>
                    {this.state.cart.map((item, key) => {
                      return (
                        <div>
                          <Row style={{ paddingTop: '2rem' }} key={item._id}>
                            <Col md={5} lg={3} xl={3}>
                              <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                <img
                                  className="img-fluid w-100"
                                  src={item.image}
                                />
                              </div>
                            </Col>
                            <Col md={7} lg={9} xl={9}>
                              <div>
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <h5 className="mt-4 mb-4">{item.name}</h5>
                                    <h5 className="mt-4 mb-4 color-size-text">
                                      Size: {item.size}
                                    </h5>
                                    <h5 className="mt-4 mb-4 color-size-text">
                                      Color : {item.color}
                                    </h5>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <button
                                      id="quantity-increase"
                                      style={{
                                        width: '40px',
                                        height: '40px',
                                        marginRight: '1rem',
                                      }}
                                      onClick={() =>
                                        this.increaseQuantity(
                                          item.productId,
                                          item.name,
                                          item.quantity,
                                          item.image,
                                          this.state.sizeSelected,
                                          item.color,
                                          item.price,
                                          item.total,
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                    <h5>{item.quantity}</h5>
                                    <button
                                      id="quantity-decrease"
                                      style={{
                                        width: '40px',
                                        height: '40px',
                                        marginLeft: '1rem',
                                      }}
                                      onClick={() =>
                                        this.decreaseQuantity(
                                          item.productId,
                                          item.name,
                                          item.quantity,
                                          item.image,
                                          this.state.sizeSelected,
                                          item.color,
                                          item.price,
                                          item.total,
                                        )
                                      }
                                    >
                                      -
                                    </button>
                                  </div>
                                </div>
                                <Row>
                                  {item.stock.map((stc) => {
                                    return (
                                      <Col md={3}>
                                        <button
                                          id="color-button"
                                          onClick={(e) =>
                                            this.editColor(
                                              e,
                                              this.state.allCart.userId,
                                              item._id,
                                              stc.color,
                                            )
                                          }
                                          className="mt-3"
                                        >
                                          {stc.color}
                                        </button>
                                      </Col>
                                    )
                                  })}
                                </Row>
                                <Row className="mt-5 mb-5" md={4}>
                                  <Col>
                                    <button
                                      id="color-button"
                                      onClick={(e) =>
                                        this.editSize(
                                          e,
                                          this.state.allCart.userId,
                                          item._id,
                                          'XXL',
                                        )
                                      }
                                    >
                                      XXL
                                    </button>
                                  </Col>
                                  <Col>
                                    <button
                                      id="color-button"
                                      onClick={(e) =>
                                        this.editSize(
                                          e,
                                          this.state.allCart.userId,
                                          item._id,
                                          'XL',
                                        )
                                      }
                                    >
                                      XL
                                    </button>
                                  </Col>
                                  <Col>
                                    <button
                                      id="color-button"
                                      onClick={(e) =>
                                        this.editSize(
                                          e,
                                          this.state.allCart.userId,
                                          item._id,
                                          'L',
                                        )
                                      }
                                    >
                                      L
                                    </button>
                                  </Col>
                                  <Col>
                                    <button
                                      id="color-button"
                                      onClick={(e) =>
                                        this.editSize(
                                          e,
                                          this.state.allCart.userId,
                                          item._id,
                                          'M',
                                        )
                                      }
                                    >
                                      M
                                    </button>
                                  </Col>
                                  {/* <Col>
                                    <button
                                      id="color-button"
                                      className="mt-3"
                                      onClick={(e) =>
                                        this.editSize(
                                          e,
                                          this.state.allCart.userId,
                                          item._id,
                                          'S',
                                        )
                                      }
                                    >
                                      S
                                    </button>
                                  </Col> */}
                                </Row>

                                <div class="d-flex justify-content-between align-items-center">
                                  <div>
                                    <div
                                      onClick={() => this.deleteItem(item._id)}
                                      id="delete-item-div"
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </div>
                                  </div>
                                  <h2 class="mb-0">£ {item.price}</h2>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      )
                    })}
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4}>
                <CartTotal
                  subTotal={this.state.subTotal}
                  finalTotal={this.state.finalTotal}
                  tax={this.state.tax}
                  shippingCost={this.state.shippingCost}
                  action={this.displayCheckOut}
                  userId={this.state.userId}
                />
              </Col>
            </Row>
            {this.state.displayCheckOut === true ? (
              <Checkout
                total={this.state.finalTotal}
                subTotal={this.state.subTotal}
                productId={this.state.productId}
                sizeId={this.state.sizeId}
                quantity={this.state.quantity}
                stockId={this.state.stockId}
                size={this.state.size}
                currentQuantity={this.state.currentQuantity}
                id={this.state.id}
              />
            ) : (
              <div></div>
            )}
          </section>
        )}
      </Container>
    )
  }
}

export default Cart
