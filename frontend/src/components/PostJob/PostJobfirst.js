import React, { Component } from "react";
import $ from "jquery";
import Header from "../Common/Header";
import { connect } from "react-redux";
import "./PostJob.css";
import PostJobHeader from "./PostJobHeader";
import { Link } from "react-router-dom";
import { api, printError, printMessage } from "../../services/";

//import Navabar

class PostJobfirst extends Component {
  constructor(props) {
    super(props);

    console.log("Inside constructor");

    console.log("history push data", this.props.location.state);

    const { company, title, address } = this.props.location.state;
    console.log(company);
    console.log(title);
    console.log(address);

    this.state = {
      title: title,
      company: company,
      description: "",
      industry: "",
      type: "",
      address: {},
      seniority: "",
      recommended: "",
      direct: "",
      text1: "",
      range: "",
      degree: "",
      company_logo: "",
      function: "",
      skills: [],
      easy_apply: true,
      step1flag: true,
      step2flag: false
    };

    this.onChange = this.onChange.bind(this);
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handlestep1Flag = () => {
    this.setState({
      step1flag: true,
      step2flag: false
    });
  };

  handlestep2Flag = () => {
    this.setState({
      step1flag: false,
      step2flag: true
    });
  };

  async jobpost() {
    console.log("Job post ");

    let _t = this;
    let data = {
      title: "Software Developer",
      company: "facebook",
      description:
        "Internship program is open to talended candidates in related discipline. If you are interested in building professional career then apply to Software Developer Intern. This position is open in San Jose, CA. Application deadline is approching soon.",
      industry: "Software",
      type: "Full-time",
      address: {
        _id: "5bf13d982740542bdefb583e",
        street: "1 Washington Street",
        city: "San Jose",
        country: "US",
        zipcode: 95050,
        coordinates: {
          _id: "5bf13d982740542bdefb583f",
          latitude: 37.3380652,
          longitude: -121.93754519999999
        }
      },
      function: "Code Deployment",
      company_logo: "logo.jpg",
      skills: ["java", "c++", " html"],
      easy_apply: true
    };
    console.log(data);
    try {
      let ret = await api("POST", "/auth/jobs", data);
      console.log(ret);
      console.log();
      if (ret.status >= 200 && ret.status < 300) {
        printMessage("Successfully posted a job!");
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
    if (this.state.step1flag) {
      return (
        <div>
          <PostJobHeader />

          <div className="profileform profile">
            <h3>Step 1: What job do you want to post? </h3>
            <br />
            <form>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="company">
                    Company <span style={{ color: "blue" }}>*</span>
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="company"
                    placeholder="Company"
                    value={this.state.company}
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="title">
                    Job title
                    <span style={{ color: "blue" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Job title"
                    value={this.state.title}
                  />
                </div>

                <div class="form-group col-md-4">
                  <label for="address">
                    Location
                    <span style={{ color: "blue" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    placeholder="Location"
                    value={this.state.address}
                  />
                </div>
              </div>
              <div className="form-row">
                <div class="form-group col-md-8">
                  <label for="function">
                    Job function (Select upto 3){" "}
                    <span style={{ color: "blue" }}>*</span>{" "}
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="function"
                    placeholder="Add Job function"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="employmenttype">
                    Employment type <span style={{ color: "blue" }}>*</span>{" "}
                  </label>
                  <select
                    name="employmenttype"
                    className="form-control"
                    style={{ width: "133px", height: "50px" }}
                  >
                    <option disabled value="Select employment type">
                      Select
                    </option>
                    <option value="fulltime">Full time </option>

                    <option value="parttime">Part time</option>
                    <option value="contract">Contract</option>
                    <option value="temporary">Temporary</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-8">
                  <label for="industry">
                    Company Industry <span style={{ color: "blue" }}>*</span>{" "}
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="industry"
                    placeholder="Add company"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="seniority">
                    Seniority level <span style={{ color: "blue" }}>*</span>{" "}
                  </label>
                  <select
                    name="seniority"
                    className="form-control "
                    style={{ width: "133px", height: "50px" }}
                  >
                    <option disabled value="Select seniority level">
                      Internship
                    </option>
                    <option value="fulltime">Entry level</option>
                    <option value="parttime">Associate</option>
                    <option value="contract">Mid senior level</option>
                    <option value="temporary">Director</option>
                    <option value="volunteer">Executive</option>
                    <option value="internship">Non Applicable</option>
                  </select>
                </div>

                <div className="form-group col-md-12">
                  <label for="description">
                    Job description<span style={{ color: "blue" }}>*</span>{" "}
                  </label>
                  <textarea
                    className="form-control"
                    rows="5"
                    cols="20"
                    name="aboutme"
                    id="description"
                    style={{ height: 100, width: 500 }}
                    placeholder="Job description"
                    maxLength="400"
                  />
                </div>
              </div>

              <p>
                How would you like to receive your applicants?{" "}
                <span style={{ color: "blue" }}>*</span>{" "}
              </p>
              <div className="form-group col-md-8">
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    id="recommended"
                    name="recommended"
                    class="custom-control-input"
                  />

                  <label class="custom-control-label" for="recommended">
                    <span style={{ "font-weight": "bold" }}>Recommended:</span>{" "}
                    Let candidates apply with their LinkedIn profile and notify
                    me by email
                  </label>
                </div>
                <input
                  type="text"
                  class="form-control"
                  style={{ width: "100%" }}
                  name="text1"
                  id="text1"
                  placeholder="xyz@gmail.com"
                />
              </div>
              <div className="form-group col-md-8">
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    id="direct"
                    name="direct"
                    class="custom-control-input"
                  />
                  <label class="custom-control-label" for="direct">
                    Direct applicants to an external site to apply
                  </label>
                </div>
                <input
                  type="text"
                  class="form-control"
                  name="text2"
                  id="text2"
                  placeholder="http://yourcompany.com/job123"
                />
              </div>

              <button
                type="button"
                style={{ "margin-top": "1%" }}
                onClick={this.handlestep2Flag}
                data-control-name="jobs_targeting_continue"
                data-test-target-continue=""
                class="button-large"
                data-is-animating-click="true"
              >
                <span>Continue</span>
              </button>
            </form>
          </div>
        </div>
      );
    } else if (this.state.step2flag) {
      return (
        <div>
          <PostJobHeader />

          <div className="profileform1 profile1">
            <h2>Step 2: What are the right qualifications for your job?</h2>

            <p>
              {" "}
              What are some of the skills needed for this job? (Select up to 10)
            </p>

            <p>
              What range of relevant experience are you looking for?
              <span> 1 to 5 years </span>
            </p>

            <div class="slidecontainer">
              <input
                type="range"
                min="1"
                max="100"
                value="50"
                class="slider"
                name="range "
                id="range"
                onChange={this.onChange}
                value={this.state.range}
              />
              <span> {this.state.range} </span>>
            </div>
            <p>
              {" "}
              What level of education are you looking for? (Select up to 5)
            </p>

            <div class="form-group col-md-4">
              <select
                name="degree"
                id="degree"
                className="form-control "
                style={{ width: "183px", height: "50px" }}
              >
                <option hidden value="Select degree">
                  Add degree
                </option>
                <option value="High SchoolDiploma"> High School Diploma</option>
                <option value="AssociatesDegree"> Associate's Degree</option>
                <option value=" BachelorsDegree"> Bachelor's Degree</option>
                <option value="MastersDegree">Master's Degree</option>
                <option value="MasterofBusinessAdministration">
                  Master of Business Administration
                </option>
                <option value="DoctorofPhilosophy">Doctor of Philosophy</option>
                <option value="DoctorofMedicine">Doctor of Medicine</option>
                <option value="DoctorofLaw">Doctor of Law</option>
              </select>
            </div>

            <div className="row">
              <div className="col-md-8">
                <button
                  className="btn btn-primary-outline"
                  onClick={this.handlestep1Flag}
                >
                  Back
                </button>
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  style={{ "margin-top": "1%" }}
                  onClick={this.jobpost}
                  data-control-name="jobs_targeting_continue"
                  data-test-target-continue=""
                  class="button-large2"
                  data-is-animating-click="true"
                >
                  <span>Post job</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  console.log("Inside map state to props ", state);
}

const mapDispachToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(PostJobfirst);



