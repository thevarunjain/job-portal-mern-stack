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
        savedJobs:[],
        status:""
    }
    this.unsave=this.unsave.bind(this);
    this.func=this.func.bind(this);
}

async unsave(id){
  try {
    let message= await api('POST','/jobs/'+id+'/unsave');
    console.log("message",message);
    this.setState({
      status:message.data.payLoad.message
      
    })
  } catch (error) {
    console.log(Object.keys(error), error.response);
    printError(error);
}
this.func();
}

async func(){
  try {
    let ret = await api('GET','/jobs/saved');
    console.log("saved Jobs",ret);
    this.setState({
      savedJobs:ret.data.payLoad,
      
    })
  } catch (error) {
    console.log(Object.keys(error), error.response);
    printError(error);
  }
}
componentDidMount(){
  this.func()
}

  render() {
let savedjobs=null;
    savedjobs =this.state.savedJobs?this.state.savedJobs.map(job => {
        return(
          <div>
            <JobSaved data={job} unsave={this.unsave}/>
          </div>
        )
      }) :null;

      return(
    <div>
    <Header />
            <div className="jobSearchBar">
                <div className="container">
                <JobSearchBar />        
                </div>
            </div>
    <div style={{paddingTop:"2%"}}>
   {savedjobs}
    </div>
    </div>
      )
  }
}
export default SavedJobsHome;