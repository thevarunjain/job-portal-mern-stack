import React, { Component } from 'react'
//import Navabar

class Jobs extends Component {
  constructor(props) {
      super(props);

      this.state ={
        searchJobName : "",
        searchLocation : ""
      }

      this.onChangeSearchJob = this.onChangeSearchJob.bind(this)
  }

    onChangeSearchJob(event){
        this.setState({
            searchJobName : event.target.value 
        })
    }

    onChangeSearchLocation(event){
        this.setState({
            searchLocation : event.target.value 
        })
    }

    render() {

    return (
      <div>

    <div className="jobSearchBar">
      <div>
      <input type="text" placeholder="Search Jobs" value={this.state.searchJobName} onChange={this.onChangeSearchJob} required />      
      </div>

        <div>
      <input type="text" placeholder="Search Location" value={this.state.searchJobName} onChange={this.onChangeLocation} required />
      </div>
    </div>

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