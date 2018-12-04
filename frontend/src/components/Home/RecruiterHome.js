import React, { Component } from 'react'
import RecruiterHeader from "../Common/RecruiterHeader"
import JobsByskill from "../Jobs/JobsBySkill";
import "./Home.css";


class ApplicantHome extends Component {

  constructor(props)
  {
      super(props);
      this.graph1 = this.graph1.bind(this);

     // this.graph1();
  }

  componentDidMount()
  {



    let datax = {
      "payLoad": {
        "hotJobGraph": [
          {
            "jobId": "5c0514da07649a1b7460005e",
            "count": 4,
            "jobTitle": "Software XXX"
          },
          {
            "jobId": "5c047d9db6454907f952dc25",
            "count": 2,
            "jobTitle": "Software Developer"
          },
          {
            "jobId": "5c05131607649a1b7460005b",
            "count": 1,
            "jobTitle": "Software XXX"
          }
        ],
        "coldJobGraph": [
          {
            "jobId": "5c05131607649a1b7460005b",
            "count": 1,
            "jobTitle": "Software XXX"
          },
          {
            "jobId": "5c047d9db6454907f952dc25",
            "count": 2,
            "jobTitle": "Software Developer"
          },
          {
            "jobId": "5c0514da07649a1b7460005e",
            "count": 4,
            "jobTitle": "Software XXX"
          }
        ],
        "cityHotJobGraph": {
          "San Jose": [
            [
              "5c047d9db6454907f952dc25",
              "Software Developer",
              2
            ],
            [
              "5c05131607649a1b7460005b",
              "Software XXX",
              1
            ],
            [
              "5c048607b7053c085a86d0e8",
              "Software Developer",
              0
            ],
            [
              "5c05101c07649a1b7460004c",
              "Software Developer",
              0
            ],
            [
              "5c0510eb07649a1b7460004f",
              "Software Developer",
              0
            ],
            [
              "5c05120307649a1b74600052",
              "Software Developer",
              0
            ],
            [
              "5c05122207649a1b74600055",
              "Software XXX",
              0
            ],
            [
              "5c0512b307649a1b74600058",
              "jaba",
              0
            ]
          ],
          "San Diego": [
            [
              "5c0514da07649a1b7460005e",
              "Software XXX",
              4
            ]
          ]
        },
        "clickOnJobGraph": [],
        "savedCount": 1,
        "incompleteCount": 0,
        "totalCount": 1
      },
      "message": ""
    };
  

    setTimeout(() => {
      window.graph1P(datax);
    },70);
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
                      <div className="col-lg-12 rec-dashboard-box">
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