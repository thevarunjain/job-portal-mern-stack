import React, { Component } from 'react'
import "../Jobs/jobs.css";
import { Link } from 'react-router-dom';
import Pin from '../Files/Images/Pin.svg';
import { api, printError, printMessage } from '../../services';
import $ from 'jquery';
import { IMAGE_PATHS, S3_URL } from '../../constants/routes';
import jwt_decode from 'jwt-decode';
import Header from "../Common/Header";
import PostedJob from "./postedJob";
class ListedJobs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postedJobs:['a']
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
    <Header />
            <div className="jobSearchBar">
                <div className="container">
                      
                </div>
            </div>
    <div style={{paddingTop:"2%"}}>
   {postedJobs}

  
    </div>
    </div>
            </div>
        )
    }
}
export default ListedJobs;