import React, { Component } from "react";
import { IMAGE_PATHS } from "../../constants/routes";
import { Link } from "react-router-dom";
import "./PostJobHeader.css";
import jobslogo from "../Files/Images/jobslogo.png";
class PostJobHeader extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbarstyle">
          <div class="collapse navbar-collapse" id="navbarText">
            <li>
              {" "}
              <img src={jobslogo} class="logocrop" alt="no pic" />{" "}
            </li>

            <ul class="navbar-nav mr-auto liststyle">
              <li class="nav-item active">
                <a class="nav-link links" href="#">
                  HOME{" "}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link links" href="#">
                  POST A JOB
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link links" href="#">
                  {" "}
                  LINKEDIN.COM
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default PostJobHeader;
