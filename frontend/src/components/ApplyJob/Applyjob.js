import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../Common/Header";
import { set_active_id } from "../../actions/jobCardActiveId";
import { api, printError, printMessage } from "../../services/";
import jwt_decode from "jwt-decode";
import "./Applyjob.css";
import { connect } from "react-redux";
import Watch from "../Files/Images/Watch.svg";
import Logo from "../Files/Images/linkedinlogo.png";
import $ from "jquery";
import { IMAGE_PATHS, S3_URL } from "../../constants/routes";

class ApplyJob extends React.Component {
  state = {};
  render() {
    return (
      <div>
        {" "}
        <Header />
        <section class="applyjobs container col-md-10">
          <div class="row">
            <div class="col-md-10">
              <hr />
              <span class="applylogo">
                {" "}
                <i class="fab fa-linkedin-in" /> &nbsp;&nbsp;
              </span>
              <span class="lightgreytext"> Apply for a Job </span>
              <hr />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ApplyJob;
