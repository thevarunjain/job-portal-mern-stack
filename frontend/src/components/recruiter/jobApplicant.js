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
import { Document, Page , ReactPDF } from 'react-pdf';
import test from "./test.pdf"
class JobApplicant extends Component {
    constructor(props) {
        super(props);

        this.state = {
           fname:this.props.data.name.first,
           lname:this.props.data.name.last,
           address:this.props.data.address,
            userId:this.props.data.applicantId,
            profile_image:this.props.data.profile_image,
            numPages: "",
    pageNumber: 1,
    resume:S3_URL+this.props.data.resume
        }

        this.onDocumentLoadSuccess=this.onDocumentLoadSuccess.bind(this);
    
    }
    onDocumentLoadSuccess ({ numPages }){
        console.log("in onload");
        this.setState({ numPages });
      }
 
    render() {

        const { pageNumber, numPages } = this.state;
        console.log("Resume File", this.state.resume);
        return (
           
             
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
            <div class="company_profile_info">
                <div class="company-up-info">
                    <img src={this.state.profile_image} alt=""/>
                    <h3>{this.state.fname} {this.state.lname}</h3>
                    <h4>{this.state.address.city}</h4>
                    <ul>
                    
                    </ul>
                </div>
                <Link class="view-more-pro" to={`/public-profile/${this.state.userId}`}>View Profile</Link>
                <div>
                <a href={this.state.resume}>View Resume</a>
                </div>
                <div>
            </div>
            </div>
           
            
            </div>
        )
    }
}
export default JobApplicant;