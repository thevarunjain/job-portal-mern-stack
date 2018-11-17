import React, { Component } from 'react'
import Header from "../Common/Header"
import JobSearchBar from "./SearchBar";
import JobCard from "./JobCard.js";
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

        <div>
        <div>
        
        <div className="row job-view">
            <div className="col-md-5 left-job-detail">
            <JobCard/>
            </div>

            <div className="col-md-7">


            </div>
          </div>
        </div>
        
        </div>

        



      </div>
    )
  }
}
export default SearchedJobs;