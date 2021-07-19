import React, { Component } from 'react'

class TermsOfSales extends Component {
  state = {}
  render() {
    return (
        <div className="container mt-5 mb-5">
        <iframe
          style={{ width: '100%', height: '500px' }}
          scrolling="auto"
          frameBorder="0"
          src="https://docs.google.com/document/d/e/2PACX-1vSTYSKH-jnoVQPoBxoIke4pAQixwtKm150o1eiLn5OldYtr9U7BwCVXczN0TBT5mg/pub?embedded=true"
        ></iframe>
      </div>
    )
  }
}

export default TermsOfSales
