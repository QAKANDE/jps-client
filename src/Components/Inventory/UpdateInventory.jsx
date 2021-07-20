import React, { Component } from 'react'
import '../../css/Inventory.css'

class UpdateInventory extends Component {
  state = {
    quantity: '',
    details: {},
    stock: [],
    sizes: [],
    size: '',
    sizeId: '',
    color: '',
    stockId: '',
  }

  componentDidMount = async () => {
    const stockk = []
    const productId = this.props.match.params.productId
    const sizes = []
    const response = await fetch(
      `https://mr-oyebode-backend-yqavh.ondigitalocean.app/product/${productId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const details = await response.json()
    details.stock.map((stck) => {
      return stockk.push(stck)
    })
    stockk.map((size) => {
      return size.sizes.map((s) => {
        return sizes.push(s)
      })
    })

    this.setState({ details, stock: stockk, sizes: sizes })
    console.log(this.state.sizes)
  }

  updateInventory = async (e, sizeId, stockId) => {
    e.preventDefault()
    alert(this.state.size)
    // const response = await fetch(
    //   `https://mr-oyebode-backend-yqavh.ondigitalocean.app/update-stock-quantity`,
    //   {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //       productId: this.props.match.params.productId,
    //       sizeId: sizeId,
    //       quantity: this.state.quantity,
    //       stockId: stockId,
    //       size: this.state.size,
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // )
  }
  render() {
    return (
      <div className="container" id="inventory-wrapper">
        <div id="featured-text">
          <h2>{this.state.details.name}</h2>
        </div>
        <table style={{ width: '100%' }}>
          <tr>
            <th>Color</th>
            <th>Size/Quantity</th>
          </tr>
          {this.state.stock.map((stck) => {
            return (
              <tr>
                <td>{stck.color}</td>
                {stck.sizes.map((siz) => {
                  return (
                    <tr>
                      <td>{siz.size}/ </td>
                      <td> {siz.quantity}</td>
                    </tr>
                  )
                })}
              </tr>
            )
          })}
        </table>
        <div id="inventory-wrapper">
          <p>Update Stock</p>
          <form>
            <select
              id="drop-down-form"
              onChange={(e) => this.setState({ color: e.currentTarget.value })}
            >
              {this.state.stock.map((stck) => {
                return <option value={stck.color}>{stck.color}</option>
              })}
            </select>
            <select
              className="mx-5"
              id="drop-down-form"
              onChange={(e) => this.setState({ size: e.currentTarget.value })}
            >
              {this.state.sizes.map((stck) => {
                return <option value={stck.size}>{stck.size}</option>
              })}
            </select>
            <input
              htmlFor="quantity"
              type="quantity"
              id="quantity"
              value={this.state.quantity}
              size="md"
              onChange={(e) =>
                this.setState({ quantity: e.currentTarget.value })
              }
              placeholder="Enter quantity"
            ></input>
            <button
              className="mx-5"
              id="inventory-button"
              onClick={(e) => this.updateInventory(e)}
            >
              Update inventory
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default UpdateInventory
