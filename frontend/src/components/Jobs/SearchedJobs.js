import React, { Component } from 'react'
import Header from "../Common/Header"
import JobSearchBar from "./JobSearchBar";
import JobDetailedView from "./JobDetailedView";
import JobCard from "./JobCard.js";
import JobSkills from "./JobSkills";
import get_filtered_jobs from "../../actions/SearchedJobs";
import {connect} from "react-redux";
import {set_active_id} from "../../actions/jobCardActiveId";

import "./jobs.css";


class SearchedJobs extends Component {
  constructor(props){
    super(props);
    this.state={
      title:props.match.params.title,
      location:props.match.params.location,
      jobs:[],
      message:"",
      activeID: null
    }
    this.updateActiveID = this.updateActiveID.bind(this);
  }
componentDidMount(){
    //axios post http://localhost:3000/api/search/jobs

    sessionStorage.setItem('user_token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmVlN2U2NGM0YmYxNzRkMWNkYTc4NzYiLCJyb2xlIjoicmVjcnVpdGVyIiwiaWF0IjoxNTQyNTI1Mzk2fQ.MKXcOMdG-IOdGVYPS7KN_nZQ8E1IqSzHhGKqcuXMac0');
   var data={
    "company" : "facebook",
    "title": "Software Developer",
    "coordinates" : {
      "latitude": 37.3336613,
      "longitude": -121.91113860000002
    }
   }

    this.props.get_filtered_jobs(data);
    
  }

  componentWillReceiveProps(nextProps){
    this.updateActiveID(nextProps.activeID);
  }

updateActiveID(id){
    this.setState({activeID: id});
}

  render() {
let jobsComponent=null;
var message="";
if(this.state.jobs.length===0){
  message="No Jobs available for you search criteria"
}
jobsComponent =this.props.jobs?this.props.jobs.map(job => {
  return(
    <div class={job._id === this.state.activeID? 'activeCard':''}>
      <JobCard key={Math.random()} data={job} callback={this.updateActiveID}/>
    </div>
  )
}) :null;


    return (
      <div>
        <Header />
        <div id="heading" className="panel panel-default" >
          <div id="jobcard" className="card">
            <div className="card-body">

              <div className="panel panel-default">
                <div className="panel-body">

                <label>Search</label>
                </div>
              </div>
            </div>
          </div>



        </div>

        <div className="container">
        <div className="row">
        
        <div className="col-md-5  job-view">
            
        {jobsComponent}
        {message}
             </div>

            <div className="col-md-7 job-detail" style={{paddingTop:"2%"}}>
            <JobDetailedView/>

            </div>
          </div>
        </div>
        
        </div>

        



    )
  }
}

function mapStateToProps(state) {
  console.log("in map Jobs Search",state);
 return { jobs: state.searched_jobs.jobs,
          activeID:state.searched_jobs.activeID
    };
}

const mapDispachToProps = dispatch => {
  return {
     get_filtered_jobs: (data) => dispatch(get_filtered_jobs(data)),
     set_active_id: (id) => dispatch(set_active_id(id)),


  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(SearchedJobs);
