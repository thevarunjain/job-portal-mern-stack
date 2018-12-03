import React, { Component } from 'react'
import JobSearchBar from "./JobSearchBar";
import Header from "../Common/Header"
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import axios from "axios";
import "./jobs.css";
import { api , printError, printMessage} from '../../services/';
import JobsBySkill from "../Jobs/JobsBySkill";


//import Navabar

class JobsHome extends Component {
    constructor(props) {
		super(props);

		this.state = ({
            savedJobs:0,
            appliedJobs:0
		})
    }

    async componentDidMount(){
        try {
            let savedcount= await api('GET','/jobs/saved/count');
            let appliedcount=await api('GET','/jobs/applied/count');
            console.log("count",savedcount);
            this.setState({
              savedJobs:savedcount.data.payLoad,
              appliedJobs:appliedcount.data.payLoad
              
            })
          } catch (error) {
            console.log(Object.keys(error), error.response);
            printError(error);
          }
    }
    
    // Bringing the jobs according to the skill set of the user
    // async componentDidMount(){
    //     var headers = new Headers();
    //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmVlN2VkMmM0YmYxNzRkMWNkYTc4NzkiLCJyb2xlIjoiYXBwbGljYW50IiwiaWF0IjoxNTQyNTc2Mzc4fQ.BHLiKXbJJ5KxwxwhvFty5e0VFHhdZ_QPZcjKwE_Xjjg"
	// 	const config = {
	// 		headers: 
	// 		{ 
	// 			'Authorization': 'Bearer ' + token
	// 		}
	// 	};
	// 	axios.defaults.withCredentials = true;
    //     let ret = await api('GET','/users/5bee7ed2c4bf174d1cda7879',config);
    //     var skills_set = ret.data.payLoad.user.skills;
    //     let ret = await api('GET','search/jobs',config);
        

    //     // console.log("data1",temp.data.payLoad);

    // }


    render() {

    return (
    <div>
        <Header />
            <div className="jobSearchBar">
                <div className="container">
                <JobSearchBar />        
                </div>
            </div>

            <section className="appliedjobs container col-md-8">
            <div className="row">


                <div className="col-md-3">
                    <span className="bluetext"> {this.state.appliedJobs}</span>
                    <span className ="lightgreytext"> Applied Jobs </span>
                </div>

                <div className="col-md-3">
                    <span className="bluetext"> {this.state.savedJobs}</span>
                    <span className ="lightgreytext"> <Link to="/jobshome/savedjobs" className ="lightgreytext"> Saved Jobs </Link></span>               
                </div> 
        </div>
        </section>

        <section class="companies-info companies-info-background col-md-8" >
        
        <div className="smallheading">
					<h3>Jobs you may be interested in</h3>
		</div>
        <div>
        <JobsBySkill />
        </div>
        </section>
        
        


    </div>
    )
  }
}


function mapStateToProps(state) {
    console.log("in map state details view",state);
  //  return { property_detail: state.fetch_details_view.property_detail,
  //  };
  }
  
  const mapDispachToProps = dispatch => {
    return {
     //   fetch_detailsview: (id) => dispatch(fetch_detailsview(id)),
     

    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(JobsHome);
  


