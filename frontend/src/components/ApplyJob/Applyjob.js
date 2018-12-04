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
import PLACES from "../Common/Places";

class ApplyJob extends React.Component {
  constructor(props) {
    super(props);

    console.log("Inside constructor");

    this.state = {
      job_id: this.props.match.params.id,
      first: "",
      last: "",
      phone: "",
      email: "",
      source: "",
      diversity: "",
      sponsorship: "",
      disability: "",
      resume: "",
      cover_letter: "",
      searchLocation: {}
    };

    this.onChange = this.onChange.bind(this);
    this.uploadResume = this.uploadResume.bind(this);
    this.uploadCoverletter = this.uploadCoverletter.bind(this);
    this.Apply = this.Apply.bind(this);
    this.checkret = this.checkret.bind(this);
  }

  async componentDidMount(){
    
    try {
      await api('PUT','/log/startApplication/'+this.state.job_id)
    } catch (error) {
      console.log(Object.keys(error), error.response);
      printError(error); //Pass Full response object to the printError method.
    }
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  checkret(data) {
    console.log(data);
    this.setState({
      searchLocation: data
    });
  }

  async uploadResume(e) {
    console.log("RESUMES", e);

    var fd = new FormData();
    var filesList = document.getElementById("uploadResume").files;
    if (!filesList[0].name.match(/.(pdf|doc|docx)$/i)) {
      printMessage("Please select an pdf/doc/docx file to upload.");
      return false;
    }
    fd.append("uploadSelect", filesList[0]);
    console.log(fd);

    try {
      let ret = await api("POST", "/document/upload", fd, {
        "Content-Type": "multipart/form-data"
      });
      console.log(ret);
      if (ret.status >= 200 && ret.status < 300) {
        let data = {
          resume_url: S3_URL + ret["data"]["payLoad"]
        };
        printMessage("Resume added Successfully.");
        this.setState({
          resume: data.resume_url
        });
      }
    } catch (error) {
      console.log(Object.keys(error), error.response);
      printError(error); //Pass Full response object to the printError method.
    }
  }

  async uploadCoverletter(e) {
    console.log("COVER LETTER", e);

    var fd = new FormData();
    var filesList = document.getElementById("uploadCoverletter").files;
    if (!filesList[0].name.match(/.(pdf|doc|docx)$/i)) {
      printMessage("Please select an pdf/doc/docx file to upload.");
      return false;
    }
    fd.append("uploadSelect", filesList[0]);
    console.log(fd);

    try {
      let ret = await api("POST", "/document/upload", fd, {
        "Content-Type": "multipart/form-data"
      });
      console.log(ret);
      if (ret.status >= 200 && ret.status < 300) {
        let data = {
          resume_url: S3_URL + ret["data"]["payLoad"]
        };
        printMessage("Cover letter added Successfully.");
        this.setState({
          cover_letter: data.resume_url
        });
      }
    } catch (error) {
      console.log(Object.keys(error), error.response);
      printError(error); //Pass Full response object to the printError method.
    }
  }

  async Apply(e) {
    e.preventDefault();
    console.log(this.state);

    // if (
    //   this.state.first &&
    //   this.state.last &&
    //   this.state.phone &&
    //   this.state.email &&
    //   this.state.diversity &&
    //   this.state.sponsorship &&
    //   this.state.disability &&
    //   this.state.source &&
    //   this.state.searchLocation
    // ) {
    let name = {
      first: this.state.first,
      last: this.state.last
    };

    // let address = {
    //   street: "1 Washington Street",
    //   city: "San Jose",
    //   country: "US",
    //   zipcode: "95050",
    //   coordinates: {
    //     latitude: "37.3380652",
    //     longitude: "-121.93754519999999"
    //   }
    // };

    let data = {
      email: this.state.email,
      phone: this.state.phone,
      name,
      address: this.state.searchLocation,
      resume: this.state.resume,
      cover_letter: this.state.cover_letter,
      source: this.state.source,
      diversity: this.state.diversity,
      sponsorship: this.state.sponsorship,
      disability: this.state.disability
    };

    console.log("------------", data);

    try {
      let ret = await api("POST", "jobs/" + this.state.job_id + "/apply", data);

      if (ret.status === 200) {
        printMessage("You have successfully applied to this job ");
      } else {
        throw "error";
      }
    } catch (error) {
      console.log("ERROR in SAVE", error);
      console.log(Object.keys(error), error.response);
      printError(error);
    }
    // } else {
    //   printMessage("Please entire the required Fields");
    // }
    // return false;
  }

  render() {
    return (
      <div>
        {" "}
        <Header />
        <section class="applyjobs container col-md-10">
          <div class="row apply-style">
            <div class="col-md-10">
              <span class="applylogo">
                {" "}
                <i class="fa-lg fab fa-linkedin-in " /> &nbsp;&nbsp;
              </span>
              <span class="applytitle"> Apply for a Job </span>
              <hr />
            </div>

            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label className="label-style" for="first">
                    First Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="first"
                    name="first"
                    placeholder="First Name"
                    onChange={this.onChange}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label className="label-style" for="last">
                    Last Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="last"
                    name="last"
                    placeholder="Last Name"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label className="label-style" for="phone">
                    Phone
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    onChange={this.onChange}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label className="label-style" for="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    id="email"
                    placeholder="Email"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div class="form-group">
                <label className="label-style" for="address">
                  Address
                </label>
                <PLACES onPosition={this.checkret} />
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label className="label-style" for="city">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    class="form-control"
                    id="city"
                    placeholder="City"
                    onChange={this.onChange}
                  />
                </div>
                <div class="form-group col-md-4">
                  <label className="label-style" for="state">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    class="form-control"
                    id="state"
                    placeholder="State"
                    onChange={this.onChange}
                  />
                </div>
                <div class="form-group col-md-2">
                  <label className="label-style" for="zip">
                    Zip
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="zip"
                    placeholder="Zip"
                    onChange={this.onChange}
                  />
                </div>
              </div>
              {/* start here */}

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label className="label-style" for="firstname">
                    Source
                  </label>
                  <input
                    type="text"
                    name="source"
                    class="form-control"
                    id="source"
                    placeholder="Source"
                    onChange={this.onChange}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label className="label-style" for="diversity">
                    Diversity
                  </label>
                  <input
                    type="text"
                    name="diversity"
                    class="form-control"
                    id="diversity"
                    placeholder="Diversity"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label className="label-style" for="sponsorship">
                    Sponsorship
                  </label>
                  <input
                    type="text"
                    name="sponsorship"
                    class="form-control"
                    id="sponsorship"
                    placeholder="Sponsorship"
                    onChange={this.onChange}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label className="label-style" for="disability">
                    Disability
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="disability"
                    name="disability"
                    placeholder="Disability"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              {/* end here */}
              <div class="form-row">
                <div class="form-group col-md-3">
                  <div class="upload-btn-wrapper">
                    <button class="btn btn1"> Resume</button>
                    <input
                      id="uploadResume"
                      type="file"
                      name="resume"
                      onChange={this.uploadResume}
                      required
                    />
                  </div>
                </div>

                <div class="form-group col-md-3">
                  <div class="upload-btn-wrapper">
                    <button class="btn btn1"> Cover letter</button>
                    <input
                      id="uploadCoverletter"
                      type="file"
                      name="cover_letter"
                      onChange={this.uploadCoverletter}
                    />
                  </div>
                </div>
              </div>

              <button onClick={this.Apply} class="btn btn-primary applybutton">
                Apply
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default ApplyJob;
