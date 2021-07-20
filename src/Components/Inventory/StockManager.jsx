import React, { Component } from 'react'
import { CardDeck } from 'react-bootstrap'
import '../../css/Inventory.css'
import { Link } from 'react-router-dom'

class StockManager extends Component {
  state = {
    products: [],
  }

  componentDidMount = async () => {
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

    this.setState({
      products,
    })
  }
  render() {
    return (
      <div className="container" id="inventory-wrapper">
        <CardDeck>
          {this.state.products.map((stck) => {
            return (
              <div className="col-sm-4">
                <div id="inventory-card">
                  <p>{stck.name}</p>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Link to={`/update-inventory/${stck._id}`}>
                    <button id="inventory-button">View product</button>
                  </Link>
                </div>
              </div>
            )
          })}
        </CardDeck>
      </div>
    )
  }
}

export default StockManager
