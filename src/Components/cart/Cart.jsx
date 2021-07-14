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
    shippingCost: 3.5,
    displayCheckOut: false,
    quantity: '',
    itemsLength: '',
    userId: '',
    alert: false,
    sizes: [],
    sizeSelected: '',
  }

  componentDidMount = async () => {
    this.getCart()
  }

  getCart = async () => {
    const cartt = []
    const total = []
    const sizeArr = []
    if (localStorage['userId']) {
      const response = await fetch(
        `http://localhost:3003/cart/${localStorage['userId']}`,
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
        sizes: sizeArr,
      })
    } else if (localStorage['guestToken']) {
      const response = await fetch(
        `http://localhost:3003/cart/${localStorage['guestToken']}`,
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
        sizes: sizeArr,
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
    if (localStorage['guestToken']) {
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
        this.getCart()
      }
    } else if (localStorage['userId']) {
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
    if (localStorage['guestToken']) {
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
        userId: localStorage['guestToken'],
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
          this.getCart()
        }
      }
    } else if (localStorage['userId']) {
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
        userId: localStorage['userId'],
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
          this.getCart()
        }
      }
    }
  }

  deleteItem = async (user, id) => {
    let response = await fetch(
      `http://localhost:3003/cart/delete-item/${user}/${id}`,
      {
        method: 'DELETE',
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

  editSize = async (e, userId, productId) => {
    this.setState({
      sizeSelected: e.target.value,
    })
    let response = await fetch(
      `http://localhost:3003/cart/edit-product-size/${userId}/${productId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          size: e.target.value,
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
                    <Card.Header>
                      {this.state.allCart.totalItems} item(s)
                    </Card.Header>
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
                                    <h5>{item.name}</h5>
                                    {item.color === 'No color required' ? (
                                      <></>
                                    ) : (
                                      <div>
                                        <p class="mb-3 text-muted text-uppercase small">
                                          Color -{item.color}
                                        </p>
                                      </div>
                                    )}
                                    <div className="d-flex justify-content-between">
                                      {item.size === 'No size required' ? (
                                        <div></div>
                                      ) : (
                                        <p class="mt-2 text-muted text-uppercase small">
                                          Size: {item.size}
                                        </p>
                                      )}

                                      {item.sizes.length !== 0 ? (
                                        <Form>
                                          <select
                                            className="mx-3"
                                            id="drop-down-form"
                                            onChange={(e) =>
                                              this.editSize(
                                                e,
                                                this.state.allCart.userId,
                                                item.productId,
                                              )
                                            }
                                          >
                                            <option value="None">
                                              Edit size
                                            </option>
                                            {item.sizes.map((size) => {
                                              return (
                                                <option value={size}>
                                                  {size}
                                                </option>
                                              )
                                            })}
                                          </select>
                                        </Form>
                                      ) : (
                                        <div></div>
                                      )}
                                    </div>
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
                                <div class="d-flex justify-content-between align-items-center">
                                  <div>
                                    <div
                                      onClick={() =>
                                        this.deleteItem(
                                          this.state.allCart.userId,
                                          item._id,
                                        )
                                      }
                                      id="delete-item-div"
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </div>
                                  </div>
                                  <p class="mb-0">£ {item.price}</p>
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
