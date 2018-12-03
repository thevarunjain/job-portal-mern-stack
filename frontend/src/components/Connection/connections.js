import React, { Component } from 'react'

import Watch from '../Files/Images/Watch.svg';
import Tick from '../Files/Images/tick.svg';
import {Link} from 'react-router-dom';
import "./connection.css" 

class Connections extends Component {
constructor(props){
    super(props)

this.state={
    fname:this.props.data.name.first,
    lname:this.props.data.name.last,
   
}
}
  render() {
    return (
    <div>
           <div className="row">
        <div className="col-md-3">
            <img src="" class="img-fluid connection-card-image" alt="" />
        </div>
       
        <div className="col-md-7">
       <h3 className="name-heading-connections">{this.state.fname} {this.state.lname}</h3>
       
</div>

  
</div>
<hr/>
</div>
      
    )
  }
}
export default Connections;