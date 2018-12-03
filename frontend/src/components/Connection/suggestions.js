import React, { Component } from 'react'

import Watch from '../Files/Images/Watch.svg';
import Tick from '../Files/Images/tick.svg';
import {Link} from 'react-router-dom';
import { api, printError, printMessage } from '../../services';
class Suggestions extends Component {
constructor(props){
    super(props)

this.state={
    fname:this.props.data.name.first,
    lname:this.props.data.name.last,
    userid:this.props.data.id
}

this.connect=this.connect.bind(this);
}


async connect(){


    try {
        let user= await api('POST','/users/'+this.state.userid+'/connect');
        console.log("user",user);
       printMessage(`Successfully connected to ${this.state.fname} ${this.state.lname}`)
      } catch (error) {
        console.log(Object.keys(error), error.response);
        printError(error);
	  }

}
  render() {
    return (
   




      
              
                  <div class="col-lg-5 col-md-4 col-sm-6 col-12">
                      <div class="company_profile_info">
                          <div class="company-up-info">
                              <img src="http://via.placeholder.com/91x91" alt="" />
                              <Link to=""><h3>{this.state.fname} {this.state.lname}</h3></Link>
                              <h4>Graphic Designer</h4>
                              <ul>
                                  <li><button type="button" class="btn btn-outline-primary" onClick={this.connect}>Connect</button></li>
                                  
                                  <li><a href="#" title="" class="message-us"><i class="fa fa-envelope"></i></a></li>
                                  
                              </ul>
                          </div>
                      
                      </div>
                  </div>
                  
       

    
      
    )
  }
}
export default Suggestions;