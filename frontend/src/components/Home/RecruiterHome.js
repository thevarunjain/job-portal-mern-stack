import React, { Component } from 'react'
import RecruiterHeader from "../Common/RecruiterHeader"
import JobsByskill from "../Jobs/JobsBySkill";
import "./Home.css";
import { api, printError, printMessage } from "../../services/";

class ApplicantHome extends Component {

  constructor(props)
  {
      super(props);
      this.graph1 = this.graph1.bind(this);
      this.getData = this.getData.bind(this);
     // this.graph1();
  }

  componentDidMount()
  {
      this.getData();
  }

  async getData()
  {
    try {
      let datax = await api("GET", '/users/dashboard');
      console.log(datax);
      /* let datax = {
        "payLoad": 
      }; */
      setTimeout(() => {
        window.graph1P(datax['data']);
      },70);
  } 
  catch (error) 
  {
    console.log(Object.keys(error), error.response);
    printError(error);
  }
  }

  graph1()
  {
    //alert("asd");
    console.log(window.Chart);
    window.graph1P();
  }







  render() {
    return (
    	<div>
        <div>
          <RecruiterHeader />
        </div>
        
          
        <div className="container rec-dashboard" >
          <span className="rec-board">RECRUITER DASHBOARD</span>
          <div className="row graph-box">
            <div className="col-lg-12">
                  {/******GRAPH DASHBOARD********/}
                  <div className="row col-lg-12">
                      <div className="col-lg-12 row rec-dashboard-box">
                          <div className="col-lg-4 infobox i1">

                          </div>
                          <div className="col-lg-4 infobox i2">
                          
                          </div>
                          <div className="col-lg-4 infobox i3">
                          
                          </div>
                      </div>  
                      
                  </div>
                  <div className="row col-lg-12">
                      <div className="col-lg-6 rec-dashboard-box">
                          <div className="grph-headings">Hot Jobs</div>
                          <canvas id="myChart"></canvas>
                      </div>
                      <div className="col-lg-6 rec-dashboard-box">
                          <div className="grph-headings">Cold Jobs</div>
                          <canvas id="myChart2"></canvas>
                      </div>
                  </div>
                  <div className="row col-lg-12">
                      <div className="col-lg-12 mt-top rec-dashboard-box">
                          <div className="grph-headings">City Wise Hot Jobs</div>
                          <canvas id="myChart3"></canvas>
                      </div>
                      <div className="col-lg-12 mt-top rec-dashboard-box">
                          <div className="grph-headings">Clicks Per day for Jobs ( Last 30 days )</div>
                          <canvas id="myChart4"></canvas>
                      </div>
                  </div>


            </div>  
          </div>
        </div>
		</div>
    )
  }
}


export default ApplicantHome;