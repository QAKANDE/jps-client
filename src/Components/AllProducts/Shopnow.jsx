import React, { Component } from 'react'
import '../../css/AllProducts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { CardDeck } from 'react-bootstrap'
class Shopnow extends Component {
  state = {
    JPS: {},
    JPSImages: [],
    duduDara: {},
    duduDaraImages: [],
    makorira: {},
    makoriraImages: [],
  }

  getProducts = async () => {
    const response = await fetch('http://localhost:3003/product/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const products = await response.json()
    const JPS = products.filter(
      (prodName) => prodName.name === 'John Paul Stephen',
    )

    JPS.map((j) => {
      return this.setState({ JPSImages: j.images, JPS: j })
    })
    console.log(this.state.JPS)
    const duduDara = products.filter(
      (prodName) => prodName.name === 'Dúdú Dára/Black is Good',
    )
    duduDara.map((j) => {
      return this.setState({ duduDaraImages: j.images, duduDara: j })
    })
    const makorira = products.filter(
      (prodName) => prodName.name === 'Má Korira/Don’t Hate',
    )
    makorira.map((j) => {
      return this.setState({ makoriraImages: j.images, makorira: j })
    })
  }

  componentDidMount = async () => {
    this.getProducts()
  }
  render() {
    return (
      <div className="container" id="shop-now">
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
                      <img src={jps.imageUrl} alt="" />
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
                            this.props.addToCartAsProps(
                              this.state.JPS._id,
                              jps.images[0].imageUrl,
                              this.state.name,
                              this.state.color,
                              this.state.price,
                              this.state.sizes,
                              this.state.total,
                              this.state.sizeAsString,
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
                      <img src={jps.imageUrl} alt="" />
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
                            this.props.addToCartAsProps(
                              this.state.duduDara._id,
                              this.state.duduDara.images[0].imageUrl,
                              this.state.name,
                              this.state.color,
                              this.state.price,
                              this.state.sizes,
                              this.state.total,
                              this.state.sizeAsString,
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
                      <img src={jps.imageUrl} alt="" />
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
                            this.props.addToCartAsProps(
                              this.state.makorira._id,
                              this.makorira.images[0].imageUrl,
                              this.state.name,
                              this.state.color,
                              this.state.price,
                              this.state.sizes,
                              this.state.total,
                              this.state.sizeAsString,
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
      </div>
    )
  }
}

export default Shopnow
