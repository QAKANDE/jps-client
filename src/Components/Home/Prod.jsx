import React, { Component } from 'react'
import '../../css/Products.css'
import test from '../../assets/JumboImage.jpeg'

class Prod extends Component {
  state = {}
  render() {
    return (
      <>
        {this.props.productsAsProps.map((eachProd) => {
          return (
            <section
              id="prod-jumbo"
              style={{
                backgroundImage: `url(${test})`,
              }}
            ></section>
          )
        })}
      </>
    )
  }
}

export default Prod
