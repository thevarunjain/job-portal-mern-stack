import React, { Component } from 'react'
import JobSearchBar from "./JobSearchBar";
import Header from "../Common/Header"
import {connect} from "react-redux";
import "./jobs.css";

//import Navabar

class JobsHome extends Component {
 
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
                    <span className="bluetext"> 21 </span>
                    <span className ="lightgreytext"> Applied Jobs </span>
                </div>

                <div className="col-md-3">
                    <span className="bluetext"> 10 </span>
                    <span className ="lightgreytext"> Saved Jobs </span>               
                </div> 
        </div>
        </section>

        <section class="companies-info companies-info-background col-md-8" >
        
        <div className="smallheading">
					<h3>Jobs you may be interested in</h3>
		</div>
		
        	<div class="container">
				<div class="companies-list">
					<div class="row">
						<div class="col-lg-3 col-md-4 col-sm-6">
							<div class="company_profile_info greybackground">
								<div class="company-up-info">
									<img src="http://via.placeholder.com/90x90" alt="" />
									<h3>Facebook Inc.</h3>
									<h4>Establish Feb, 2004</h4>
									<ul>
										<li><a href="#" title="" class="follow">Follow</a></li>
										<li><a href="#" title="" class="message-us"><i class="fa fa-envelope"></i></a></li>
									</ul>
								</div>
								<a href="#" title="" class="view-more-pro">View Profile</a>
							</div>
                        </div>
                        
                        <div class="col-lg-3 col-md-4 col-sm-6">
							<div class="company_profile_info greybackground">
								<div class="company-up-info">
									<img src="http://via.placeholder.com/90x90" alt="" />
									<h3>Facebook Inc.</h3>
									<h4>Establish Feb, 2004</h4>
								</div>
							</div>
                        </div>
				   </div>
			</div>
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
  


