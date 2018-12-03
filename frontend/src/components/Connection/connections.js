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
    profile_image:this.props.data.profile_image,
    headline:this.props.data.headline!=null?this.props.data.headline:"Deep Learning Intern",
    address:this.props.data.address
}
}
  render() {
    return (
    <div>
           <div className="row">
        <div className="col-md-3">
            <img src={this.state.profile_image} class="img-fluid connection-card-image" alt="" />
        </div>
       
        <div className="col-md-7">
       <h3 className="name-heading-connections">{this.state.fname} {this.state.lname}</h3>
       <h3 style={{paddingTop:"1%"}}>{this.state.headline}</h3>
       
       
</div>

  
</div>
<hr/>
</div>
      
    )
  }
}
export default Connections;