import React, { Component } from 'react'
import Header from '../Common/Header';
import bannerlogo from '../Files/Images/profile-banner.svg';
import profileplaceholder from '../Files/Images/profile-placeholder.png'
import JobSkills from "./JobSkills";
import JobFunctions from "./JobFunctions"
import JobRecruiter from "./JobRecruiter";
import '../profile/profile.css';
import $ from 'jquery'; 
import { Link } from 'react-router-dom';
import JobDetailedView from "./JobDetailedView";
import { api , printError, printMessage} from '../../services/';
import { IMAGE_PATHS, S3_URL } from '../../constants/routes';
import RecruiterHeader from "../Common/RecruiterHeader";



window.test = function(){
    console.log($("div[data-edit='false']"));
    $("div[data-edit='false']").each(function(){
        console.log($(this));
    });
}



class CompanyPage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            'banner' : bannerlogo,
            'userimage' : profileplaceholder,
            jobId : this.props.match.params.id,    
            jobtitle : "",
            jobdesc : "",
            jobcompany : "",
            jobaddress : "",
            jobfunction : "",
            jobindrustry : "",
            jobtype : "",
            jobskill : [],
            easyapply : true,
            applicantFname : "",
            applicantLname:"",
            profile_img:"",
            applicantHeading:"",
            applicantLocation: "",
            applicant_id: ""
        }

        this.saveJob = this.saveJob.bind(this);
    this.easy_apply=this.easy_apply.bind(this);

    }


    async saveJob()
    {
        let jobtitle = document.getElementById("jobtitle").innerText;
        let jobcompany = document.getElementById("jobcompany").innerText;
        let jobdesc = document.getElementById("jobdesc").innerText;
        let jobfunction = document.getElementById("jobfunction").innerText;
        let jobindrustry = document.getElementById("jobindustry").innerText;
        let jobtype = document.getElementById("jobtype").innerText;
        let skill = document.getElementById("skill").innerText;
    
        var updatedSkill = skill.split(" ")

        var data = {
            "title": jobtitle,
            "description": jobdesc,
            "company": jobcompany,
            "industry": jobindrustry,
            "type":jobtype,
            "function" : jobfunction,
            "skills" : updatedSkill
        };

        console.log(data);
        
        try {
            let ret = await api('PUT',`/jobs/${this.state.jobId}`,data);
            console.log(ret);
            if(ret.status>=200 && ret.status<300)
            {
                printMessage("Job Updated Successfully.");
            }
        } catch (error) {
            console.log(Object.keys(error), error.response);
            printError("Error in updating job");  
        }

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

    async componentWillMount()
    {
        if(sessionStorage.getItem('user_id')){
            try {
                await api('PUT',"/log/click/"+this.state.jobId);
                let job = await api("GET",`/jobs/${this.state.jobId}`);

                this.setState({
                  jobskill : job.data.payLoad.skills ,
                  jobtitle : job.data.payLoad.title,
                  jobdesc : job.data.payLoad.description,
                  jobcompany : job.data.payLoad.company,
                  jobaddress : job.data.payLoad.address,
                  jobfunction : job.data.payLoad.function,
                  jobindrustry : job.data.payLoad.industry,
                  jobtype : job.data.payLoad.type,
                  easyapply : job.data.payLoad.easy_apply
                })
              } catch (error) {
                console.log(Object.keys(error), error.response);
                printError(error);
              }
            }else{
                return;
            }
    }


    render() {
    $('#easy_apply_form').off('submit').submit((e) => {e.preventDefault(); this.easy_apply(); return false;});


        let easyApplyButton=null;
            // if(sessionStorage.getItem('profile') == "applicant"){
            //     if(this.state.easyapply){
            //         easyApplyButton=<div class='child inline-block-child'><button type="button" className="btn easy-apply" data-toggle="modal" data-target="#easyApplyModal" onClick={this.getApplicant}>Easy Apply</button></div>
    
            //     }else{
            //         easyApplyButton=<div class='child inline-block-child'><button type="button" className="btn easy-apply" onClick={this.getApplicant}>Apply</button></div>
            //     }
            // }
          


        var str = "" ;
        this.state.jobskill.map((s)=>{
            console.log(s)
            str = str + s + " ";
            console.log(str)
        })

        var saveButton =  "";  
        if(sessionStorage.getItem('profile') == "recruiter"){
            saveButton =   <div class='child inline-block-child' style={{paddingRight:"20px"}}><button onClick={this.saveJob} type="button" class="btn btn-outline-primary btn-save" style={{fontWeight:"bold"}}>Save Changes</button></div>
        }
      
        var check = sessionStorage.getItem("profile");

        console.log(check)

    
    return (
      <div>
         {check == "applicant" ? <Header /> : <RecruiterHeader />}
                <section class="cover-sec">
                        <img src={this.state.banner} alt=""/>
                </section>
                    
<div className="container">
            <div className="row block-row">
                <div className="wrapper col-lg-9">
                            
    <main>
        <div className="main-section">
            <div>
                <div className="main-section-data">
                    <div className="row ">
                        <div className="col-lg-12 no-padding mrg-top14">
                            <div className="main-left-sidebar">
                                <div className="user_profile custom-wrapper">
                                    <div className="row">
                                    <div className="col-md-3">
                                        <div>
                                            <img className="user-pro-img comp-profile-logo" src={require("../Files/Images/profile-placeholder.png")} />
                                        </div>
                                    </div>            
                                    <div className="col-md-9 comp-profile-details">
                                    <div className="user_pro_status no-border">
                                        <h3 data-edit='false' id='jobtitle' className="profile-user-name" contentEditable >{this.state.jobtitle}</h3>
                                        <h5  data-edit='false' id='jobcompany' className="profile-user-subname"  contentEditable>{this.state.jobcompany}</h5>
                                        <p className="location-text">
                                            {this.state.jobaddress.city},   {this.state.jobaddress.country}
                                        </p>
                                        <div className="company-save-apply">
                                        {/* <div class='child inline-block-child' style={{paddingRight:"20px"}}><button type="button" class="btn btn-outline-primary btn-save" style={{fontWeight:"bold"}}>Save</button></div> */}
                                        {/* <div class='child inline-block-child'><button type="button" className="btn easy-apply">Easy Apply</button></div> */}
                                        {easyApplyButton}
                                        </div> 
                                    </div>
                                    </div>
                                    </div>
                                    <hr/>

                                    <div  id='jobdesc' data-edit='false' contentEditable className="user-description desc">
                                        {this.state.jobdesc}
                                </div>
                                </div> 

                                <div className=" custom-wrapper suggestions full-width">
                                    <div className="sd-title">
                                    <div>

                                    <div style={{padding:"15px"}}>
                                    <div className="comp-ent" style={{border:" 1px solid lightgrey",padding:"20px"}}>
                                    <img className="comp-logo-btn" src={require("../Files/Images/function.svg")} alt=""/>
                                    <span><h6 className="profile-user-heading comp-text" style={{fontSize: "21px",paddingBottom:"16px"}}>  
                                    Job Function
                                    </h6>
                                   <div  id='jobfunction' data-edit='false' contentEditable> {this.state.jobfunction}</div></span>
                                     
                                    </div>
                                    </div>

                                    <div style={{padding:"15px"}}>
                                    <div className="comp-ent" style={{border:" 1px solid lightgrey",padding:"20px"}}>
                                    <img className="comp-logo-btn" src={require("../Files/Images/factory.svg")} alt=""/>
                                    <span><h6 className="profile-user-heading comp-text" style={{fontSize: "21px",paddingBottom:"16px"}}>  
                                    Job Industry
                                    </h6>
                                   <div   id='jobindustry' data-edit='false' contentEditable>{this.state.jobindrustry}</div></span> 
                                    </div>
                                    </div>

                                    <div style={{padding:"15px"}}>
                                    <div className="comp-ent" style={{border:" 1px solid lightgrey",padding:"20px"}}>
                                    <img className="comp-logo-btn" src={require("../Files/Images/typing.svg")} alt=""/>
                                    <span><h6 className="profile-user-heading comp-text" style={{fontSize: "21px",paddingBottom:"16px"}}>  
                                    Job Type
                                    </h6> 
                                   <div  id='jobtype' data-edit='false' contentEditable > {this.state.jobtype}</div></span>
                                    </div>
                                    </div>

                                    <div style={{padding:"15px"}}>
                                    <div className="comp-ent"  style={{border:" 1px solid lightgrey",padding:"20px"}}>
                                    <img className="comp-logo-btn" src={require("../Files/Images/skill.svg")} alt=""/>                                   
                                    <h6 className="profile-user-heading comp-text" style={{fontSize: "21px",paddingBottom:"16px"}}>  
                                    Skills
                                    </h6>
                                    <div id='skill' contentEditable data-edit='false'>
                                    {str}
                                    </div>
                                    </div>
                                    </div>

                                    </div>
                                    
                                        <i className="la la-ellipsis-v"></i>
                                    {saveButton}
                                    </div> 
                                </div> 
                            </div>{ /* <!--pf-gallery end--> */}
                        </div>{ /* <!--widget-portfolio end--> */}
                    </div>{ /* <!--right-sidebar end--> */}
                </div>
            </div>
        </div>{ /* <!-- main-section-data end--> */}
    </main>

  

</div>

</div>{ /* <!--theme-layout end--> */}
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
{/*  Easy Apply Modal Dialog*/}

      </div>
    )
}

}

export default CompanyPage;