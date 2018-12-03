import React, { Component } from "react";
import $ from "jquery";
import Header from "../Common/Header";
import { connect } from "react-redux";
import "./PostJob.css";
import PostJobHeader from "./PostJobHeader";
import { Link } from "react-router-dom";
import { api, printError, printMessage } from "../../services/";
import { IMAGE_PATHS, S3_URL } from '../../constants/routes';
import bannerlogo from '../Files/Images/add.svg';
import PLACES from '../Common/Places';

window.delrows =  function(f){
  document.querySelector("div[data-dellength='"+(f)+"']").remove();
}

class PostJobfirst extends Component {
  constructor(props) {
    super(props);

    console.log("history push data", this.props.location.state);
  
    const { company, jobtitle, jobaddress } = this.props.location.state;

    this.state = {
      title: jobtitle,
      company: company,
      description: "",
      industry: "",
      type: "",
      address: jobaddress.city,
      addressSend : jobaddress,
      seniority: "",
      recommended: "",
      direct: "",
      text1: "",
      range: "",
      degree: "",
      company_logo: "",
      function: "",
      skills: [],
      easy_apply: "",
      step1flag: true,
      step2flag: false,
      banner : bannerlogo,
      bannerSend : ""
    };

    this.onChange = this.onChange.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.jobpost = this.jobpost.bind(this);

  }
  onChange = e =>
  {
    this.setState({ [e.target.id] : e.target.value });
  }
  onChangeType = e =>
  {
    this.setState({ [e.target.name] : e.target.value });
  }
  handlestep1Flag = () => {
    this.setState({
      step1flag: true,
      step2flag: false
    });
  };

  addSkill()
  {
      let skill = document.getElementById("addSkill").value;
      console.log(skill);

      this.state.skills.push(skill);
      if(skill=='')
          return false;
      let currentLength = $(".skill-container").length;

      $("#skillstable").append('<div class="skill-container" data-dellength='+currentLength+' >'+skill+'<i class="fa fa-times" onclick=delrows('+currentLength+') ></i></div>');
      document.getElementById("addSkill").value = '';
  }
  handlestep2Flag = () => {
  //  console.log($("input[name='foo'][type='radio']:checked").val());
    this.setState({
      easy_apply : $("input[name='foo'][type='radio']:checked").val()
    })
   if(this.state.description == "" || this.state.company == "" ||  this.state.title == "" ||  this.state.type == "" ||  this.state.function == "" ||  this.state.industry  == "" || this.state.seniority == "" || this.state.address == ""){ 
  //  if(false){
   console.log(this.state)
      printMessage("Please fill all the required * fields");
    }else{
      this.setState({
        step1flag: false,
        step2flag: true
      });
    }
    
  };

  async jobpost() {
    // if(this.state.skills == "", this.state.skills){ 
    //       printMessage("Please fill all the required * fields");
    //     }
    let  skills = [];
    $("#skillstable").find("div").each(function(){
      skills.push($(this).text());
    });
    console.log(skills)
    let _t = this;
    let data = {
      // recruiter : "5c047a66e94e4d07d0d51d21",
      title: this.state.title,
      company: this.state.company,
      description:this.state.description,
      type: this.state.type,
      address: this.state.addressSend,
      function: this.state.function,
      company_logo: this.state.bannerSend,
      skills: this.state.skills,
      easy_apply: this.state.easy_apply, 
      industry : this.state.industry
    };
    console.log(data);
    try {
      let ret = await api("POST", "/jobs", data);
      console.log(ret);
      if (ret.status >= 200 && ret.status < 300) {
        printMessage("Successfully posted a job!");
        // _t.setState({
        //   email: "",
        //   password: "",
        //   firstname: "",
        //   lastname: ""
        // });
      } else {
        throw "error";
      }
    } catch (error) {
      console.log(Object.keys(error), error.response);
      printError(error);
    }
  }

  checkret(data)
  {
    console.log(data);
    this.setState({
      address : data
    })
    
  }

