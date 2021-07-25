import React, { Component } from 'react'
import jpglogo from '../../assets/logo2.png'
import '../../css/NavSocialMedia.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faStar,
  faCrosshairs,
  faShoppingCart,
  faHome,
  faLock,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import LittleCart from '../LittleCart'

class NavSocialMedia extends Component {
  state = {
    displayLittleCart: false,
    cartLength: sessionStorage.getItem('cart_items'),
  }

  displayCart = () => {
    this.setState({ displayLittleCart: true })
  }
  render() {
    return (
      <header id="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="d-flex justify-content-between social-icons pull-right">
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/johnpaulstephenofficial"
                      target="_blank"
                    >
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/JohnPaulStephe8"
                      target="_blank"
                    >
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href=" https://www.youtube.com/channel/UC-fAzdzdg7gR8RzsSQkq43Q"
                      target="_blank"
                    >
                      <i class="fa fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href=" https://www.instagram.com/johnpaulstephen_jps/"
                      target="_blank"
                    >
                      <i class="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <Link to={'/'}>
                    <img src={jpglogo} alt="logo" id="logo" />
                  </Link>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="d-flex flex-row shop-menu clearfix pull-right">
                  <ul>
                    {/* <li>
                      <Link to="/account">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="navbar-icon"
                        />{' '}
                        Account
                      </Link>
                    </li>
                    <li>
                      <Link to="/wishlist">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="navbar-icon"
                        />
                        Wishlist
                      </Link>
                    </li> */}
                    <Link to="/" style={{ color: '#696763' }}>
                      <li>
                        <FontAwesomeIcon icon={faHome} /> Home
                      </li>
                    </Link>
                    <Link to="/cart" style={{ color: '#696763' }}>
                      <li>
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          className="navbar-icon"
                        />{' '}
                        Cart
                      </li>
                      <span className="badge badge-warning" id="lblCartCount">
                        {this.props.cartLength}
                      </span>
                    </Link>
                    {/* <li>
                      <Link to={'/login'}>
                        <FontAwesomeIcon
                          icon={faLock}
                          className="navbar-icon"
                        />{' '}
                        Login
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            {this.state.displayLittleCart === true ? (
              <div>
                <LittleCart />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </header>
    )
  }
}

export default NavSocialMedia
