import React, { Component } from 'react'
import '../../css/AllProducts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { CardDeck } from 'react-bootstrap'
import { Alert } from 'react-bootstrap'

class Shopnow extends Component {
  state = {
    JPS: {},
    JPSImages: [],
    duduDara: {},
    duduDaraImages: [],
    makorira: {},
    makoriraImages: [],
    whatWillYouBeKnownFor: {},
    whatWillYouBeKnownForImages: [],
    ourThing: {},
    ourThingImages: [],
    outOfFashion: {},
    outOfFashionImages: [],
    alert: false,
    errorAlert: false,
    quantity: 1,
  }

  getProducts = async () => {
    const response = await fetch(
      'https://mr-oyebode-backend-yqavh.ondigitalocean.app/product/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const products = await response.json()
    const JPS = products.filter(
      (prodName) => prodName.name === 'John Paul Stephen',
    )

    JPS.map((j) => {
      return this.setState({ JPSImages: j.imageUrl, JPS: j })
    })

    const duduDara = products.filter(
      (prodName) => prodName.name === 'Dúdú Dára / Black is Good',
    )
    duduDara.map((j) => {
      return this.setState({ duduDaraImages: j.imageUrl, duduDara: j })
    })
    const makorira = products.filter(
      (prodName) => prodName.name === 'Má Korira / Don’t Hate',
    )
    makorira.map((j) => {
      return this.setState({ makoriraImages: j.imageUrl, makorira: j })
    })
    const whatWillYouBeKnownFor = products.filter(
      (prodName) => prodName.name === 'What will you be known for?',
    )
    whatWillYouBeKnownFor.map((j) => {
      return this.setState({
        whatWillYouBeKnownForImages: j.imageUrl,
        whatWillYouBeKnownFor: j,
      })
    })
    const ourThing = products.filter(
      (prodName) => prodName.name === 'Our thing Our belief Our heritage',
    )
    ourThing.map((j) => {
      return this.setState({
        ourThingImages: j.imageUrl,
        ourThing: j,
      })
    })
    const outOfFashion = products.filter(
      (prodName) => prodName.name === 'Out of Fashion',
    )
    outOfFashion.map((j) => {
      return this.setState({
        outOfFashionImages: j.imageUrl,
        outOfFashion: j,
      })
    })
  }

  componentDidMount = async () => {
    this.getProducts()
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
          `https://mr-oyebode-backend-yqavh.ondigitalocean.app/check-out-as-guest`,
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
      <div className="container" id="shop-now">
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
        <div>
          <div id="featured-text">
            <h2>John Paul Stephen</h2>
          </div>
          <CardDeck>
            {this.state.JPSImages.map((jps, index) => {
              return (
                <div className="product-image-wrapper col-sm-4">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={jps.url} alt="" />
                      <h2>£ {this.state.JPS.price}</h2>
                      <p>{this.state.JPS.name}</p>
                      <a href="#" className="btn btn-default add-to-cart">
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                    <div className="product-overlay">
                      <div className="overlay-content">
                        <h2>£ {this.state.JPS.price}</h2>
                        <p>{this.state.JPS.name}</p>
                        <button
                          onClick={() =>
                            this.addCart(
                              this.state.JPS._id,
                              jps.url,
                              this.state.JPS.name,
                              this.state.JPS.price,
                              this.state.JPS.stock,
                            )
                          }
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardDeck>
        </div>
        <div>
          <div id="featured-text">
            <h2>Dúdú Dára/Black is Good</h2>
          </div>
          <CardDeck>
            {this.state.duduDaraImages.map((jps, index) => {
              return (
                <div className="product-image-wrapper col-sm-4">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={jps.url} alt="" />
                      <h2>£ {this.state.duduDara.price}</h2>
                      <p>{this.state.duduDara.name}</p>
                      <a href="#" className="btn btn-default add-to-cart">
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                    <div className="product-overlay">
                      <div className="overlay-content">
                        <h2>£ {this.state.duduDara.price}</h2>
                        <p>{this.state.duduDara.name}</p>
                        <button
                          onClick={() =>
                            this.addCart(
                              this.state.duduDara._id,
                              jps.url,
                              this.state.duduDara.name,
                              this.state.duduDara.price,
                              this.state.duduDara.stock,
                            )
                          }
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardDeck>
        </div>
        <div>
          <div id="featured-text">
            <h2>Má Korira/Don’t Hate</h2>
          </div>
          <CardDeck>
            {this.state.makoriraImages.map((jps, index) => {
              return (
                <div className="product-image-wrapper col-sm-4">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={jps.url} alt="" />
                      <h2>£ {this.state.makorira.price}</h2>
                      <p>{this.state.makorira.name}</p>
                      <a href="#" className="btn btn-default add-to-cart">
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                    <div className="product-overlay">
                      <div className="overlay-content">
                        <h2>£ {this.state.makorira.price}</h2>
                        <p>{this.state.makorira.name}</p>
                        <button
                          onClick={() =>
                            this.addCart(
                              this.state.makorira._id,
                              jps.url,
                              this.state.makorira.name,
                              this.state.makorira.price,
                              this.state.makorira.stock,
                            )
                          }
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardDeck>
        </div>
        <div>
          <div id="featured-text">
            <h2>What Will You Be Known For</h2>
          </div>
          <CardDeck>
            {this.state.whatWillYouBeKnownForImages.map((jps, index) => {
              return (
                <div className="product-image-wrapper col-sm-4">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={jps.url} alt="" />
                      <h2>£ {this.state.whatWillYouBeKnownFor.price}</h2>
                      <p>{this.state.whatWillYouBeKnownFor.name}</p>
                      <a href="#" className="btn btn-default add-to-cart">
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                    <div className="product-overlay">
                      <div className="overlay-content">
                        <h2>£ {this.state.whatWillYouBeKnownFor.price}</h2>
                        <p>{this.state.whatWillYouBeKnownFor.name}</p>
                        <button
                          onClick={() =>
                            this.addCart(
                              this.state.whatWillYouBeKnownFor._id,
                              jps.url,
                              this.state.whatWillYouBeKnownFor.name,
                              this.state.whatWillYouBeKnownFor.price,
                              this.state.whatWillYouBeKnownFor.stock,
                            )
                          }
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardDeck>
        </div>
        <div>
          <div id="featured-text">
            <h2>Our Thing Our Belief Our Heritage</h2>
          </div>
          <CardDeck>
            {this.state.ourThingImages.map((jps, index) => {
              return (
                <div className="product-image-wrapper col-sm-4">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={jps.url} alt="" />
                      <h2>£ {this.state.ourThing.price}</h2>
                      <p>{this.state.ourThing.name}</p>
                      <a href="#" className="btn btn-default add-to-cart">
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                    <div className="product-overlay">
                      <div className="overlay-content">
                        <h2>£ {this.state.ourThing.price}</h2>
                        <p>{this.state.ourThing.name}</p>
                        <button
                          onClick={() =>
                            this.addCart(
                              this.state.ourThing._id,
                              jps.url,
                              this.state.ourThing.name,
                              this.state.ourThing.price,
                              this.state.ourThing.stock,
                            )
                          }
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardDeck>
        </div>
        <div>
          <div id="featured-text">
            <h2>Out of Fashion</h2>
          </div>
          <CardDeck>
            {this.state.outOfFashionImages.map((jps, index) => {
              return (
                <div className="product-image-wrapper col-sm-4">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src={jps.url} alt="" />
                      <h2>£ {this.state.outOfFashion.price}</h2>
                      <p>{this.state.outOfFashion.name}</p>
                      <a href="#" className="btn btn-default add-to-cart">
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                    <div className="product-overlay">
                      <div className="overlay-content">
                        <h2>£ {this.state.outOfFashion.price}</h2>
                        <p>{this.state.outOfFashion.name}</p>
                        <button
                          onClick={() =>
                            this.addCart(
                              this.state.outOfFashion._id,
                              jps.url,
                              this.state.outOfFashion.name,
                              this.state.outOfFashion.price,
                              this.state.outOfFashion.stock,
                            )
                          }
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardDeck>
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
      </div>
    )
  }
}

export default Shopnow
