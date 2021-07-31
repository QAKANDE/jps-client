import React, { Component } from 'react'
import '../../css/Jumbo.css'
import { Link } from 'react-router-dom'
import { Row, Col, Card, CardGroup, CardDeck } from 'react-bootstrap'
import one from '../../assets/one.png'
import two from '../../assets/two.png'

class Products extends Component {
  state = {
    carouselProducts: [],
  }
  render() {
    return (
      <>
        <section className="jumbotron">
          {/* <div id="caption-wrapper">
            <div id="caption-second-wrapper">
              <p id="affordable">A British brand with an African heritage</p>
            </div>
          </div> */}
          <div id="shop-now-wrapper">
            <Link to="/allProducts" className="button">
              SHOP NOW
              <i className="fa fa-arrow-right mx-3 fa-1x" id="arrow-icon"></i>
            </Link>
          </div>
          {/* <div id="jumbo-all-wrapper">
            <div id="jumbo-text-wrapper">
              <p id="affordable">A British brand with an African heritage</p>
            </div>
            <div id="jumbo-text-wrapper">
              <Link to="/allProducts" className="button">
                SHOP NOW
                <i
                  className="fa fa-arrow-right mx-3 fa-1x"
                  style={{ color: 'black' }}
                ></i>
              </Link>
            </div>
          </div> */}
        </section>
      </>
    )
  }
}

export default Products
