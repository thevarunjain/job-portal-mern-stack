import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PLACES from '../Common/Places';
class JobSearchBar extends Component {
  constructor(props) {
    super(props);

    this.state ={
      searchJobName : "",
      searchLocation : ""
    }
    this.onChangeSearchJob = this.onChangeSearchJob.bind(this)
    this.onChangeLocation = this.onChangeLocation.bind(this)
    this.checkret = this.checkret.bind(this);
}

  onChangeSearchJob(event){
      this.setState({
          searchJobName : event.target.value 
      })
  }

  onChangeLocation(event){
      this.setState({
          searchLocation : event.target.value 
      })
  }

  checkret(data)
  {
    console.log(data);
  }
  
  render() {
    return (
      <div className="search-box">
      <form>
      <div className="row">
      <div className="col-sm-3">
            <input type="text" placeholder="Search Jobs" className = "inputtext" value={this.state.searchJobName} onChange={this.onChangeSearchJob} required />              
      </div>

      <div className="col-sm-3 inputtext">
      <PLACES onPosition={this.checkret}></PLACES>
      
      </div>
      <div className="col-sm-3 searchButton">    
      <Link to={`/searchedjobs/${this.state.searchJobName}/${this.state.searchLocation}`}><button type="submit">Search</button></Link>
      </div>
      </div>
      
    </form>
      </div>

    )
  }
}
export default JobSearchBar;