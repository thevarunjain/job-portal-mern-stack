import React, { Component } from 'react'
import "./jobs.css";
import { Link } from 'react-router-dom';
import Watch from '../Files/Images/Watch.svg';
import Tick from '../Files/Images/tick.svg';

class JobFunctions extends Component {
constructor(props){
    super(props)

    this.state={
        industry:"",
        type:"Full-time",
        function:"Information Technology"

    }

}

componentWillReceiveProps(nextProps){
    
 this.setState({
     industry:nextProps.industry,
     type:nextProps.type,
     function:nextProps.jobFunction
         
     }
 )
  }
  render() {
      
    return (
      <div>

      <label className="heading-location">
      Job Details
      </label><br/><br/>
            

            <div className="job-location1">
                <label>Job Industry</label>
            </div>
            <div className="job-location2">
            <label>{this.state.industry}</label>
        </div>
            <div className="job-location1">
                <label>Job Type</label>
            </div>
            <div className="job-location2">
            <label>{this.state.type}</label>
        </div>
            <div className="job-location1">
                <label>Job Functions</label>
            </div>
            <div className="job-location2">
            <label>{this.state.function}</label>
        </div>
            
     
      </div>
      
    )
  }
}
export default JobFunctions
;