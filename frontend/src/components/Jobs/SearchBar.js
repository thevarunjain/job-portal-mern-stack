import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class JobSearchBar extends Component {
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
      <div className="search-box">
      <form>
      <div className="row">
      <div className="col-sm-3">
      <input type="text" placeholder="Search Jobs" value={this.state.searchJobName} onChange={this.onChangeSearchJob} required />              
      </div>

      <div className="col-sm-3">
      <input  type="text" placeholder="Search Location" value={this.state.searchJobName} onChange={this.onChangeLocation} required />
      </div>
      <div className="col-sm-3 searchButton">    
      <Link to="/searchedjobs"><button type="submit">Search</button></Link>
      </div>
      </div>
      
    </form>
      </div>

    )
  }
}
export default JobSearchBar;