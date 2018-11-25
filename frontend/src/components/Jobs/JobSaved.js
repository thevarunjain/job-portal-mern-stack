import React, { Component } from 'react'
import "./jobs.css";
import { Link } from 'react-router-dom';
import Pin from '../Files/Images/Pin.svg';
class JobSaved extends Component {
  render() {
    return (
      <div id="card11">
    <div  className="container py-1">
    <div id="card-card1" className="card">
      <div className="row ">
        <div className="col-md-3">
          
            <img src={Pin} style={{width:"40%"}} />

          </div>
          <div className="col-md-6">
            <div id="cb" className="card-block">
              <h3 id="card-heading-saved" className="card-title"><Link id="jobsavedheading" to="">Software Engineering Intern - Machine Learning</Link></h3>
              <div className="row">
              <div className="col-md-7" style={{paddingLeft:"0px"}}>
              <p id="propdetails1">San Jose ,CA</p>
              <p id="propdetails" className="card-text" style={{paddingTop:"0px"}}>San Jose ,CA</p>

              </div>
              <div className="col-md-3">
              <button type="button" className="btn easy-apply" style={{width:"100%"}}>Apply</button>              </div>
              <div className="col-md-2">
              <button type="button" class="btn btn-outline-primary">Unsave</button></div>
              </div>
              

              
             
            </div>
           
            
        
          
              
          

        </div>
      </div>
      
    </div>
    </div>

      </div>
    )
  }
}
export default JobSaved;