import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import logoTrademark from '../../assets/logo_trademark.png'

class AboutUs extends Component {
  state = {}
  render() {
    return (
      <Container>
        <div style={{ marginTop: '3rem', marginBottom: '5rem' }}>
          <h5 className="text-center">About John Paul Stephen</h5>
          <p className="mt-4">
            The brand name, John Paul Stephen, was inspired by the three sons'
            Italian names (Giovanni, Paolo, and Stefano) of founders of the
            brand. Each name symbolizes a unique quality which we have imbibed
            in our core values.
          </p>
          <p>
            {' '}
            A concatenation of these names "John Paul Stephen" birthed a brand
            driven by a passion for our heritage. John Paul Stephen exudes a
            culture of unbridled commitment to excellence.
          </p>
          <p>
            Welcome to John Paul Stephen, A British Fashion Brand with an
            African Heritage.
          </p>
          <div className="text-right mt-5">
            <img
              src={logoTrademark}
              style={{
                width: '50%',
              }}
            />
          </div>
        </div>
      </Container>
    )
  }
}

export default AboutUs
