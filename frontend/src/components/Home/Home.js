import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import fulllogo from "../Files/Images/full-logo.png";
//import { api } from "../../services/Axios";
import { api, printError, printMessage } from "../../services/";
import jwt_decode from "jwt-decode";
import login from "../../actions/login";
import fetchProfile from "../../actions/profile";
import "./Home.css";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    //console.log(printError);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      newemail: "",
      newpassword: "",
      loginemail: "",
      loginpassword: "",
      authFlag: false,
      signedUp: false
    };

    this.onChange = this.onChange.bind(this);
    this.usersignup = this.usersignup.bind(this);

    /******CHECK FOR APPLICANT LOGIN *********/

		let user = sessionStorage.getItem('user_id');
		let profile = sessionStorage.getItem('profile');
		let user_token = sessionStorage.getItem('user_token');
		if(profile != 'applicant' || !user || !user_token)
		{
			//Do nothing
    }
    else 
    {
      this.props.history.push("/applicanthome");
    }


		/*****************************************/


  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    try {
      //this.props.dispatch(fetchProfile());
      if (nextProps.LoginReducer.user_id && nextProps.LoginReducer.user_token) {
        this.props.history.push("/profile");
      }
    } catch (e) {
      console.log(e);
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }

  handleLogin = async e => {
    let data = {
      email: this.state.loginemail, //"saketthakare@gmail.com",
      password: this.state.loginpassword
    };
    this.props.dispatch(login(data));
    /* let _t = this;
      let data = {
        "email": this.state.loginemail,//"saketthakare@gmail.com",
        "password": this.state.loginpassword
      };
      console.log(data);
      try {
        let ret = await api('POST','/auth/login',data);
        console.log(ret);
        if(ret.status>=200 && ret.status<300)
        {
            var decoded = jwt_decode(ret['data']['token']);
            sessionStorage.setItem("user_id",decoded['sub']);
            sessionStorage.setItem("profile",decoded['role']);
            sessionStorage.setItem("user_token",ret['data']['token']);
            printMessage("Login successful.");
            _t.setState({
              loginemail : '',
              loginpassword : ''
            });
        }
      } catch (error) {
        console.log(error); 
        //console.log( error.response);
        printError(error);
      } */
  };

  async usersignup() {
    let _t = this;
    let data = {
      email: this.state.email,
      password: this.state.password,
      role: "applicant",
      name: {
        first: this.state.firstname,
        last: this.state.lastname
      }
    };
    console.log(data);
    try {
      let ret = await api("POST", "/auth/signup", data);
      console.log(ret);
      console.log();
      if (ret.status >= 200 && ret.status < 300) {
        printMessage(
          "Success! You have registered successfully! Please login to continue"
        );
        _t.setState({
          email: "",
          password: "",
          firstname: "",
          lastname: ""
        });
      } else {
        throw "error";
      }
    } catch (error) {
      console.log(Object.keys(error), error.response);
      printError(error);
    }
  }

  render() {
    return (
      <div>
        {/*  HTML / CSS */}

        <div class="wrapper">
          <div class="header-wrapper">
            <nav class="navbar navbar-expand-lg linkedin-signup-nav">
              <a class="navbar-brand" href="#">
                <img class="login-logo-image" src={fulllogo} alt="" />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon" />
              </button>
              <ul class="navbar-nav mr-auto">
                <li class="nav-item no-padding">
                  <form class="form-inline my-2 my-lg-0 signup-form">
                    <input
                      class="form-control mr-sm-2"
                      type="text"
                      id="loginemail"
                      name="loginemail"
                      onChange={this.onChange}
                      value={this.state.loginemail}
                      placeholder="Email"
                      aria-label="Email"
                    />
                    <input
                      class="form-control mr-sm-2"
                      id="loginpassword"
                      name="loginpassword"
                      type="password"
                      onChange={this.onChange}
                      value={this.state.loginpassword}
                      placeholder="Password"
                      aria-label="Password"
                    />
                    <button
                      class="btn btn-outline-success signup-login-button my-2 my-sm-0"
                      type="button"
                      onClick={this.handleLogin}
                    >
                      Log In
                    </button>
                  </form>
                </li>
                <li class="nav-item signup-forgot-password no-padding">
                  <a class="nav-link" href="#">
                    Forgot Password?
                  </a>
                </li>
                <li class="nav-item signup-forgot-password no-padding">
                  <Link class="nav-link" to="/recruitersignup">
                    {" "}
                    Recruiter?{" "}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div class="signup-body">
            <div class="signup-body-background">
              <div class="signup-form-lower">
                <h2 class="signup-title">Be great at what you do</h2>
                <h3 class="signup-title-small">Get started - it's free.</h3>

                <div class="form-fields">
                  <div class="form-group">
                    <label for="formGroupExampleInput">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      onChange={this.onChange}
                      value={this.state.firstname}
                      name="firstname"
                      id="firstname"
                      autocomplete="off"
                    />
                  </div>
                  <div class="form-group">
                    <label for="formGroupExampleInput">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      onChange={this.onChange}
                      value={this.state.lastname}
                      name="lastname"
                      id="lastname"
                      autocomplete="off"
                    />
                  </div>
                  <div class="form-group">
                    <label for="formGroupExampleInput">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      onChange={this.onChange}
                      value={this.state.email}
                      name="email"
                      id="email"
                      autocomplete="off"
                    />
                  </div>
                  <div class="form-group">
                    <label for="formGroupExampleInput">
                      Password (6 or more characters)
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      onChange={this.onChange}
                      value={this.state.password}
                      id="password"
                      name="password"
                      autocomplete="off"
                    />
                  </div>
                  <div class="agreement">
                    By clicking Join now, you agree to the LinkedIn{" "}
                    <a tabindex="4" href="javascript:void(0)">
                      User Agreement
                    </a>
                    ,{" "}
                    <a tabindex="4" href="javascript:void(0)">
                      Privacy Policy
                    </a>
                    , and
                    <a tabindex="4" href="javascript:void(0)">
                      Cookie Policy
                    </a>
                    .
                  </div>

                  <button
                    className="btn signup-button"
                    type="button"
                    onClick={this.usersignup}
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="meter">
            <form class="same-name-search" method="GET" action="">
              <h3 class="title">Find a colleague</h3>
              <input
                type="text"
                name="first"
                placeholder="First name"
                aria-label="Enter colleague's first name"
              />
              <input
                type="text"
                name="last"
                placeholder="Last name"
                aria-label="Enter colleague's last name"
              />
              <input
                type="hidden"
                name="trk"
                value="uno-reg-guest-home-name-search"
              />
              <input
                type="submit"
                class="submit-btn"
                name="search"
                value="Search"
                disabled=""
              />
            </form>
            <div class="directory">
              <h3 class="title">LinkedIn member directory: </h3>
              <ol>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter A"
                  >
                    A
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter B"
                  >
                    B
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter C"
                  >
                    C
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter D"
                  >
                    D
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter E"
                  >
                    E
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter F"
                  >
                    F
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter G"
                  >
                    G
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter H"
                  >
                    H
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter I"
                  >
                    I
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter J"
                  >
                    J
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter K"
                  >
                    K
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter L"
                  >
                    L
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter M"
                  >
                    M
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter N"
                  >
                    N
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter O"
                  >
                    O
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter P"
                  >
                    P
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter Q"
                  >
                    Q
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter R"
                  >
                    R
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter S"
                  >
                    S
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter T"
                  >
                    T
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter U"
                  >
                    U
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter V"
                  >
                    V
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter W"
                  >
                    W
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter X"
                  >
                    X
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter Y"
                  >
                    Y
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View LinkedIn member's whose first name start with the letter Z"
                  >
                    Z
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    aria-label="View more LinkedIn members"
                  >
                    More
                  </a>
                </li>
                <li class="country-search">
                  <a href="javascript:void(0)">Browse by country/region</a>
                </li>
              </ol>
            </div>
            <div class="links-container ghp-footer">
              <div class="links links-general ghp-footer__section">
                <h3 class="title ghp-footer__section-title">General</h3>
                <ul class="ghp-footer__links">
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://www.linkedin.com/start/join?trk=uno-reg-guest-home-join"
                      class="ghp-footer__link"
                      aria-label="LinkedIn sign up"
                    >
                      Sign Up
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://www.linkedin.com/help/linkedin?trk=uno-reg-guest-home-help-center&amp;lang=en"
                      class="ghp-footer__link"
                      aria-label="LinkedIn help center"
                    >
                      Help Center
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://press.linkedin.com/about-linkedin?trk=uno-reg-guest-home-about"
                      class="ghp-footer__link"
                      aria-label="LinkedIn about"
                    >
                      About
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://press.linkedin.com?trk=uno-reg-guest-home-press"
                      class="ghp-footer__link"
                      aria-label="LinkedIn Press"
                    >
                      Press
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://blog.linkedin.com?trk=uno-reg-guest-home-blog"
                      class="ghp-footer__link"
                      aria-label="LinkedIn Blog"
                    >
                      Blog
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://www.linkedin.com/company/linkedin/careers?trk=uno-reg-guest-home-careers"
                      class="ghp-footer__link"
                      aria-label="LinkedIn Careers"
                    >
                      Careers
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://developer.linkedin.com?trk=uno-reg-guest-home-developers"
                      class="ghp-footer__link"
                      aria-label="LinkedIn Developers"
                    >
                      Developers
                    </a>
                  </li>
                </ul>
              </div>
              <div class="links links-business ghp-footer__section">
                <h3 class="title ghp-footer__section-title">
                  Business Solutions
                </h3>
                <ul class="ghp-footer__links">
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://business.linkedin.com/talent-solutions?src=li-footer&amp;utm_source=linkedin&amp;utm_medium=footer&amp;trk=uno-reg-guest-home-enterprise-talent"
                      class="ghp-footer__link"
                      aria-label="LinkedIn Talent Solutions"
                    >
                      Talent
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://business.linkedin.com/marketing-solutions?src=li-footer&amp;utm_source=linkedin&amp;utm_medium=footer&amp;trk=uno-reg-guest-home-enterprise-marketing"
                      class="ghp-footer__link"
                      aria-label="LinkedIn Marketing Solutions"
                    >
                      Marketing
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://business.linkedin.com/sales-solutions?src=li-footer&amp;utm_source=linkedin&amp;utm_medium=footer&amp;trk=uno-reg-guest-home-enterprise-sales"
                      class="ghp-footer__link"
                      aria-label="LinkedIn Sales Solutions"
                    >
                      Sales
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://learning.linkedin.com?src=li-footer&amp;trk=uno-reg-guest-home-enterprise-learning"
                      class="ghp-footer__link"
                      aria-label="LinkedIn Learning Solutions"
                    >
                      Learning
                    </a>
                  </li>
                </ul>
              </div>
              <div class="links links-browse ghp-footer__section">
                <h3 class="title ghp-footer__section-title">Browse LinkedIn</h3>
                <ul class="ghp-footer__links">
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://www.linkedin.com/learning/?trk=uno-reg-guest-home-learning"
                      class="ghp-footer__link"
                      aria-label="LinkedIn Learning"
                    >
                      Learning
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://www.linkedin.com/jobs?trk=uno-reg-guest-home-jobs"
                      class="ghp-footer__link"
                      aria-label="LinkedIn Jobs"
                    >
                      Jobs
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://www.linkedin.com/salary/?trk=uno-reg-guest-home-salary"
                      class="ghp-footer__link"
                      aria-label="LinkedIn Salary"
                    >
                      Salary
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://mobile.linkedin.com?trk=uno-reg-guest-home-mobile"
                      class="ghp-footer__link"
                      aria-label="LinkedIn Mobile"
                    >
                      Mobile
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://www.linkedin.com/profinder?trk=uno-reg-guest-home-profinder"
                      class="ghp-footer__link"
                      aria-label="LinkedIn ProFinder"
                    >
                      ProFinder
                    </a>
                  </li>
                </ul>
              </div>
              <div class="links links-directories ghp-footer__section">
                <h3 class="title ghp-footer__section-title">Directories</h3>
                <ul class="ghp-footer__links">
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://www.linkedin.com/directory/people-a?trk=uno-reg-guest-home-people-directory"
                      class="ghp-footer__link"
                      aria-label="LinkedIn members directory"
                    >
                      Members
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://www.linkedin.com/directory/companies/?trk=uno-reg-guest-home-companies-directory"
                      class="ghp-footer__link"
                      aria-label="LinkedIn companies directory"
                    >
                      Companies
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://www.linkedin.com/directory/salaries?trk=uno-reg-guest-home-salaries-directory"
                      class="ghp-footer__link"
                      aria-label="LinkedIn salaries directory"
                    >
                      Salaries
                    </a>
                  </li>
                  <li class="ghp-footer__link-item">
                    <a
                      href="https://www.linkedin.com/directory/universities?trk=uno-reg-guest-home-universities"
                      class="ghp-footer__link"
                      aria-label="LinkedIn universities directory"
                    >
                      Universities
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="legal-nav">
              <div class="copyright">
                <img
                  class="logo-copyright lazy-loaded"
                  alt="LinkedIn"
                  src="https://static.licdn.com/sc/h/5koy91fjbrc47yhwyzws65ml7"
                />{" "}
                © 2018
              </div>
              <ul>
                <li>
                  <a href="https://www.linkedin.com/legal/user-agreement?trk=uno-reg-guest-home-user-agreement">
                    User Agreement
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/legal/privacy-policy?trk=uno-reg-guest-home-privacy-policy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/help/linkedin/answer/34593?lang=en&amp;trk=uno-reg-guest-home-community-guidelines">
                    Community Guidelines
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/legal/cookie-policy?trk=uno-reg-guest-home-cookie-policy">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/legal/copyright-policy?trk=uno-reg-guest-home-copyright-policy">
                    Copyright Policy
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/psettings/guest-controls?trk=uno-reg-guest-home-guest-controls">
                    Guest Controls
                  </a>
                </li>
                <li class="lang-selector-container">
                  <label
                    for="lang-selector-state"
                    class="lang-selector-state-label"
                    tabindex="0"
                    role="button"
                    aria-expanded="false"
                  >
                    Language
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/*  HTML / CSS */}
      </div>
    );
  }
}

//export default HomePage;

/* function mapStateToProps(state) {
  console.log("in map state details view123",state);
  return {
   LoginReducer: state.LoginReducer
  }
//  return { property_detail: state.fetch_details_view.property_detail,
//  };
}

export default connect(
  mapStateToProps
)(HomePage); */

function mapStateToProps(state) {
  console.log("in map state details profileVIEW", state);
  return state;
  //  return { property_detail: state.fetch_details_view.property_detail,
  //  };
}

export default connect(mapStateToProps)(HomePage);
