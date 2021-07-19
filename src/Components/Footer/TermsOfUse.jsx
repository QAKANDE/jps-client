import React, { Component } from 'react'

class TermsOfUse extends Component {
  state = {}
  render() {
    return (
      <div className="container mt-5 mb-5">
        <iframe
          style={{ width: '100%', height: '500px' }}
          scrolling="auto"
          frameBorder="0"
          src="https://docs.google.com/document/d/e/2PACX-1vT3dGolV2Mk9UBCObP03A-KuXNDahmMeo1iv-pt-S0PEoUBKSkro_8yMroYoyQlww/pub?embedded=true"
        ></iframe>
      </div>
    )
  }
}

export default TermsOfUse
