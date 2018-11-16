import React, { Component } from 'react'
import JobSearchBar from "./SearchBar";
import Header from "../Common/Header"


//import Navabar

class Jobs extends Component {
 
    render() {

    return (
      <div>
    <Header />
   <JobSearchBar />

    <div className="container-fluid">
    <div  className="col-md-4">
        SavedJobs
    </div>

    <div  className="col-md-4">
        Applied Jobs
    </div>    
    </div>




      </div>
    )
  }
}


function mapStateToProps(state) {
    console.log("in map state details view",state);
    return { property_detail: state.fetch_details_view.property_detail,
       
        
      
    
    
    
    };
  }
  
  const mapDispachToProps = dispatch => {
    return {
        fetch_detailsview: (id) => dispatch(fetch_detailsview(id)),
     

    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(Jobs);
  


