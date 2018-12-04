import React, { Component } from "react";
import Header from "../Common/Header";
import RecruiterHeader from "../Common/RecruiterHeader";
import { IMAGE_PATHS, S3_URL } from "../../constants/routes";
import bannerlogo from "../Files/Images/profile-banner.svg";
import profileplaceholder from "../Files/Images/profile-placeholder.png";
import "./profile.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import $ from "jquery";
import { connect } from "react-redux";
import { api, printError, printMessage } from "../../services/";
import fetchProfile from "../../actions/profile";
import * as moment from "moment";
import PLACES from "../Common/Places";
import { Link } from "react-router-dom";
import JobsbySkill from "../Jobs/JobsBySkill";

window.delrows = function(f) {
  document
    .querySelector("#skillstable tr[data-dellength='" + f + "']")
    .remove();
};
class RecruiterProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: bannerlogo,
      userimage: profileplaceholder,
      firstname: "",
      lastname: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      latitude: "-1",
      longitude: "-1",
      address: "",
      profile: "",
      education: [],
      experience: [],
      resume: "",
      skills: [],
      summary: "",
      createdAt: "",
      updatedAt: "",
      recommended_jobs: []
    };

    try {
      this.openModal.bind = this.openModal.bind(this);
      this.detailModal.bind = this.detailModal.bind(this);
      this.handleChange.bind = this.handleChange.bind(this);
      this.handleSelect.bind = this.handleSelect.bind(this);
      this.handleText = this.handleText.bind(this);
      this.addExperience = this.addExperience.bind(this);
      this.deleteExp = this.deleteExp.bind(this);
      this.addEducation = this.addEducation.bind(this);
      this.deleteEducation = this.deleteEducation.bind(this);
      this.addPersonal = this.addPersonal.bind(this);
      this.delPersonal = this.delPersonal.bind(this);
      this.addSkill = this.addSkill.bind(this);
      this.saveSkills = this.saveSkills.bind(this);
      this.viewPDF = this.viewPDF.bind(this);

    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    // if (sessionStorage.getItem("user_id")) {
    //   try {
    //     let recommendation = await api("GET", `/jobs/recommendation`);

    //     this.setState({
    //       recommended_jobs: recommendation.data.payLoad
    //     });
    //   } catch (error) {
    //     console.log(Object.keys(error), error.response);
    //     printError(error);
    //   }
    // } else {
    //   return;
    // }
    console.log("profile loded");
    console.log(this.props);
    this.props.dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props);
    console.log(nextProps);
    let u = this;
    try {
      if (u.props.user_profile) {
        let userdata = nextProps.user_profile.user_profile.user;
        console.log(moment(userdata["createdAt"]));
        console.log(userdata);
        console.log(userdata);
        if (!userdata["banner_image"]) {
          userdata["banner_image"] = bannerlogo;
        }
        if (!userdata["userimage"]) {
          userdata["userimage"] = profileplaceholder;
        }
        if (!userdata["profile_image"]) {
          userdata["profile_image"] = profileplaceholder;
        }
        if (Object.keys(userdata).indexOf("address") == -1) {
          userdata["address"] = {
            city: "",
            street: "",
            country: "",
            zipcode: ""
          };
        }
        if (Object.keys(userdata).indexOf("education") == -1) {
          userdata["education"] = [];
        }
        if (Object.keys(userdata).indexOf("experience") == -1) {
          userdata["experience"] = [];
        }
        if (Object.keys(userdata).indexOf("resume") == -1) {
          userdata["resume"] = "";
        }
        if (Object.keys(userdata).indexOf("skills") == -1) {
          userdata["skills"] = [];
        }
        if (Object.keys(userdata).indexOf("summary") == -1) {
          userdata["summary"] = "";
        }
        if (Object.keys(userdata).indexOf("address") == -1) {
          userdata["address"] = {
            city: "",
            street: "",
            country: "",
            zipcode: ""
          };
        }

        u.setState({
          firstname: userdata["name"]["first"],
          lastname: userdata["name"]["last"],
          address: userdata["address"],
          city: userdata["address"]["city"],
          street: userdata["address"]["street"],
          country: userdata["address"]["country"],
          zipcode: userdata["address"]["zipcode"],
          banner: userdata["banner_image"],
          userimage: userdata["profile_image"],
          education: userdata["education"],
          experience: userdata["experience"],
          resume: userdata["resume"],
          skills: userdata["skills"],
          summary: userdata["summary"],
          createdAt: userdata["createdAt"],
          updatedAt: userdata["updatedAt"],
          publicid: userdata["id"]
        });
        setTimeout(() => {
          console.log(u.state);
        }, 50);
      }
    } catch (e) {
      console.log(e);
    }
  }

  openModal(d, ex1, ex2) {
    if (d == "EXPERIENCE") {
      $("#educationModal").modal("hide");
      $("#skillsModal").modal("hide");
      $("#personalModal").modal("hide");

      console.log(ex1, ex2);

      //****existing pre fetched values if data exists ****/
      if (ex1 >= 0) {
        let copyval = this.state.experience[ex1];
        console.log(copyval);
        $("#expModal")
          .find("input")
          .eq(2)
          .val(moment(copyval["date"]["startdate"]).format("YYYY-MM-DD"));
        $("#expModal")
          .find("input")
          .eq(3)
          .val(moment(copyval["date"]["enddate"]).format("YYYY-MM-DD"));
        $("#expModal")
          .find("input")
          .eq(0)
          .val(copyval["title"]);
        $("#expModal")
          .find("input")
          .eq(1)
          .val(copyval["company"]);
        $("#expModal")
          .find("input")
          .eq(4)
          .val(copyval["headline"]);
        $("#expModal")
          .find("input")
          .eq(5)
          .val(copyval["location"]);
        $("#expModal")
          .find("input")
          .eq(6)
          .val(copyval["description"]);

        //add edit attributes to the submit values
        $("#expModal").attr("data-ind", ex1);
        $("#expModal").attr("data-id", ex2);
      } else {
        $("#expModal").removeAttr("data-id");
        $("#expModal").removeAttr("data-ind");
        $("#expModal")
          .find("input")
          .eq(2)
          .val("");
        $("#expModal")
          .find("input")
          .eq(3)
          .val("");
        $("#expModal")
          .find("input")
          .eq(0)
          .val("");
        $("#expModal")
          .find("input")
          .eq(1)
          .val("");
        $("#expModal")
          .find("input")
          .eq(4)
          .val("");
        $("#expModal")
          .find("input")
          .eq(5)
          .val("");
        $("#expModal")
          .find("input")
          .eq(6)
          .val("");
      }

      $("#expModal").modal("show");
    } else if (d == "SKILLS") {
      $("#educationModal").modal("hide");
      $("#expModal").modal("hide");
      $("#personalModal").modal("hide");

      $("#skillstable").html("");
      for (var u = 0; u < this.state.skills.length; u++) {
        let currentLength = $("#skillstable").find("tr").length;
        $("#skillstable").append(
          "<tr data-dellength=" +
            currentLength +
            " ><td>" +
            this.state.skills[u] +
            '</td><td><i class="fa fa-trash custom-edit-buttons" onclick=delrows(' +
            currentLength +
            ") ></i></td></tr>"
        );
      }
      $("#skillsModal").modal("show");
    } else if (d == "EDUCATION") {
      $("#skillsModal").modal("hide");
      $("#expModal").modal("hide");
      $("#personalModal").modal("hide");
      //****existing pre fetched values if data exists ****/
      if (ex1 >= 0) {
        let copyval = this.state.education[ex1];
        console.log(copyval);
        $("#educationModal")
          .find("input")
          .eq(4)
          .val(moment(copyval["date"]["startdate"]).format("YYYY-MM-DD"));
        $("#educationModal")
          .find("input")
          .eq(5)
          .val(moment(copyval["date"]["enddate"]).format("YYYY-MM-DD"));
        $("#educationModal")
          .find("input")
          .eq(0)
          .val(copyval["school"]);
        $("#educationModal")
          .find("input")
          .eq(1)
          .val(copyval["degree"]);
        $("#educationModal")
          .find("input")
          .eq(2)
          .val(copyval["field"]);
        $("#educationModal")
          .find("input")
          .eq(3)
          .val(copyval["grade"]);
        $("#educationModal")
          .find("input")
          .eq(6)
          .val(copyval["description"]);

        //add edit attributes to the submit values
        $("#educationModal").attr("data-ind", ex1);
        $("#educationModal").attr("data-id", ex2);
      } else {
        $("#educationModal").removeAttr("data-id");
        $("#educationModal").removeAttr("data-ind");
        $("#educationModal")
          .find("input")
          .eq(2)
          .val("");
        $("#educationModal")
          .find("input")
          .eq(3)
          .val("");
        $("#educationModal")
          .find("input")
          .eq(0)
          .val("");
        $("#educationModal")
          .find("input")
          .eq(1)
          .val("");
        $("#educationModal")
          .find("input")
          .eq(4)
          .val("");
        $("#educationModal")
          .find("input")
          .eq(5)
          .val("");
        $("#educationModal")
          .find("input")
          .eq(6)
          .val("");
      }

      $("#educationModal").modal("show");
    } else if (d == "PERSONAL") {
      $("#skillsModal").modal("hide");
      $("#expModal").modal("hide");
      $("#educationModal").modal("hide");
      $("#personalModal").modal("show");
    }
  }

  detailModal(i, id, type) {
    //alert("Index "+i);
    console.log(i, id, type);
    //Set state from here for all the fields
    this.openModal(type, i, id);
  }

  handleChange = street => {
    this.setState({ street });
  };

  handleText(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        console.log(results); ///formatted_address

        this.setState({
          country: "",
          state: "",
          city: "",
          zipcode: ""
        });
        let tempdata = {};
        let _t = results[0]["address_components"];
        for (var t = 0; t < _t.length; t++) {
          if (_t[t]["types"].indexOf("country") != -1) {
            tempdata["country"] = _t[t]["long_name"];
          }
          if (_t[t]["types"].indexOf("administrative_area_level_1") != -1) {
            tempdata["state"] = _t[t]["long_name"];
          }
          if (_t[t]["types"].indexOf("locality") != -1) {
            tempdata["city"] = _t[t]["short_name"];
          }
          if (_t[t]["types"].indexOf("postal_code") != -1) {
            tempdata["zipcode"] = _t[t]["long_name"];
          }
        }
        //tempdata['latitude'] = coord
        console.log(tempdata);
        this.setState({
          country: tempdata.country,
          state: tempdata.state,
          city: tempdata.city,
          zipcode: tempdata.zipcode,
          street: results[0]["formatted_address"]
        });
        return getLatLng(results[0]);
      })
      .then(par => {
        console.log(par);
        this.setState({
          latitude: par.lat,
          longitude: par.lng
        });
      })
      .catch(error => {
        console.error("Error", error);
      });
  };

  getDiffBetweenDates(d1, d2) {
    var a = moment(d2);
    var b = moment(d1);

    var years = a.diff(b, "year");
    b.add(years, "years");
    //console.log(b);

    var months = a.diff(b, "months");
    b.add(months, "months");
    console.log(years + " years " + months + " months ");
    if (years > 0) {
      return years + " years " + months + " months ";
    } else if (years == 0) {
      return months + " months";
    }
  }




  async addPersonal() {
    let summary = $("#personalModal")
      .find("textarea")
      .eq(0)
      .val();
    let headline = $("#personalModal")
      .find("input")
      .eq(6)
      .val();

    let name = {
      first: $("#personalModal")
        .find("input")
        .eq(0)
        .val(),
      last: $("#personalModal")
        .find("input")
        .eq(1)
        .val()
    };

    let address = {
      street: this.state.street,
      city: this.state.city,
      country: this.state.country,
      zipcode: this.state.zipcode,
      coordinates: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }
    };
    let data = {
      summary,
      name,
      address,
      headline
    };
    console.log(data);
    try {
      let ret = await api(
        "PUT",
        "/users/" + this.props.LoginReducer.user_id,
        data
      );
      console.log(ret);
      if (ret.status >= 200 && ret.status < 300) {
        $("#personalModal").modal("hide");
        printMessage("Data Saved Successfully.");
      }
    } catch (error) {
      console.log(Object.keys(error), error.response);
      printError(error); //Pass Full response object to the printError method.
    }

    console.log(summary, name, address);
  }

  async delPersonal() {
    $("#personalModal").modal("hide");
  }

  addSkill() {
    let skill = document.getElementById("addSkill").value;
    console.log(skill);
    if (skill == "") return false;
    let currentLength = $("#skillstable").find("tr").length;

    $("#skillstable").append(
      "<tr  data-dellength=" +
        currentLength +
        " ><td>" +
        skill +
        '</td><td><i class="fa fa-trash custom-edit-buttons" onclick=delrows(' +
        currentLength +
        ") ></i></td></tr>"
    );

    /*  this.setState((prevState) => ({
            skills : prevState.skills.concat([skill])
        })); */
  }

  changeDocument(t) {
    if (t == "BANNER") {
      document.querySelector("#bannerbox").click();
    } else if (t == "PROFILE") {
      document.querySelector("#profilebox").click();
    } else if (t == "RESUME") {
      document.querySelector("#resumebox").click();
    }
  }

  async docChange(t) {
    if (t == "BANNER") {
      var fd = new FormData();
      var filesList = document.getElementById("bannerbox").files;
      if (!filesList[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
        printMessage("Please select an image to upload.");
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
            banner_image: S3_URL + ret["data"]["payLoad"]
          };
          let ret2 = await api(
            "PUT",
            "/users/" + this.props.LoginReducer.user_id,
            data
          );
          printMessage("File Saved Successfully.");
          this.setState({
            banner: data.banner_image
          });
        }
      } catch (error) {
        console.log(Object.keys(error), error.response);
        printError(error); //Pass Full response object to the printError method.
      }
    } else if (t == "PROFILE") {
      var fd = new FormData();
      var filesList = document.getElementById("profilebox").files;
      if (!filesList[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
        printMessage("Please select an image to upload.");
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
            profile_image: S3_URL + ret["data"]["payLoad"]
          };
          let ret2 = await api(
            "PUT",
            "/users/" + this.props.LoginReducer.user_id,
            data
          );

          this.setState({
            userimage: data.profile_image
          });
          printMessage("File Saved Successfully.");
        }
      } catch (error) {
        console.log(Object.keys(error), error.response);
        printError(error); //Pass Full response object to the printError method.
      }
    } else if (t == "RESUME") {
      var fd = new FormData();
      var filesList = document.getElementById("resumebox").files;
      console.log(filesList[0]);
      if (!filesList[0].name.match(/.(pdf|doc|docx|txt|rtf)$/i)) {
        printMessage("Please select an document file to upload.");
        return false;
      }
      //if()
      fd.append("uploadSelect", filesList[0]);
      console.log(fd);

      try {
        let ret = await api("POST", "/document/upload", fd, {
          "Content-Type": "multipart/form-data"
        });
        console.log(ret);
        if (ret.status >= 200 && ret.status < 300) {
          let data = {
            resume: S3_URL + ret["data"]["payLoad"]
          };
          let ret2 = await api(
            "PUT",
            "/users/" + this.props.LoginReducer.user_id,
            data
          );

          this.setState({
            resume: data.resume
          });
          printMessage("File Saved Successfully.");
        }
      } catch (error) {
        console.log(Object.keys(error), error.response);
        printError(error); //Pass Full response object to the printError method.
      }
    }
  }

  viewPDF() {
    if (this.state.resume) {
      window.open(this.state.resume, "_blank");
    }
  }

  render() {
    var check = sessionStorage.getItem("profile");   
    return (
      <div>
        <RecruiterHeader />
        <div className="container">
          <div className="row block-row">
            <div className="wrapper col-lg-9">
              <main>
                <div className="main-section">
                  <div>
                    <div className="main-section-data">
                      <div className="row ">
                        <div className="col-lg-12 no-padding">
                          <div className="main-left-sidebar">
                            <div className="user_profile custom-wrapper">
                              <section className="cover-sec">
                                <img
                                  src={this.state.banner}
                                  alt="LinkedIn"
                                  onClick={() => this.changeDocument("BANNER")}
                                />
                              </section>
                              <div className="user-pro-img">
                                <img
                                  src={this.state.userimage}
                                  alt="LinkedIn"
                                  className="user-image profile-user-image"
                                  onClick={() => this.changeDocument("PROFILE")}
                                />
                              </div>
                              {/* <!--user-pro-img end--> */}
                              <div className="user_pro_status">
                                <h3 className="profile-user-name">
                                  {this.state.firstname} {this.state.lastname}
                                </h3>
                                <h5 className="profile-user-subname">
                                  {this.state.headline}
                                </h5>
                                <p className="location-text">
                                  {this.state.city}
                                </p>

                                <div className="dropdown">
                                  <button
                                    id="profile-section"
                                    type="button"
                                    className="btn btn-secondary dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    Add Profile Section
                                  </button>
                                  <div
                                    className="dropdown-menu exts"
                                    aria-labelledby="profile-section"
                                  >
                                    <button
                                      className="dropdown-item"
                                      data-toggle="modal"
                                      data-target="#personalModal"
                                    >
                                      Personal Details
                                    </button>
                                    <button
                                      className="dropdown-item"
                                      type="button"
                                      onClick={() =>
                                        this.changeDocument("RESUME")
                                      }
                                    >
                                      {" "}
                                      Add Resume
                                    </button>
                                  </div>
                                </div>

                                <hr />

                                <div className="user-description">
                                  {this.state.summary}
                                </div>
                                {this.state.resume && (
                                  <div
                                    className="user-resume"
                                    onClick={this.viewPDF}
                                  >
                                    <i class="fa fa-file-pdf resume-icon" />{" "}
                                    View Resume
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className=" custom-wrapper suggestions full-width">
                              <div className="sd-title">
                                <h5 className="profile-user-heading">
                                  Personal Info
                                  {/*  <i className="fa fa-pen custom-edit-buttons" aria-hidden="true"></i>*/}
                                  <i
                                    className="fa fa-pen custom-edit-buttons"
                                    aria-hidden="true"
                                    onClick={() => this.openModal("PERSONAL")}
                                  />
                                </h5>
                                <i className="la la-ellipsis-v" />
                              </div>
                              <div className="suggestions-list">
                                <div className="suggestion-usd detail-boxes ">
                                  <span class="fa fa-user-circle left-icons" />
                                  <div className="sgt-text">
                                    <div className="exp-company">
                                      {this.state.firstname}{" "}
                                      {this.state.lastname}
                                    </div>
                                    <div className="exp-company">
                                      {this.state.address.street} <br />
                                      {this.state.city}
                                      <br />
                                      {this.state.country}
                                      <br />
                                      {this.state.zipcode}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- main-section-data end--> */}
                  </div>
                </div>
              </main>
            </div>

            <div className="col-lg-3 right-sidebar" style={{ height: "auto" }}>
              <div>
                <a
                  href={`/public-profile/${this.state.publicid}`}
                  className="view-public save-button"
                >
                  View Public Page
                </a>
              </div>
              
            </div>
            {/* <!--right-sidebar end--> */}
          </div>
          {/* <!--theme-layout end--> */}
          <footer>
            <div className="footy-sec mn no-margin">
              <div className="container">
                <ul>
                  <li>
                    <a href="javascript:void(0)" title="">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" title="">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" title="">
                      Community Guidelines
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" title="">
                      Cookies Policy
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" title="">
                      Career
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" title="">
                      Forum
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" title="">
                      Language
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" title="">
                      Copyright Policy
                    </a>
                  </li>
                </ul>
                <p>
                  <img src="images/copy-icon2.png" alt="" />
                  Copyright 2018
                </p>
                <img className="fl-rgt" src="images/logo2.png" alt="" />
              </div>
            </div>
          </footer>
        </div>

    
        {/*  Personal Modal Dialog*/}
        <div
          className="modal fade"
          id="personalModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="skillsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="personalModalLabel">
                  Personal Details
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="firstname"
                        name="firstname"
                        onChange={this.handleText}
                        value={this.state.firstname}
                        placeholder="Email"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputPassword4">Last Name</label>
                      <input
                        class="form-control"
                        id="lastname"
                        name="lastname"
                        onChange={this.handleText}
                        value={this.state.lastname}
                      />
                    </div>
                  </div>
                  <div class="form-group pos-rel">
                    <label for="inputAddress">Address</label>

                    <PlacesAutocomplete
                      value={this.state.street}
                      onChange={this.handleChange}
                      onSelect={this.handleSelect}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading
                      }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: "Search Places ...",
                              className: "location-search-input form-control"
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {suggestions.map(suggestion => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                ? {
                                    backgroundColor: "#fafafa",
                                    cursor: "pointer",
                                    padding: "10px"
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer",
                                    padding: "10px"
                                  };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="inputEmail4">City</label>
                      <input
                        type="text"
                        class="form-control"
                        id="city"
                        placeholder=""
                        value={this.state.city}
                        onChange={this.handleText}
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label for="inputPassword4">State</label>
                      <input
                        type="text"
                        class="form-control"
                        id="state"
                        placeholder=""
                        value={this.state.state}
                        onChange={this.handleText}
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label for="inputPassword4">Zip Code</label>
                      <input
                        type="text"
                        class="form-control"
                        id="zipcode"
                        placeholder=""
                        value={this.state.zipcode}
                        onChange={this.handleText}
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Headline</label>
                    <input
                      type="text"
                      class="form-control"
                      id="headline"
                      placeholder=""
                      value={this.state.headline}
                      onChange={this.handleText}
                    />
                  </div>
                  <div class="form-group">
                    <label for="inputAddress">Summary</label>
                    <textarea
                      class="form-control"
                      name="summary"
                      id="summary"
                      onChange={this.handleText}
                      value={this.state.summary}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn  delete-button  mr-auto"
                  onClick={this.delPersonal}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.addPersonal}
                  className="btn save-button"
                >
                  Save Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hiddenbox">
          <input
            type="file"
            name="profilebox"
            id="profilebox"
            onChange={() => this.docChange("PROFILE")}
          />
        </div>
        <div className="hiddenbox">
          <input
            type="file"
            name="bannerbox"
            id="bannerbox"
            onChange={() => this.docChange("BANNER")}
          />
        </div>
        <div className="hiddenbox">
          <input
            type="file"
            name="resumebox"
            id="resumebox"
            onChange={() => this.docChange("RESUME")}
          />
        </div>
      </div>
    );
  }
}

//export default profile;

//export default HomePage;

function mapStateToProps(state) {
  console.log("in map state details profileVIEW", state);
  return state;
  //  return { property_detail: state.fetch_details_view.property_detail,
  //  };
}

export default connect(mapStateToProps)(RecruiterProfile);
