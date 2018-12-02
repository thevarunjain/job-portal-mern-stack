import React, { Component } from 'react'
import Header from "../Common/Header"
import JobsByskill from "../Jobs/JobsBySkill";
import "./Home.css"

class ApplicantHome extends Component {
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
													<img src="http://via.placeholder.com/100x100" alt="" />
												</div>
											</div>
											<div class="user-specs">
												<h3>John Doe</h3>
												<span>Graphic Designer at Self Employed</span>
											</div>
										</div>
										<ul class="user-fw-status">
											<li>
												<h4>Connectios</h4>
												<span>34</span>
											</li>
											<li>
												<a href="#" title="">View Profile</a>
											</li>
										</ul>
									</div>

									<div class="suggestions full-width">
										<div class="sd-title">
											<h3>Suggestions</h3>
											<i class="la la-ellipsis-v"></i>
										</div>
										<div class="suggestions-list">
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt="" />
												<div class="sgt-text">
													<h4>Jessica William</h4>
													<span>Graphic Designer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt="" />
												<div class="sgt-text">
													<h4>John Doe</h4>
													<span>PHP Developer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
								
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt="" />
												<div class="sgt-text">
													<h4>John Doe</h4>
													<span>PHP Developer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="view-more">
												<a href="#" title="">View More</a>
											</div>
										</div>
									</div>
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-8 no-pd">
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

                            <div className="col-lg-3 pd-right-none no-pd" style ={{backgroundColor: "white",border: "1px solid darkgrey"}}>
                            <div class="sd-title">
											<h3>Jobs you may like</h3>
											<i class="la la-ellipsis-v"></i>
										</div>
                                <JobsByskill />
                                
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