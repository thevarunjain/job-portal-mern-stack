import React, { Component } from 'react'

import Watch from '../Files/Images/Watch.svg';
import Tick from '../Files/Images/tick.svg';
import {Link} from 'react-router-dom';
import "./connection.css" 

class RecommendedJobs extends Component {
constructor(props){
    super(props)

this.state={
    title:this.props.data.title,
    function:this.props.data.function,
    type:this.props.data.type,
    company_logo:this.props.data.company_logo
}
}
  render() {
    return (
    <div>
           <div className="row">
                <div className="col-md-3">
                    <img src={this.state.company_logo} class="img-fluid job-card-image" alt="" />
                </div>
                <div className="col-md-7">
                    {this.state.title} {this.state.function}
                </div>
         </div>
<hr/>
</div>
      
    )
  }
}
export default RecommendedJobs;