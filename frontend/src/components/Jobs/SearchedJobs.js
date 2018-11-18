import React, { Component } from 'react'
import Header from "../Common/Header"
import JobSearchBar from "./SearchBar";
import JobSingle from "./JobSingle";
import JobCard from "./JobCard.js";
import JobSkills from "./JobSkills";
import "./jobs.css";


class SearchedJobs extends Component {
  render() {
    return (
      <div>
        <Header />
        <div id="heading" className="panel panel-default" >
          <div id="jobcard" className="card">
            <div className="card-body">

              <div className="panel panel-default">
                <div className="panel-body">

                <label>Search</label>
                </div>
              </div>
            </div>
          </div>



        </div>

        <div className="container">
        <div className="row">
        
        <div className="col-md-5  job-view">
            
                <JobCard/>
                <JobCard/>
                <JobCard/>
                <JobCard/>
                <JobCard/>
                <JobCard/>
                <JobCard/>
                <JobCard/>
                <JobCard/>
                <JobCard/>
             </div>

            <div className="col-md-7 job-detail" style={{paddingTop:"2%"}}>
            <JobSingle/>

            </div>
          </div>
        </div>
        
        </div>

        



    )
  }
}
export default SearchedJobs;