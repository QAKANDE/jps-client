import React, { Component } from 'react'

class CookiePolicy extends Component {
  state = {}
  render() {
    return (
      <div className="container mt-5 mb-5">
        <iframe
          style={{ width: '100%', height: '500px' }}
          scrolling="auto"
          frameBorder="0"
          src="https://docs.google.com/document/d/e/2PACX-1vShpDxA1OFx2gZPRweeTC_eNAaTUFUlQwGmHsnXhzsOqf_k45CdFX-MvEWoNqqwtVOxspaCwiQejBIk/pub?embedded=true"
        ></iframe>
      </div>
    )
  }
}

export default CookiePolicy
