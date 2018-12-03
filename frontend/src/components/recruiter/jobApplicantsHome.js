import React, { Component } from 'react'
import "../Jobs/jobs.css";
import Header from '../Common/Header';
import { Link } from 'react-router-dom';
import Pin from '../Files/Images/Pin.svg';
import { api, printError, printMessage } from '../../services';
import $ from 'jquery';
import { IMAGE_PATHS, S3_URL } from '../../constants/routes';
import jwt_decode from 'jwt-decode';
import RecruiterHeader from "../Common/RecruiterHeader";
import PostedJob from "./postedJob";
import JobApplicant from "./jobApplicant";
class JobApplicantsHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobId:this.props.match.params.jobId,
            applicants:""
        }
    
    }
async componentDidMount(){
    //let rec_id=sessionStorage.getItem('user_id')
    let rec_id = this.state.jobId;
    try {
        let users= await api('GET','/jobs/'+rec_id+'/details');
        console.log('users', users);
        this.setState({
            applicants:users.data.payLoad
          
        })
      } catch (error) {
        console.log(Object.keys(error), error.response);
        printError(error);
    }

}

    render() {
        let applicants=null;
        applicants =this.state.applicants?this.state.applicants.map(user => {
        return(
          
            <JobApplicant data={user}/>
          
        )
      }) :null;



        return (
            <div>
            <Header/>

            

		<section class="companies-info">
        <div class="container">
            <div class="company-title">
                <h3>All Applicants</h3>
            </div>
            <div class="companies-list row">
                
                    
                    
                   {applicants}
                    
                    
                    
                    
                    


                
            </div>
            <div class="process-comm">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>
        </div>
    </section>

      
            </div>
        )
    }
}
export default JobApplicantsHome;