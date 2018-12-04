import React, { Component } from 'react'
import RecruiterHeader from "../Common/RecruiterHeader"
import JobsByskill from "../Jobs/JobsBySkill";
import "./Home.css";

class ApplicantHome extends Component {
  render() {
    return (
    	<div>
        <div>
          <RecruiterHeader />
        </div>
        
          
        <div className="container rec-dashboard" >
          <span className="rec-board">RECRUITER DASHBOARD</span>
          <div className="row graph-box">
            <div className="col-lg-12">
                  {/******GRAPH DASHBOARD********/}
                  <div className="row col-lg-12">
                      <div className="col-lg-5 rec-dashboard-box">
                        G1
                      </div>
                      <div className="col-lg-7 rec-dashboard-box">
                        STATS
                      </div>
                  </div>
                  <div className="row col-lg-12">
                      <div className="col-lg-6 rec-dashboard-box">
                        G2
                      </div>
                      <div className="col-lg-6 rec-dashboard-box">
                        G3
                      </div>
                  </div>
                  <div className="row col-lg-12">
                      <div className="col-lg-6  rec-dashboard-box">
                        G4
                      </div>
                      <div className="col-lg-6  rec-dashboard-box">
                        G5
                      </div>
                  </div>


            </div>  
          </div>
        </div>
		</div>
    )
  }
}


export default ApplicantHome;