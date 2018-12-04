import React, { Component } from 'react'
import Header from "../Common/Header"
// import JobsByskill from "../Jobs/JobsBySkill";
import "./Home.css"
import { api, printError, printMessage } from '../../services';
import {Link} from 'react-router-dom';
import { IMAGE_PATHS, S3_URL } from "../../constants/routes";



class ApplicantHome extends Component {

	constructor(props){
		super(props)
		this.state={
			connections:[],
			totalConnections:0,
			fname:"",
			lname:"",
			headline : "",
			user_profile_image :""

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
			  user_profile_image:user.data.payLoad.user.profile_image

			  
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
					console.log("connections",ret);
					this.setState({
						connections:ret.data.payLoad.connections,
						totalConnections:ret.data.payLoad.totalConnections,
						//for now used connections instead of mutual
						mutualConnections:ret.data.payLoad.connections,
					// recommended_jobs:recommendation.data.payLoad
						
					});

					let datax = await api("GET", '/users/dashboard');
      		console.log(datax);
					setTimeout(() => {
						window.graph2P(datax['data']);
					},70);
		  } catch (error) {
			console.log(Object.keys(error), error.response);
			printError(error);
		  }
		}else{
			return;
		}
	}

  render() {
    return (
      <div>
      <Header />

      <div class="main-section pad-top-15">
				<div class="container">
					<div class="main-section-data">
						<div class="row">
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
												<h3>{this.state.fname} {this.state.lname} </h3>
												<span>{this.state.headline}</span>
											</div>
										</div>
										<ul class="user-fw-status">
											<li>
												<h4>Connections</h4>
												<span>{this.state.totalConnections}</span>
											</li>
											<li>
												<Link to="/profile">View Profile</Link>
											</li>
										</ul>
									</div>
                                </div>
                            </div>

                            <div class="col-lg-9 col-md-8 no-pd">

													 								<div className="col-lg-12 exts2">
																					 <div className="row col-lg-12">
																									<div className="col-lg-12 row rec-dashboard-box">
																											<div className="col-lg-4 infobox i1">

																											</div>
																											<div className="col-lg-4 infobox i2">
																											
																											</div>
																											<div className="col-lg-4 infobox i3">
																											
																											</div>
																									</div>  
																									
																							</div>
																					 		<div className="col-lg-12 mt-top rec-dashboard-box">
																									<div className="grph-headings">Profile Views Per Day</div>
																									<canvas id="myChart5"></canvas>
																							</div>
																					 
																					 </div>
													 
													 
																						<div class="col-lg-12 col-md-8 no-pd">
																								<div class="main-ws-sec">
																									<div class="post-topbar">
																										<div class="post-st">
																											<ul>
																												<li style={{paddingRight:"10px "}}><img src={require("../Files/Images/photo-camera.svg")} style={{width:"25px"}} /></li>
																												<li style={{paddingRight:"10px "}}><img src={require("../Files/Images/video-camera.svg")} style={{width:"25px"}} /></li>
																												<li style={{paddingRight:"10px "}}><img src={require("../Files/Images/file.svg")} style={{width:"25px"}} /></li>
																												<li style={{paddingRight:"10px "}}><a class="post-jb active" href="#" title="">Post</a></li>
																											</ul>
																				
																										</div>
																																			
																																		</div>
																																		<hr></hr>
																																				<div style={{backgroundColor:"#f3f6f8"}}>
																																					<div className="bluetext" style={{padding:"11px", marginTop: '86px'}}>
																																								Write an Article <span style={{color :"grey"}}>on Linkedin</span>
																																					</div>
																																				</div>
																																</div>
																						</div>
					


                            </div>

                        </div>{/*Class row */}			
                    </div>
                </div>
            </div>
      </div>
    )
  }
}


export default ApplicantHome;