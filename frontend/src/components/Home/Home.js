import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import { ROOT_URL } from "../../config/config";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      newemail: "",
      newpassword: "",
      authFlag: false
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }

  render() {
    return (
      <div>
        {/*  HTML / CSS */}

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            onChange={this.onChange}
            id="email"
            placeholder="Email"
            name="email"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            onChange={this.onChange}
            id="password"
            placeholder="Password"
            name="password"
          />
        </div>

        <button type="submit" onClick={this.handleLogin} className="btn btn-md">
          Login
        </button>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={this.onChange}
            id="firstname"
            placeholder="First Name"
            name="firstname"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={this.onChange}
            id="lastname"
            placeholder="Last Name"
            name="lastname"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            onChange={this.onChange}
            id="newemail"
            placeholder="Email"
            name="newemail"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            onChange={this.onChange}
            id="newpassword"
            placeholder="Password"
            name="newpassword"
          />
        </div>
        <button
          type="submit"
          onClick={this.handleSignUp}
          className="btn btn-md"
        >
          Sign up
        </button>

        {/*  HTML / CSS */}
      </div>
    );
  }
}

export default HomePage;
