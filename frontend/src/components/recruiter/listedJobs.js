import React, { Component } from 'react'
import "../Jobs/jobs.css";
import { Link } from 'react-router-dom';
import Pin from '../Files/Images/Pin.svg';
import { api, printError, printMessage } from '../../services';
import $ from 'jquery';
import { IMAGE_PATHS, S3_URL } from '../../constants/routes';
import jwt_decode from 'jwt-decode';
import RecruiterHeader from "../Common/RecruiterHeader";
import PostedJob from "./postedJob";

class ListedJobs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postedJobs:""
        }
    
    }
async componentDidMount(){
    try {
        let jobs= await api('GET','/jobs/findByRecruiter');
        console.log('postedJobs',jobs);
        this.setState({
            postedJobs:jobs.data.payLoad
          
        })
      } catch (error) {
        console.log(Object.keys(error), error.response);
        printError(error);
    }

}

    render() {
        let postedJobs=null;
    postedJobs =this.state.postedJobs?this.state.postedJobs.map(job => {
        return(
          <div>
            <PostedJob data={job}/>
          </div>
        )
      }) :null;



        return (
            <div>
            
            <div>
    <RecruiterHeader />
    <div style={{paddingTop:"5%"}}>
    <div className="appliedjobs container col-md-8">
    <div className="row">
                <div className="col-md-3">
                    <span className="bluetext"> {this.state.postedJobs.length}</span>
                    <span className ="lightgreytext"> <Link to="/jobshome/savedjobs" className ="lightgreytext"> Posted Jobs </Link></span>               
                </div> 

                
                <div className="col-md-3">
                <Link className="bluetext" style={{fontSize : "20px" }} to="/postjob"><span className="bluetext"> Post a Job</span></Link>
                    {/* <span className ="lightgreytext"> Applied Jobs </span> */}
                </div>
        </div>
        </div>
   {postedJobs}

  
    </div>
    </div>
            </div>
        )
    }
}
export default ListedJobs;