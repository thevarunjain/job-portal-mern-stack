import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PLACES from '../Common/Places';
class JobSearchBar extends Component {
  constructor(props) {
    super(props);

    this.state ={
      searchJobName : "",
      latitude: "",
      longitude:""

    }
    this.onChangeSearchJob = this.onChangeSearchJob.bind(this)
    this.onChangeLocation = this.onChangeLocation.bind(this)
    this.checkret = this.checkret.bind(this);
    this.route = this.route.bind(this);
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
    console.log("location",data);
    this.setState({
      latitude: data.coordinates.latitude,
      longitude:data.coordinates.longitude
    })
    
  }

  route(e){
    e.preventDefault();
    console.log("Props",this.props);
    if (this.state.searchJobName && this.state.latitude && this.state.longitude){
      window.location.href=`/searchedjobs/${this.state.searchJobName}/${this.state.latitude}/${this.state.longitude}`;
    }
  }

  
  render() {
    return (
      <div className="search-box">
      <form>
      <div className="row">
      <div className="col-sm-5">
            <input type="text" placeholder="Search Jobs" className = "inputtext" value={this.state.searchJobName} onChange={this.onChangeSearchJob} required />              
      </div>

      <div className="col-sm-5 inputtext pos-rel">
      <PLACES onPosition={this.checkret}></PLACES>
      
      </div>
      <div className="col-sm-2 searchButton">    
      
      <button type="button" onClick={this.route}>Search</button>
      </div>
      </div>
      
    </form>
      </div>

    )
  }
}
export default JobSearchBar;