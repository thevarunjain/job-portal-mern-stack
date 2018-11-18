import React, { Component } from 'react'
import "./jobs.css";
import JobSkills from "./JobSkills";
import JobDetails from "./JobDetails"
import JobRecruiter from "./JobRecruiter";

import Watch from '../Files/Images/Watch.svg';
import Logo from '../Files/Images/linkedinlogo.png';
class JobSingle extends Component {
  render() {
    return (
      <div>
      <div className="row left-job-detail" >
           
              <div className="col-md-3 left-job-detail-image">
                  <img src="" class="img-fluid job-detail-image" alt="LinkedIn"/>
                  
              </div>
              <div className="col-md-9 left-job-detail-desc">
              <div className="heading-company">
              Development Officer, West Coast ,(Remote)
              </div>
              <div className="heading-location">
              Jesuit Refugee Service/USA Company Location &#9670; 
              </div>
              <div className="heading-location">
              San Francisco
              </div>
              <div className="heading-location">
              <label style={{color:"green",fontSize:"12px"}}>New &#9670;</label>&nbsp;<label style={{fontSize:"12px"}}>Posted 1 hour ago</label>
              </div>
              <div className="heading-location-button">
              <img src={Watch} style={{width:"4%"}}></img>&nbsp;<label style={{paddingTop:"1%",fontSize:"12px"}}>Be an early applicant</label>
              </div>
              <div className="heading-location-button">
              <div class='parent' >
              <div class='child inline-block-child' style={{paddingRight:"20px"}}><button type="button" class="btn btn-outline-primary" style={{fontWeight:"bold"}}>Save</button></div>
              <div class='child inline-block-child'><button type="button" className="btn easy-apply">Easy Apply</button></div>
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
                The Google Play VC & Startups team works with new and exciting mobile app and game developers to create freshness and diversity in the Play Store and Android ecosystem. We achieve this by way of working with other key influencers in the startup ecosystem like VC firms and agencies to discover exciting new apps and games and by operating programs that provide tangible value. The team mainly scouts, accelerates, and supports these startup app and game developers as they launch and accelerate on Google Play.


Role & Responsibilities:

The team is hiring a program manager (temp role for 1+ years with potential for extension) to help manage our startup program, scout exciting new developers, and oversee a portfolio of startups already participating. Responsibilities will include:

Researching databases, including App Annie and Crunchbase
Scraping VC funding newsletters
Canvassing mobile design blogs and other sources
Keeping track of and managing a portfolio of developers accepted into the program
Interface with other internal teams and external parties to evangelize the program and create a pipeline of incoming developers
Manage various other operational aspects of the program

Desired Qualifications:

3-7 years experience at a mobile startup, game developer or a tech company focused on mobile technologies
A keen eye for mobile trends and signs of what makes a startup high potential
Familiarity with Google Play Store and Apple App Store and general understanding of mobile ecosystems
Ability to manage multiple tasks at once and demonstrated superb organizational abilities
General understanding of venture capital space and familiarity with top VC firms and their investing trends around the world
                </div>
                
              </div>
              <div className="col-md-4 job-description-partition">
                  <JobSkills/>
                  <JobRecruiter/>
                  <JobDetails></JobDetails>
                  
              </div>
              </div>
              
      </div>
      </div>
    )
  }
}
export default JobSingle;