import React, { Component } from 'react'
import { IMAGE_PATHS} from '../../constants/routes';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import { connect } from "react-redux";
import HeaderImage from '../Files/Images/profile-placeholder.png';
import fetchProfile from '../../actions/profile';
import { withRouter } from "react-router";
import ReactAutocomplete from "react-autocomplete";

class Header extends Component {

  constructor(props)
  {
	  super(props);
	  this.state = {
		'username' : 'LinkedIn user',
		'profileimage' : HeaderImage,
		'searchResults' : [
			{ id: 'foo', label: 'fobo' },
			{ id: 'bar', label: 'bar' },
			{ id: 'baz', label: 'baz' },
		],
		'value':'b'
	  }
	  console.log(HeaderImage);
	  this.moveToProf = this.moveToProf.bind(this);
	  console.log(this.props);
  }

  toggleMenu()
  {	
	$(".user-account-settingss").toggleClass("active");
  }

  componentDidMount()
  {

		this.props.dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps)
  {
	  //console.log("HEADER PROPS");
	  //console.log(nextProps);	  
	  try 
	  {
			  let data = nextProps.user_profile.user_profile.user;
			  console.log(data);
			if(data)
			{
				console.log(data.userimage);
				if(!data.profile_image)
				{
					data.profile_image = HeaderImage;
				}
				this.setState({
					'username' : (data.name.first + " " +  data.name.last),
					'profileimage' : data.profile_image
				})
			}
	  }
	  catch(e)
	  {
		  console.log(e);
	  }
  }


  moveToProf()
  {
	  console.log(this.props);
	this.props.history.push("/profile");

  }

  


  onSearchFocus()
  {
	  console.log('focus yes');
	  $(".searchBtn-left").addClass("rightfocus").removeClass("leftfocus");
	  //$(".searchBtn-right").removeClass("rightfocus");
  }


  onSearchBlur()
  {
	console.log("focus no");
	$(".searchBtn-left").addClass("leftfocus").removeClass("rightfocus");
	//$(".searchBtn-left").removeClass("leftfocus");
	  //$(".searchBtn-right").addClass("rightfocus");
  }

  render() {
	const commonProps = {
		'onFocus': this.onSearchFocus,
		'onBlur' : this.onSearchBlur
	};
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
							
							{/*<!--<input type="text" name="search" placeholder="Search..." />-->*/}
						 <ReactAutocomplete
								items={this.state.searchResults}
								shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
								getItemValue={item => item.label}
								inputProps={commonProps}
								wrapperStyle={{ position: 'relative' }}
    							menuStyle={{ position: 'absolute' }}
								renderItem={(item, highlighted) =>
								<div
									key={item.id}
									style={{ backgroundColor: highlighted ? '#eee' : 'transparent',padding : '20px'}}
								>
									{item.label}
								</div>
								}
								value={this.state.value}
								onChange={e => this.setState({ value: e.target.value })}
								onSelect={value => this.setState({ value })}
							/> 
							<button type="button" className="searchBtn-left leftfocus"><i className="fa fa-search"></i></button>
							{/*<!--<button type="button" className="searchBtn-right afterfocusbutton"><i className="fa fa-search afterfocus"></i></button>-->*/}
							
						</form>
					</div>
					<nav>
						<ul>
							<li>
								<a href="#" title="">
									<div>
										<i className="fa fa-home header-icons"></i>
									</div>
									Home
								</a>
							</li>
							<li>
									<a href="#" title="">
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
									<a href="#" title="">
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
							<img src={this.state.profileimage} className="header-image" alt="" />
							<a href="javascript:void(0)">Me<i className="toggler fas fa-chevron-down"></i></a>
							
						</div>
						<div className="user-account-settingss">
							<ul className="us-links">
								<li>
									<a href="javascript:void(0)" title="" className="lower-menu-text"   onClick={this.moveToProf}>
										<img src={this.state.profileimage} className="header-image lower-menu-image" alt="" />
										{this.state.username}<br/>
										<span className="menu-view-profile" >View Profile</span>
									</a>
								</li>
							</ul>
							<h3>Free Upgrade to Premium</h3>
							<h3>Setting</h3>
							<ul className="us-links">
								<li><a href="javascript:void(0)" title="">Account Setting</a></li>
								<li><a href="javascript:void(0)" title="">Privacy</a></li>
								<li><a href="javascript:void(0)" title="">Faqs</a></li>
								<li><a href="javascript:void(0)" title="">Terms & Conditions</a></li>
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
//export default Header;

function mapStateToProps(state) {
    console.log("in map state details profileVIEW",state);
    return state;
  //  return { property_detail: state.fetch_details_view.property_detail,
  //  };
  }
  
  export default withRouter(connect(
    mapStateToProps
  )(Header));
  
  