  async docChange()
    {
            var fd = new FormData();
            var filesList = document.getElementById("profilebox").files;
            if (!filesList[0].name.match(/.(jpg|jpeg|png|gif)$/i))
            {
                printMessage("Please select an image to upload.");
                return false;
            }
            fd.append("uploadSelect",filesList[0]);
            console.log(fd);
            
            try {
                let ret = await api('POST','/document/upload',fd,{'Content-Type': 'multipart/form-data'});
                console.log(ret);
                if(ret.status>=200 && ret.status<300)
                {
                    let data = {
                        'banner_image' : ((S3_URL) + ret['data']['payLoad'])
                    }
                    printMessage("File Saved Successfully.");
                    this.setState({
                        banner : data.banner_image,
                        bannerSend : ret['data']['payLoad']
                    })
                    console.log(this.state.bannerSend)
                }
            } catch (error) {
                console.log(Object.keys(error), error);
                printError(error);   //Pass Full response object to the printError method.
            }
      }

      changeDocument()
      {
          
              document.querySelector("#profilebox").click();
          
      }
  



  render() {
    if (this.state.step1flag) {
      return (
        <div>
          <PostJobHeader />

        
          <div className="profileform profile" style={{height: "auto"}}  >
            <p style={{fontSize : "20px"}}><bold>Step 1:</bold> What job do you want to post?</p>
            <br />
            <form>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="company">
                    Company <span style={{ color: "blue" }}>*</span>
                  </label>

                  <input
                    type="text"
                    class="form-control form-grp-fitting"
                    id="company"
                    placeholder="Company"
                    required
                    value={this.state.company}
                    onChange={this.onChange}
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="title">
                    Job title
                    <span style={{ color: "blue" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control form-grp-fitting"
                    id="title"
                    required
                    placeholder="Job title"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>

                <div class="form-group col-md-4">
                  <label for="address">
                    Location
                    <span style={{ color: "blue" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control form-grp-fitting"
                    required
                    id="address"
                    placeholder="Location"
                    value={this.state.address}
                    onChange={this.onChange}
                  />
              {/* <PLACES onPosition={this.checkret}></PLACES> */}
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
                    required
                    class="form-control form-grp-fitting"
                    id="function"
                    placeholder="Add Job function"
                    value={this.state.function}
                    onChange={this.onChange}

                  />
                </div>

                <div class="form-group col-md-4 filter-message-box-drop">
                  <label for="employmenttype">
                    Employment type <span style={{ color: "blue" }}>*</span>{" "}
                  </label>
                  <i className="fa fa-angle-down"></i>  
                  <select
                    name="type"
                    onChange={this.onChangeType}
                    className="form-control form-grp-fitting"
                    style={{ width: "133px", height: "50px" }}
                  >
                    <option selected disabled value="">Select</option>
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
                    required
                    type="text"
                    class="form-control form-grp-fitting"
                    name="industry"
                    placeholder="Add company"
                    onChange={this.onChangeType}
 
                  />
                </div>
                <div class="form-group col-md-4 filter-message-box-drop">
                  <label for="seniority">
                    Seniority level <span style={{ color: "blue" }}>*</span>{" "}
                  </label>
                  <i className="fa fa-angle-down"></i>  
                  <select
                    name="seniority"
                    className="form-control form-grp-fitting "
                    style={{ width: "133px", height: "50px" }}
                    value={this.state.seniority}
                    onChange={this.onChangeType} 
                  >
                    <option selected disabled value="">Select</option>
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
                    className="form-control form-grp-fitting"
                    rows="5"
                    required
                    cols="20"
                    name="aboutme"
                    id="description"
                    style={{ height: 100, width: 500 }}
                    placeholder="Job description"
                    maxLength="400"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <p>
                How would you like to receive your applicants?{" "}
                <span style={{ color: "blue" }}>*</span>{" "}
              </p>
              <br />
              <div className="form-group col-md-8">
                 <form>

                <span><input type="radio" name="f"/>
                  <label style = {{marginLeft : "10px", marginTop : "-16px"}} class="custom-control-label col-md-12">
                  Let candidate apply with their LinkedIn profile & notify
                  </label>
                  </span><br />
                  <br />
                  <input type="text" class="form-control form-grp-fitting col-md-8" placeholder="http://yourcompany.com/job123"/>
                  <br/>

                  <span><input type="radio" name="f"/>
                  <label style = {{marginLeft : "10px", marginTop : "-16px"}} class="custom-control-label col-md-12">
                    Direct applicants to an external site to apply
                  </label>
                  </span><br />
                  <br />
                  <input type="text" class="form-control form-grp-fitting col-md-8" placeholder="http://yourcompany.com/job123"/>
                  <br/>
                   </form>

                  <div className="row"  onClick={this.changeDocument}>
                      <div>
                      Company Logo : <br/><br/>
                      </div>

                      <div className="hiddenbox">
                          <input type="file" name="profilebox" id="profilebox" onChange={()=>this.docChange()} />
                      </div>

                      <div className="comp-logo">
                      <img className="comp-logo-img" src={this.state.banner} />
                      </div>
                  </div>

                  <form>
                  <div className="easy-app-box">
                    <div className="easy-app-title">
                    Easy Apply 
                    </div>
                    <div className="easy-app">
                    Yes <input type="radio" name="foo" value="true"/>                     
                    </div>
                    <div className="easy-app">
                    No <input type="radio" name="foo" value="false"/>
                    </div>
                  </div>


                  </form>

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
                <span className="cont-btn">Continue</span>
              </button>
            </form>
          </div>
        </div>
      );
    } else if (this.state.step2flag) {
      return (
        <div>
          <PostJobHeader />

          <div className="profileform1 profile1" style={{height: "auto"}}>
            <p style={{color :"black", fontSize : "30px"}}>Step 2: What are the right qualifications for your job?</p>
            <br/>
            <br/>
            <p>
              What are some of the skills needed for this job? (Select up to 10)
            </p>

          <div class="input-group">
            <input required type="text" class="form-control" placeholder="Ex. Java" id="addSkill"/>
            <span class="input-group-btn" style={{    marginTop: "-41px", marginLeft: "10px"}}>
                <button className="btn btn-default save-btn-small" style={{marginTop: "41px",height: "50px"}} type="button" onClick={this.addSkill}>
                    <i class="fa fa-search"></i>
                </button>
            </span>
          </div>
          <div className="table table-responsive">
              <div className="table skilltable table-striped" style={{width: "fit-content"}}>
                  <div id="skillstable"></div>
              </div>
            </div>

            

            <p style={{color :"black"}}>
            How many years of experience in the job function(s) are you looking for?
            </p>
            <p style={{color :"grey"}}>LinkedIn tools may not be used to discriminate based on personal characteristics like age.</p>
            <p style={{color :"grey",paddingTop:"20px"}}> At <span style={{color :"black", fontSize : "20px"}}> {this.state.range} </span> least year  </p>


            <div class="slidecontainer row">
            <div className="col-md-12">
              <input
                type="range"
                min="0"
                max="30"
                value="5"
                class="slider"
                name="range "
                id="range"
                onChange={this.onChange}
                value={this.state.range}
                style={{borderRadius: "59px", height: "12px"}}
              />
              </div>
              <div className="row">
              <div className=" pad-num"><div className=" pad-num1" style={{marginLeft: "17px", color :"grey"}}>0</div></div>
              <div className=" pad-num"><div className=" pad-num1" style={{marginLeft: "103px", color :"grey"}}>5</div></div>
              <div className=" pad-num"><div className=" pad-num1" style={{marginLeft: "95px", color :"grey"}}>10</div></div>
              <div className=" pad-num"><div className=" pad-num1" style={{marginLeft: "93px", color :"grey"}}>15</div></div>
              <div className=" pad-num"><div className=" pad-num1" style={{marginLeft: "93px", color :"grey"}}>20</div></div>
              <div className=" pad-num"><div className=" pad-num1" style={{marginLeft: "93px", color :"grey"}}>25</div></div>
              <div className=" pad-num"><div className=" pad-num1" style={{marginLeft: "93px", color :"grey"}}>30</div></div>
            </div>
              
              
            </div>
            <br/>


            {/* <div class="form-group col-md-4">
              <select
                name="degree"
                id="degree"
                className="form-control form-grp-fitting "
                style={{ width: "183px", height: "50px" }}
              >
                <option hidden value="Select degree">Add degree</option>
                <option value="High SchoolDiploma"> High School Diploma</option>
                <option value="AssociatesDegree"> Associate's Degree</option>
                <option value=" BachelorsDegree"> Bachelor's Degree</option>
                <option value="MastersDegree">Master's Degree</option>
                <option value="MasterofBusinessAdministration">Master of Business Administration</option>
                <option value="DoctorofPhilosophy">Doctor of Philosophy</option>
                <option value="DoctorofMedicine">Doctor of Medicine</option>
                <option value="DoctorofLaw">Doctor of Law</option>
              </select>
            </div> */}

            <div className="row" style={{paddingTop: "40px"}}>
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
                  <p style={{ color: "white",fontSize : "20px", fontWeight : "100", marginBottom : "5px"}}>Post job</p>
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



