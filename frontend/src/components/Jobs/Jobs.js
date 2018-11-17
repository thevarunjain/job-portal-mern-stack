import React, { Component } from 'react'
import JobSearchBar from "./SearchBar";
import Header from "../Common/Header"
import {connect} from "react-redux";
import "./jobs.css";

//import Navabar

class Jobs extends Component {
 
    render() {

    return (
      <div>
    <Header />
    <div className="jobSearchBar">
    <div className="container">
    <JobSearchBar />        
    </div>
    </div>

        <section class="companies-info">

			<div class="container">

				<div class="company-title">
					<h3>Jobs you may be interested in</h3>
				</div>


				<div class="companies-list">
					<div class="row">
						<div class="col-lg-3 col-md-4 col-sm-6">
							<div class="company_profile_info">
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
				   </div>
				{/* <div class="process-comm">
					<div class="spinner">
						<div class="bounce1"></div>
						<div class="bounce2"></div>
						<div class="bounce3"></div>
					</div>
				</div> */}
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
  )(Jobs);
  


