import React, { Component } from 'react'
import "./jobs.css";
import { Link } from 'react-router-dom';
import Pin from '../Files/Images/Pin.svg';
import JobSaved from './JobSaved';
import { api , printError} from '../../services/';
import JobSearchBar from "./JobSearchBar";
import Header from "../Common/Header"
class SavedJobsHome extends Component {

constructor(props){
    super(props);
    this.state={
        savedJobs:[]
    }
}

async componentDidMount(){
    try {
        let ret = await api('GET','/savedjobs');
        
        this.setState({
          savedJobs:ret.data.payLoad.jobs,
          
        })
      } catch (error) {
        console.log(Object.keys(error), error.response);
        printError(error);
      }
}

  render() {




      return(
    <div>
    <Header />
            <div className="jobSearchBar">
                <div className="container">
                <JobSearchBar />        
                </div>
            </div>
    <div style={{paddingTop:"2%"}}>
    <JobSaved/>
    </div>
    </div>
      )
  }
}
export default SavedJobsHome;