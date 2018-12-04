import React, { Component } from 'react'
import Header from "../Common/Header";
import RecruiterHeader from "../Common/RecruiterHeader";
import { IMAGE_PATHS, S3_URL } from "../../constants/routes";
import JobsByskill from "../Jobs/JobsBySkill";
import { api, printError, printMessage } from '../../services';
import Suggestions from './suggestions';
import Connections from './connections';
import RecommendedJobs from './recommendJobs';


// import "./Home.css"
import {Link} from 'react-router-dom';


class ApplicantHome extends Component {

	constructor(props){
		super(props)
		this.state={
			connections:[],
			totalConnections:0,
			fname:"",
			lname:"",
			mutualConnections:[],
			recommended_jobs  : [],
			headline :"",
			user_profile_image:""

		}
	}

async componentDidMount(){
	if(sessionStorage.getItem('user_id')){
	try {
        let user= await api('GET','/users/'+sessionStorage.getItem('user_id'));
		console.log("user",user);

		if((user.data.payLoad.user.profile_image).indexOf("https://")==-1)
		{
		  user.data.payLoad.user.profile_image = S3_URL + user.data.payLoad.user.profile_image;
		}


        this.setState({
		  fname:user.data.payLoad.user.name.first,
		  lname:user.data.payLoad.user.name.last,
		  headline : user.data.payLoad.user.headline,
		  user_profile_image:  user.data.payLoad.user.profile_image
			
        })
      } catch (error) {
        console.log(Object.keys(error), error.response);
        printError(error);
	  }
	}else{
		return;
	}

	if(sessionStorage.getItem('user_id')){
	try {
		let ret = await api('GET','/users/'+sessionStorage.getItem('user_id')+'/connections');
		let mutual=await api('GET','/users/'+sessionStorage.getItem('user_id')+'/mutual');
		//let recommendation ;
		//= await api("GET",`/jobs/recommendation`);
        
		console.log("connections",ret);
		console.log("mutual",mutual);
        this.setState({
		  connections:ret.data.payLoad.connections,
		  totalConnections:ret.data.payLoad.totalConnections,
		  //for now used connections instead of mutual
		  mutualConnections:mutual.data.payLoad.connections,
		 // recommended_jobs:recommendation.data.payLoad
          
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
	var check = sessionStorage.getItem("profile");
    console.log(check)
	let x = "";
	let x2 = "";
    if (check == "applicant") {
    console.log(check)

	  x = <Header />;
	  x2 = (<Link to="/profile">View Profile</Link>);
    } else if (check == "recruiter") {
    console.log(check)

	  x = <RecruiterHeader />;
	  x2 = (<Link to="/recruiterprofile">View Profile</Link>);
    }

	let suggestions=null;
	console.log(this.state)
      suggestions =this.state.mutualConnections.map(user => {
		  console.log('data passes',user);
        return(
            <Suggestions data={user}/>
        )
	}) 
	let connections=null;
      connections =this.state.connections.map(user => {
		  console.log('data passes',user);
        return(
            <Connections data={user}/>
        )
	})
		// Code for showing jobs you may like
	// let jobs=null;
    //   jobs =this.state.recommended_jobs.slice(0, 10).map(job => {
		
    //     return(
    //         <RecommendedJobs data={job}/>
    //     )
	// })


    return (
      <div>
      {x}

      <div className="main-section pad-top-15">
				<div className="container">
					<div className="main-section-data">
						<div className="row">
							<div class="col-lg-3 col-md-4 pd-left-none no-pd">
								<div class="main-left-sidebar no-margin">
									<div class="user-data full-width">
										<div class="user-profile">
											<div class="username-dt">
												<div class="usr-pic">
													<img src={this.state.user_profile_image} alt="" />
												</div>
											</div>
											<div class="user-specs">
												<h3>{this.state.fname} {this.state.lname}</h3>
												<span>{this.state.headline}</span>
											</div>
										</div>
										<ul class="user-fw-status">
											<li>
												<h4>Connections</h4>
												<span>{this.state.totalConnections}</span>
											</li>
											<li>
												{x2}
											</li>
										</ul>
									</div>

                                </div>
                            </div>

                            <div class="col-lg-6 col-md-8 no-pd">
								<div class="main-ws-sec">
								<div class="company-title" style={{paddingLeft:"0px"}}>
									<h3>Connections</h3>
								</div>
									<div class="post-topbar">
									
									
										{connections}
										</div>
									
                                      
                                   
                                    <hr></hr>
                                        {/* <div style={{backgroundColor:"#f3f6f8"}}>
                                           <div className="bluetext" style={{padding:"11px", marginTop: '86px'}}>
                                                Show More
										   </div>
										  
										</div> */}
										

	<section className="companies-info">
      <div className="container">
          <div className="company-title" style={{paddingLeft:"0px"}}>
              <h3>Recommended For You</h3>
          </div>
          <div class="companies-list">
              <div className="row">
                  {suggestions}
                  
              </div>
          </div>
      </div>
  </section>
								




                                </div>
                            </div>
				{/* DOM for Joobs you may Like */}
                            {/* <div className="col-lg-3 pd-right-none no-pd" style ={{backgroundColor: "white",border: "1px solid darkgrey"}}>
                            <div className="sd-title1">
											<h3 style={{"fontWeight":"bold"}}>Jobs you may like</h3>
											<i class="la la-ellipsis-v"></i>
										</div>
                               
										{jobs}
								
                            </div> */}

                        </div>{/*Class row */}			
                    </div>
                </div>
            </div>
      </div>
    )
  }
}


export default ApplicantHome;