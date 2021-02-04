import React, { Component } from "react";
import jpglogo from "../../assets/logo2.png";
import "../../css/NavSocialMedia.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faStar,
  faCrosshairs,
  faShoppingCart,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LittleCart from "../LittleCart";

class NavSocialMedia extends Component {
  state = {
    displayLittleCart: false,
  };

  displayCart = () => {
    this.setState({ displayLittleCart: true });
  };
  render() {
    return (
      <header id="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <Link to="/">
                  <img
                    src="https://johnpaulstephen.com/wp-content/uploads/2020/05/johnPaulStephenLOGOhead-1.png"
                    style={{ width: "12%" }}
                  />
                </Link>
              </div>
              <div className="col-sm-6">
                <div className="d-flex justidy-content-between social-icons pull-right">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/p/CEw_yF1hwML/?igshid=1w3pklytbaat"
                        target="_blank"
                      >
                        <i class="fa fa-instagram"></i>
                      </a>
                    </li>

                    <li>
                      <a href="#">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <Link to={"/"}>
                    <img src={jpglogo} alt="logo" id="logo" />
                  </Link>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="d-flex flex-row shop-menu clearfix pull-right">
                  <ul>
                    <li>
                      <Link to="/account">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="navbar-icon"
                        />{" "}
                        Account
                      </Link>
                    </li>
                    <li>
                      <Link to="/wishlist">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="navbar-icon"
                        />{" "}
                        Wishlist
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/checkout">
                        <FontAwesomeIcon icon={faCrosshairs} /> Checkout
                      </Link>
                    </li> */}
                    <li>
                      <Link to="/cart">
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          className="navbar-icon"
                        />{" "}
                        Cart
                      </Link>
                    </li>
                    <span className="badge badge-warning" id="lblCartCount">
                      {this.props.itemsLength}{" "}
                    </span>
                    <li>
                      <Link to={"/login"}>
                        <FontAwesomeIcon
                          icon={faLock}
                          className="navbar-icon"
                        />{" "}
                        Login
                      </Link>
                    </li>
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
    );
  }
}

export default NavSocialMedia;
