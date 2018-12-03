import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { APPLICANT_LOGIN_ROUTE } from "../../constants/routes";

/*
***********
APP COMPONENT IMPORTS 
***********
*/
import HomePage from "../Home/Home";
import RecruiterDashboard from "../recruiter/Dashboard/Dashboard";
import JobsHome from "../Jobs/JobsHome";
import JobDetailedView from "../Jobs/JobDetailedView";
import SearchedJobs from "../Jobs/SearchedJobs";
import Profile from "../profile/profile";
import Message from "../Message/Message";
import CompanyPage from "../Jobs/CompanyPage";
import JobSaved from "../Jobs/JobSaved";
import PostJob from "../PostJob/PostJob";
import PostJobfirst from "../PostJob/PostJobfirst";
import SavedJobsHome from "../Jobs/SavedJobsHome";
import JobsBySkill from "../Jobs/JobsBySkill";
import PublicProfile from "../profile/publicprofile";
import ApplicantHome from "../Home/ApplicantHome";
import RecruiterHome from "../Home/RecruiterHome";
import RecruiterConnection from "../Connection/RecruiterConnection"
import ApplicantConnection from "../Connection/ApplicantConnection"
import ListedJobs from "../recruiter/listedJobs";
import Recruitersignup from "../Recruitersignup/Recruitersignup";
import ApplyJob from "../ApplyJob/Applyjob";

class Main extends Component {
    render() {
        console.log(APPLICANT_LOGIN_ROUTE);
        return (



        <BrowserRouter>
            <div>
                <Route path="/" component={HomePage} exact/>
                <Route path="/recruiter" component={RecruiterDashboard} exact/>
                <Route path="/jobshome" component={JobsHome} exact />
                <Route path="/jobdetailedview" component={JobDetailedView} exact />
                <Route path="/postedjobs" component={ListedJobs} exact />
                <Route path="/profile" component={Profile} exact />
                <Route path="/message" component={Message} exact />
                <Route path="/companypage" component={CompanyPage} exact />
                <Route path="/jobshome/savedjobs" component={SavedJobsHome} exact />
                <Route path="/searchedjobs/:title/:location" component={SearchedJobs} exact />
                <Route path="/jobsbyskill" component={JobsBySkill} exact />
                <Route path="/public-profile/:id" component={PublicProfile} exact />
                <Route path="/applicanthome" component={ApplicantHome} exact />
                <Route path="/applicantconnection" component={ApplicantConnection} exact />
                <Route path="/recruiterhome" component={RecruiterHome} exact />
                <Route path="/recruiterconnection" component={RecruiterConnection} exact />
                <Route path="/jobsaved" component={JobSaved} exact />
                <Route
                  path="/searchedjobs/:title/:location"
                  component={SearchedJobs}
                  exact
                />
                <Route path="/postjob" component={PostJob} exact />
                <Route path="/postjobfirst" component={PostJobfirst} exact />
                <Route path="/recruitersignup" component={Recruitersignup} exact />
                <Route path="/apply" component={ApplyJob} exact />
                <Route path="/companypage/:id" component={CompanyPage} exact />

                
            </div>
          </BrowserRouter>
    );
  }
}

/* const ApplicantPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
      {...rest}
      render={props =>
          (Authentication.isUserLoggedIntoTravelerMode()) // boolean expression inside it will determine if the route is allowed or not 
              ? (
                  <Component {...props} />
              ) : (
                  <Redirect
                      to={{
                          pathname: APPLICANT_LOGIN_ROUTE,
                          state: { from: props.location }
                      }}
                  />
              )
      }
  />
);

 */
export default Main;
