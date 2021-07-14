import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import '../../css/Products.css'
import im1 from '../../assets/img1.png'
import im2 from '../../assets/img2.png'
import im3 from '../../assets/img3.png'

class Carou extends Component {
  state = {}
  render() {
    return (
      <div style={{ height: '50%' }}>
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className="d-block"
              src={im1}
              alt="First slide"
              style={{ width: '100%' }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    )
  }
}

export default Carou
