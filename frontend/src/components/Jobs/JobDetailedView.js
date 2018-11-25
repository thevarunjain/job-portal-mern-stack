import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {set_active_id} from "../../actions/jobCardActiveId";
import { api , printError, printMessage} from '../../services/';
import jwt_decode from 'jwt-decode';
import "./jobs.css";
import JobSkills from "./JobSkills";
import JobFunctions from "./JobFunctions"
import JobRecruiter from "./JobRecruiter";
import {connect} from "react-redux";
import Watch from '../Files/Images/Watch.svg';
import Logo from '../Files/Images/linkedinlogo.png';
import $ from 'jquery'; 
import { IMAGE_PATHS, S3_URL } from '../../constants/routes';
class JobDetailedView extends Component {


  constructor(props){
    super(props)
    this.state={
      applicantFname:"Shubham",
      applicantLname:"Sand",
      applicantHeading:"",
      applicantLocation:"",
      profile_img:"",
      applicant_id:"",
      applicant_email:"",
      applicant_phone:"",
      applicant_resume_name:"",
      jobs:[],
      title:"",
      company:"",
      address:{},
      jobDescription:"",
      skills:[],
      easyapply:true,
      industry:"",
      type:"",
      jobFunction:"",
      recruiter_id:"",
      job_id:"",
      time_diff:""


    }
    this.saveJob=this.saveJob.bind(this);
    this.setPhone=this.setPhone.bind(this);
    this.setEmail=this.setEmail.bind(this);
    this.uploadResume=this.uploadResume.bind(this);
    this.easy_apply=this.easy_apply.bind(this);
    this.getApplicant=this.getApplicant.bind(this);
  }

setPhone(e){
    this.setState({
        applicant_phone:e.target.value
    })
}
setEmail(e){
    this.setState({
        applicant_email:e.target.value
    })
}

async uploadResume(e){
console.log("RESUMES",e);


var fd = new FormData();
var filesList = document.getElementById("uploadResume").files;
if (!filesList[0].name.match(/.(pdf|doc|docx)$/i))
{
    printMessage("Please select an pdf/doc/docx file to upload.");
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
            'resume_url' : ((S3_URL) + ret['data']['payLoad'])
        }
        printMessage("Resume added Successfully.");
        this.setState({
            applicant_resume_name : data.resume_url
        })
        
    }
} catch (error) {
    console.log(Object.keys(error), error.response);
    printError(error);   //Pass Full response object to the printError method.
}

}

async easy_apply(){
    
    if(this.state.job_id && this.state.applicant_id && this.state.applicant_email && this.state.applicant_phone && this.state.applicant_resume_name){
        let data={
            email:this.state.applicant_email,
            phone:this.state.applicant_phone,
            resume:this.state.applicant_resume_name
        }
        try {
            let ret = await api('POST','jobs/' +this.state.job_id +'/easyApply',data);
            
            if(ret.status===200)
            {
                printMessage("You have successfully applied to this job ");
                $('#btn_close_apply').click();
            }
            else 
            {
                throw "error";
            }
          } 
          catch (error) 
          {
            console.log("ERROR in SAVE",error);
            console.log(Object.keys(error), error.response);
            printError(error);
          }

    }else{
        printMessage("Please entire the required Fields");
    }
    return false;
    
}

 async saveJob(){
     console.log("JOB ID",this.state.job_id);
    try {
        let ret = await api('GET','/jobs/'+this.state.job_id+'/save');
        console.log("ttt",ret);
        if(ret.status===200)
        {
            printMessage("Success! This job is successfully saved");
            
        }
        else 
        {
            throw "error";
        }
      } 
      catch (error) 
      {
        console.log("ERROR in SAVE",error);
        console.log(Object.keys(error), error.response);
        printError(error);
      }
        
  }

  setActiveID(id){
    this.props.set_active_id(id);
  }

  async getApplicant(){



    let _t = this;
    let id = sessionStorage.getItem('user_id');
   
  console.log(id);
  try {
    let ret = await api('GET','/users/'+id);
   
    console.log()
    if(ret.status>=200 && ret.status<300)
    {
        
        this.setState({
            applicantFname:ret.data.payLoad.user.name.first,
            applicantLname:ret.data.payLoad.user.name.last,
            profile_img:"user_profile_img.jpeg",
            applicantHeading:"Former Systems Engineer | Masters in Software Engineering|",
            applicantLocation:"San Francisco Bay Area",
            applicant_id:ret.data.payLoad.user.id
        })
    }
    else 
    {
        throw "error";
    }
  } 
  catch (error) 
  {
    console.log(Object.keys(error), error.response);
    printError(error);
  }

  }

