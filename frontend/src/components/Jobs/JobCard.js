import React, { Component } from 'react'
import Pin from '../Files/Images/Pin.svg';
import {connect} from "react-redux";
import {set_active_id} from "../../actions/jobCardActiveId";
import { IMAGE_PATHS, S3_URL } from '../../constants/routes';
import "./jobs.css";

class JobCard extends Component {

  constructor(props){
    super(props);
    this.state={
      title:this.props.data.title,
      company:this.props.data.company,
      description:this.props.data.description,
      address:this.props.data.address,
      id:this.props.data._id,
      active_id:this.props.jobs[0]._id,
      time_diff:this.props.data.time_diff,
      company_logo: S3_URL + this.props.data.company_logo
    }
    this.setActiveID=this.setActiveID.bind(this);
  }

  setActiveID(){
    this.props.set_active_id(this.state.id);
    this.props.callback(this.state.id);
  }
  render() {
    return (
      <div className="row left-job-detail" onClick={this.setActiveID}>
           
              <div className="col-md-2 left-job-detail-image">
                  <img src={this.state.company_logo} style={{width:"100%"}} class="img-fluid job-card-image" alt="LinkedIn" />
              </div>
              <div className="col-md-10 left-job-detail-desc">
              <div className="heading-company3">
               {this.state.title}
              </div>
              <div className="heading-company4">
              {this.state.company}
              </div>
              <div className="heading-location3">
              <img src={""}></img>&nbsp; {this.state.address.city} {this.state.address.zipcode},{this.state.address.country}
              </div>
              <div>
              <label style={{color:"green",fontSize:"12px"}}>New &#9670;</label>&nbsp;<label style={{fontSize:"12px"}}>Posted {this.state.time_diff}  ago</label>
               </div>
              <div className="heading-company4">
              {this.state.description}
              </div>
              </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("in map Jobs Search",state);
 return { jobs: state.searched_jobs.jobs,
};
}

const mapDispachToProps = dispatch => {
  return {
     set_active_id: (id) => dispatch(set_active_id(id)),
   

  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(JobCard);
