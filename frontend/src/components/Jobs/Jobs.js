import React, { Component } from 'react'
import JobSearchBar from "./SearchBar";
import Header from "../Common/Header"


//import Navabar

class Jobs extends Component {
 
    render() {

    return (
      <div>
    <Header />
   <JobSearchBar />

    <div className="container-fluid">
    <div  className="col-md-4">
        SavedJobs
    </div>

    <div  className="col-md-4">
        Applied Jobs
    </div>    
    </div>




      </div>
    )
  }
}

export default Jobs;