componentWillReceiveProps(nextProps){
let jobs=nextProps.jobs?nextProps.jobs:null;
let activeID=nextProps.activeID?nextProps.activeID:null;
let filteredJob=null;
if(activeID==null && jobs.length > 0){
    this.setActiveID(jobs[0]._id);
}
if(activeID!=null){
for(var i=0;i<jobs.length;i++){
    if(jobs[i]._id==activeID){
        filteredJob=jobs[i]
    }
}
}
if(filteredJob!=null){
    
    this.setState({
    title:filteredJob.title,
    company:filteredJob.company,
    address:filteredJob.address,
    jobDescription:filteredJob.description,
    industry:filteredJob.industry,
    type:filteredJob.type,
    skills:filteredJob.skills,
    easyapply:filteredJob.easy_apply,
    jobFunction:filteredJob.function,
    recruiter_id:filteredJob.recruiter,
    job_id:filteredJob._id,
    time_diff:filteredJob.time_diff

    })
}else{
    return;
}

}

  render() {

    $('#easy_apply_form').off('submit').submit((e) => {e.preventDefault(); this.easy_apply(); return false;});
    
    let activeJob=null;

let easyApplyButton=null;

if(this.state.easyapply){
    easyApplyButton=<div class='child inline-block-child'><button type="button" className="btn easy-apply" data-toggle="modal" data-target="#easyApplyModal" onClick={this.getApplicant}>Easy Apply</button></div>

}else{
    easyApplyButton=<div class='child inline-block-child'><button type="button" className="btn easy-apply" onClick={this.getApplicant}>Apply</button></div>
}
    return (
      <div>
      <div className="row left-job-detail">
           
              <div className="col-md-3 left-job-detail-image">
                  <img src="" class="img-fluid job-detail-image" alt="LinkedIn"/>
                  
              </div>



{/*  Easy Apply Modal Dialog*/}
<div className="modal fade" id="easyApplyModal" tabindex="-1" role="dialog" aria-labelledby="easyApplyModalLabel" aria-hidden="true">
<div className="modal-dialog" role="document">
    <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="easyApplyModalLabel">Easy Apply</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body">

        <div className="row left-job-detail" >
           
              <div className="col-md-3 left-job-detail-image">
                  <img src="" class="img-fluid job-card-image-easy-apply" alt="" />
              </div>
              <div className="col-md-8 left-job-detail-desc">
              <div>
              <label className="heading-company">{this.state.applicantFname} {this.state.applicantLname}</label>
              </div>
              <div>
              <label>{this.state.applicantHeading}</label>
              </div>
              <div>
              <label style={{fontSize:"12px",color:"gray",fontWeight:"bold"}}>{this.state.applicantLocation}</label>
              </div>
              <div>
              <Link to="/profile"><button type="button" class="btn btn-link" onClick={() => $("#easyApplyModal").modal('hide')}>Review your profile</button></Link>
              </div>
              </div>
      </div>
            <form id="easy_apply_form">
                <label id="work-exp-form"> Email:</label><br/><input type="email" className="form-control" placeholder="abc@gmail.com" onChange={this.setEmail} required></input><br />
                <label id="work-exp-form"> Phone:</label><br/><input type="tel" id="work-exp-form" name="phone"
                placeholder="Contact Number (123-456-7890)"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required  className="form-control" onChange={this.setPhone}></input>
                <br/>
                    <div class="input-group">
                      <div class="upload-btn-wrapper">
                        <button class="btn btn1" >Upload Resume</button>
                        <input id="uploadResume" type="file" name="myfile" onChange={this.uploadResume} required/>
                      </div>

                    </div>
                    <div className="modal-footer">
            <button id="btn_close_apply" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary">Submit Application</button>
        </div>

            </form>
        </div>
        
    </div>
</div>
</div>







              <div className="col-md-9 left-job-detail-desc">
              <div className="heading-company">
              {this.state.title}
              </div>
              <div className="heading-location">
              {this.state.company} &#9670; {this.state.address.city}, {this.state.address.country}
              </div>
              
              <div className="heading-location">
              <label style={{color:"green",fontSize:"12px"}}>New &#9670;</label>&nbsp;<label style={{fontSize:"12px"}}>Posted {this.state.time_diff} ago</label>
              </div>
              <div className="heading-location-button">
              <img src={Watch} style={{width:"4%"}}></img>&nbsp;<label style={{paddingTop:"1%",fontSize:"12px"}}>Be an early applicant</label>
              </div>
              <div className="heading-location-button">
              <div class='parent' >
              <div class='child inline-block-child' style={{paddingRight:"20px"}}><button type="button" class="btn btn-outline-primary" style={{fontWeight:"bold"}} onClick={this.saveJob}>Save</button></div>
              {easyApplyButton}
            </div>
            </div>
            
              </div>

              <div style={{width:"100%"}}>
              
              <hr/>
              </div>
              <div className="row">
              
              <div className="col-md-8 job-description-partition">
              <div>
                <label className="heading-company">Job description</label>
                </div>
                <div>
                {this.state.jobDescription}
                </div>
                
              </div>
              <div className="col-md-4 job-description-partition">
                  <JobSkills skills={this.state.skills}/>
                  <JobRecruiter data={this.state.recruiter_id}/>
                  <JobFunctions type={this.state.type} industry={this.state.industry} jobFunction={this.state.jobFunction}/>                  
              </div>
              </div>
              
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    console.log("in map Jobs Search",state);
   return { jobs: state.searched_jobs.jobs,
            activeID:state.active_id.activeID
  };
  }
  
  const mapDispachToProps = dispatch => {
    return {
      
        set_active_id: (id) => dispatch(set_active_id(id)),

  
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(JobDetailedView);
  