import React, { Component } from 'react'
import "./jobs.css";
import Watch from '../Files/Images/Watch.svg';
import Tick from '../Files/Images/tick.svg';
class JobSkills extends Component {
constructor(props){
    super(props)

    this.state={
        skills:['Pegasystems PRPC','Pega PRPC','XML','Management Consulting','Solution Architecture']
    }

}
  render() {
      let skills=null;
      skills =this.state.skills.map(skill => {
        return(
            <div class="row">
            <div class="col-md-1 image-tick">
            <img src={Tick} style={{width:"16px"}} alt=""></img>
            </div>
            <div class="col-md-9">
            <label className="skill-name">{skill}</label>
            </div>
            
            </div>
        )
    }) 
    return (
      <div>

      <label className="heading-location">
      Required Skills
      </label>
      <div>
      {skills}
      </div>
      </div>
      
    )
  }
}
export default JobSkills;