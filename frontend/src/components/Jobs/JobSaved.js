import React, { Component } from 'react'
import "./jobs.css";
import { Link } from 'react-router-dom';
import Pin from '../Files/Images/Pin.svg';
import { api , printError, printMessage} from '../../services/';
import $ from 'jquery'; 
import { IMAGE_PATHS, S3_URL } from '../../constants/routes';
import jwt_decode from 'jwt-decode';

class JobSaved extends Component {
constructor(props){
  super(props);

  this.state={
    title:this.props.data.title,
    address:this.props.data.address,
    easyApply:this.props.data.easy_apply,
    heading:this.props.data.title?this.props.data.title:"Software Developer in Bay Area",
    address:this.props.data.address,
    applicantFname:"",
    applicantLname:"",
    profile_img:"",
    applicantHeading:"",
    applicantLocation:"",
    applicant_id:null,
    applicant_email:"",
    applicant_phone:"",
    applicant_resume_name:"",
    job_id:this.props.data._id
  }
  this.setPhone=this.setPhone.bind(this);
    this.setEmail=this.setEmail.bind(this);
    this.uploadResume=this.uploadResume.bind(this);
    this.easy_apply=this.easy_apply.bind(this);
    this.getApplicant=this.getApplicant.bind(this);
    this.UNSAVE=this.UNSAVE.bind(this);
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

UNSAVE(){
    this.props.unsave(this.state.job_id);
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

    console.log("get userrrr",ret);
      
      this.setState({
          applicantFname:ret.data.payLoad.user.name.first,
          applicantLname:ret.data.payLoad.user.name.last,
          profile_img:ret.data.payLoad.user.profile_image,
          applicantHeading:"",
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

  render() {
    $('#easy_apply_form').off('submit').submit((e) => {e.preventDefault(); this.easy_apply(); return false;});


    let easyApplyButton=null;

if(this.state.easyApply){
  easyApplyButton=<div class='child inline-block-child'><button type="button" className="btn easy-apply" data-toggle="modal" data-target="#easyApplyModal" onClick={this.getApplicant}>Easy Apply</button></div>

}else{
    easyApplyButton=<div className="col-md-3">
    <button type="button" className="btn easy-apply" style={{width:"100%"}}>Apply</button>              </div>
}

    return (
      <div id="card11">
    <div  className="container py-1">
    <div id="card-card1" className="card">
      <div className="row ">
        <div className="col-md-3">
          
            <img src={Pin} style={{width:"40%"}} />

          </div>
          <div className="col-md-6">
            <div id="cb" className="card-block">
              <h3 id="card-heading-saved" className="card-title"><Link id="jobsavedheading" to="">{this.state.heading}</Link></h3>
              <div className="row">
              <div className="col-md-7" style={{paddingLeft:"0px"}}>
              <p id="propdetails1">{this.state.address.city} ,{this.state.address.country}</p>
              

              </div>
              {easyApplyButton}
              <div className="col-md-2">
              <button type="button" class="btn btn-outline-primary" onClick={this.UNSAVE}>Unsave</button></div>
              </div>
              

              
             
            </div>
           
            
        
          
              
          

        </div>
      </div>
      
    </div>
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


      </div>
    )
  }
}
export default JobSaved;