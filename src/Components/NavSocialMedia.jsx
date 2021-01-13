import React, { Component } from 'react';
import jpglogo from "../assets/logo2.png"
import "../css/NavSocialMedia.css"
import {Link} from "react-router-dom"



class NavSocialMedia extends Component {
    state = {  }
    render() { 
        return ( 
            <header id="header">
            <div className="header_top">
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<div className="contactinfo">
							<ul className="nav nav-pills">
								<li><a href="#"><i className="fa fa-phone"></i> +2 95 01 88 821</a></li>
								<li><a href="#"><i className="fa fa-envelope"></i> info@domain.com</a></li>
							</ul>
						</div>
					</div>
                            <div className="col-sm-6">
                                <div className="d-flex justidy-content-between social-icons pull-right">
                                    <ul>
                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
								<li><a href="#"><i className="fa fa-twitter"></i></a></li>
								<li><a href="#"><i className="fa fa-linkedin"></i></a></li>
								<li><a href="#"><i className="fa fa-dribbble"></i></a></li>
								<li><a href="#"><i className="fa fa-google-plus"></i></a></li>
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
                                    <Link to={"/"}><img src={ jpglogo} alt="logo" id="logo" /></Link>
						</div>
					</div>
                            <div className="col-md-8 clearfix">
                                <div className="d-flex flex-row shop-menu clearfix pull-right">
                                    <ul>
                                   <li><a href=""><i className="fa fa-user"></i> Account</a></li>
								<li><a href=""><i className="fa fa-star"></i> Wishlist</a></li>
								<li><a href="checkout.html"><i className="fa fa-crosshairs"></i> Checkout</a></li>
										<li>
											<Link to={"/cart"}><i className="fa fa-shopping-cart"></i> Cart</Link></li>
								<li><a href="login.html"><i className="fa fa-lock"></i> Login</a></li> 
                                    </ul>
                                 </div>
					</div>
				</div>
			</div>
                </div>
            </header>
         );
    }
}
 
export default NavSocialMedia;