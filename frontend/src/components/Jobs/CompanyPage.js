import React, { Component } from 'react'
import Header from '../Common/Header';
import { IMAGE_PATHS } from '../../constants/routes';
import bannerlogo from '../Files/Images/profile-banner.svg';
import profileplaceholder from '../Files/Images/profile-placeholder.png'
import JobSkills from "./JobSkills";
import JobFunctions from "./JobFunctions"
import JobRecruiter from "./JobRecruiter";
import '../profile/profile.css';
//import $ from 'jquery'; 
import { Link } from 'react-router-dom';
import JobDetailedView from "./JobDetailedView";
import { api , printError, printMessage} from '../../services/';





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
            jobskill : []
        }

        // this.openModal.bind = this.openModal.bind(this);
    }
    async componentWillMount()
    {
        if(sessionStorage.getItem('user_id')){
            try {
                let job = await api("GET",`/jobs/${this.state.jobId}`);
                this.setState({
                    jobskill : job.data.payLoad.skill ,
                  jobtitle : job.data.payLoad.title,
                  jobdesc : job.data.payLoad.description,
                  jobcompany : job.data.payLoad.company,
                  jobaddress : job.data.payLoad.address,
                  jobfunction : job.data.payLoad.function,
                  jobindrustry : job.data.payLoad.industry,
                  jobtype : job.data.payLoad.type,
                  
               

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
        var skill
        //  = this.state.jobskill.map((s)=>{
        //     return(
        //         <div>
        //                 {s}
        //         </div>
        //     );
        // })

    
   // if(this.state.job.data != undefined){
    return (
      <div>
         <Header />
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
                                        <h3 className="profile-user-name">{this.state.jobtitle}</h3>
                                        <h5 className="profile-user-subname">{this.state.jobcompany}</h5>
                                        <p className="location-text">
                                            {this.state.jobaddress.city},   {this.state.jobaddress.country}
                                        </p>
                                        <div className="company-save-apply">
                                        <div class='child inline-block-child' style={{paddingRight:"20px"}}><button type="button" class="btn btn-outline-primary btn-save" style={{fontWeight:"bold"}}>Save</button></div>
                                        <div class='child inline-block-child'><button type="button" className="btn easy-apply">Easy Apply</button></div>
                                        </div> 
                                    </div>
                                    </div>
                                    </div>
                                    <hr/>

                                    <div className="user-description desc">
                                        {this.state.jobdesc}
                                </div>
                                </div> 

                                <div className=" custom-wrapper suggestions full-width">
                                    <div className="sd-title">
                                    <h5 className="profile-user-heading">  

                                    <i className = "fa fa-plus" />{this.state.jobfunction} 
                                    {this.state.jobindrustry} 
                                    {this.state.jobtype}
                                    {skill}
                  
                                        

                                    </h5>
                                        <i className="la la-ellipsis-v"></i>
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

      </div>
    )
  //}
}

}

export default CompanyPage;