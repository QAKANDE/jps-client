import React, { Component } from 'react'

class PrivacyPolicy extends Component {
  state = {}
  render() {
    return (
        <div className="container mt-5 mb-5">
        <iframe
          style={{ width: '100%', height: '500px' }}
          scrolling="auto"
          frameBorder="0"
          src="https://docs.google.com/document/d/e/2PACX-1vSxueQvVfSKytqsgaZS_BG9fvNvkeERX6h0z7LZwRH-tt47_67vNndrDp3EVlvjoQ/pub?embedded=true"
        ></iframe>
      </div>
    )
  }
}

export default PrivacyPolicy
