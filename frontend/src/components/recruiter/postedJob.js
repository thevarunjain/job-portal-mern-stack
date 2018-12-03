import React, { Component } from 'react'
import "../Jobs/jobs.css";
import { Link } from 'react-router-dom';
import Pin from '../Files/Images/Pin.svg';
import { api, printError, printMessage } from '../../services';
import $ from 'jquery';
import { IMAGE_PATHS, S3_URL } from '../../constants/routes';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';


class PostedJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.data.title,
            address: this.props.data.address,
            easyApply: this.props.data.easy_apply,
            applicant_resume_name: "",
            job_id: this.props.data._id,
            application_count:this.props.data.application_count,
            save_count:this.props.data.save_count,
            createdAt:this.props.data.createdAt,
            updatedAt:this.props.data.updatedAt,
            city:"",
            country:"",
            company_logo:S3_URL+this.props.data.company_logo,
            company:this.props.data.company
        }


    }

   
    

    render() {
       let created = moment(this.state.createdAt).format('YYYY-MM-DD');
       let updated = moment(this.state.updatedAt).format('YYYY-MM-DD');
        
console.log('address',this.state.address);
        return (
            <div id="card11">
                <div className="container py-1">
                    <div id="card-card1" className="card">
                        <div className="row" style={{height:"140px"}}>
                            <div className="col-md-3">

                                <img src={this.state.company_logo} style={{ width: "100%" }} />

                            </div>
                            <div className="col-md-9">
                                <div id="cb" className="card-block">
                                    <h3 id="card-heading-saved" className="card-title"><Link id="jobsavedheading" to="">{this.state.title}</Link></h3>
                                    <div className="row">
                                        <div className="col-md-7" style={{ paddingLeft: "0px"}}>
                                            <p id="propdetails1">{this.state.address.city},{this.state.address.country}</p>
                                            <p id="propdetails" className="card-text" style={{ paddingTop: "0px" }}>{this.state.company}</p>

                                        </div>

                                        
                                        
                                            <div className="col-md-2">
                                            <span className="bluetext"> {this.state.application_count} </span>
                                            <span className ="lightgreytext"> <Link to={`/jobapplicant/${this.state.job_id}`}>Appications</Link></span>
                                        </div>
                        
                                        <div className="col-md-2">
                                            <span className="bluetext"> {this.state.save_count} </span>
                                            <span className ="lightgreytext"> Bookmarks</span>               
                                        </div> 
                                        <div style={{paddingBottom:"10%"}}>
                        <button type="button" class="btn btn-outline-primary">Edit</button></div>
                                           

                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div style={{paddingLeft:"66%",paddingBottom:"2%"}}>
                        <span className="JobDate"> Created At :</span> <label>{created}</label><span className="JobDate" style={{paddingLeft:"4%"}}> Updated at :</span><label>{updated}</label>
                        </div>
                       

                    </div>
                </div>
            </div>
        )
    }
}
export default PostedJob;