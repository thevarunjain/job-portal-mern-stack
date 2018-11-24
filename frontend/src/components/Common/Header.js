import React, { Component } from 'react'
import { IMAGE_PATHS} from '../../constants/routes';
import { Link } from 'react-router-dom'
import $ from 'jquery';

class Header extends Component {

  constructor(props)
  {
	  super(props);
  }

  toggleMenu()
  {	
	$(".user-account-settingss").toggleClass("active");
  }

  render() {
    return (
      <div>
        <header>
			<div className="container">
				<div className="header-data">
					<div className="logo">
						<a href="/" title=""><img className="header-logo" src={require('../Files/Images/linkedinlogo.png')} alt="" /></a>
					</div>
					<div className="search-bar">
						<form>
							
							<input type="text" name="search" placeholder="Search..." />
							<button type="button"><i className="fa fa-search"></i></button>
							<button type="button" className="afterfocusbutton"><i className="fa fa-search afterfocus"></i></button>
							
						</form>
					</div>
					<nav>
						<ul>
							<li>
								<a href="index.html" title="">
									<div>
										<i className="fa fa-home header-icons"></i>
									</div>
									Home
								</a>
							</li>
							<li>
									<a href="index.html" title="">
										<div>
											<i className="fa fa-user-friends header-icons"></i>
										</div>
										My Network
									</a>
								</li>
							<li>
									<Link to= "/jobshome">
										<div>
											<i className="fa fa-briefcase header-icons"></i>
										</div>
										Jobs
									</Link>
							</li>
							<li>
									<a href="index.html" title="">
										<div>
											<i className="fa fa-bell header-icons"></i>
										</div>
										Notifications
									</a>
							</li>
							<li>
									<Link to="/message">
										<div>
											<i className="fa fa-comment-alt header-icons"></i>
										</div>
										Messaging
									</Link>
							</li>
							{/* <!--<li>
								<a href="profiles.html" title="">
									<span><img src="images/icon4.png" alt=""></span>
									Profiles
								</a>
								<ul>
									<li><a href="user-profile.html" title="">User Profile</a></li>
									<li><a href="my-profile-feed.html" title="">my-profile-feed</a></li>
								</ul>
							</li>
							<li>
								<a href="jobs.html" title="">
									<span><img src="images/icon5.png" alt=""></span>
									Jobs
								</a>
							</li>
							<li>
								<a href="#" title="" className="not-box-open">
									<span><img src="images/icon6.png" alt=""></span>
									Messages
								</a>
								<div className="notification-box msg">
									<div className="nt-title">
										<h4>Setting</h4>
										<a href="#" title="">Clear all</a>
									</div>
									<div className="nott-list">
										<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img1.png" alt="">
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="messages.html" title="">Jassica William</a> </h3>
							  					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</p>
							  					<span>2 min ago</span>
							  				</div> 
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img2.png" alt="">
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="messages.html" title="">Jassica William</a></h3>
							  					<p>Lorem ipsum dolor sit amet.</p>
							  					<span>2 min ago</span>
							  				</div> 
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img3.png" alt="">
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="messages.html" title="">Jassica William</a></h3>
							  					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua.</p>
							  					<span>2 min ago</span>
							  				</div> 
						  				</div>
						  				<div className="view-all-nots">
						  					<a href="messages.html" title="">View All Messsages</a>
						  				</div>
									</div> 
								</div>
							</li>
							<li>
								<a href="#" title="" className="not-box-open">
									<span><img src="images/icon7.png" alt=""></span>
									Notification
								</a>
								<div className="notification-box">
									<div className="nt-title">
										<h4>Setting</h4>
										<a href="#" title="">Clear all</a>
									</div>
									<div className="nott-list">
										<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img1.png" alt="">
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img2.png" alt="">
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
							  					<span>2 min ago</span>
							  				</div> 
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img3.png" alt="">
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
							  					<span>2 min ago</span>
							  				</div> 
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img2.png" alt="">
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
							  					<span>2 min ago</span>
							  				</div> 
						  				</div>
						  				<div className="view-all-nots">
						  					<a href="#" title="">View All Notification</a>
						  				</div>
									</div> 
								</div> 
							</li>--> */}
						</ul>
					</nav>
					<div className="menu-btn">
						<a href="#" title=""><i className="fa fa-bars"></i></a>
					</div>
					<div className="user-account">
						<div className="user-info" onClick={this.toggleMenu}>
							<img src="http://via.placeholder.com/30x30" alt="" />
							<Link to="/profile">John</Link>
							<i className="la la-sort-down"></i>
						</div>
						<div className="user-account-settingss">
							<h3>Online Status</h3>
							<ul className="on-off-status">
								<li>
									<div className="fgt-sec">
										<input type="radio" name="cc" id="c5" />
										<label for="c5">
											<span></span>
										</label>
										<small>Online</small>
									</div>
								</li>
								<li>
									<div className="fgt-sec">
										<input type="radio" name="cc" id="c6" />
										<label for="c6">
											<span></span>
										</label>
										<small>Offline</small>
									</div>
								</li>
							</ul>
							<h3>Custom Status</h3>
							<div className="search_form">
								<form>
									<input type="text" name="search" />
									<button type="submit">Ok</button>
								</form>
							</div>
							<h3>Setting</h3>
							<ul className="us-links">
								<li><a href="profile-account-setting.html" title="">Account Setting</a></li>
								<li><a href="#" title="">Privacy</a></li>
								<li><a href="#" title="">Faqs</a></li>
								<li><a href="#" title="">Terms & Conditions</a></li>
							</ul>
							<h3 className="tc"><a href="sign-in.html" title="">Logout</a></h3>
						</div>
					</div>
				</div>
			</div>
		</header>

      </div>
    )
  }
}
export default Header;
