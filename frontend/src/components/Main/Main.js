import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import {APPLICANT_LOGIN_ROUTE} from '../../constants/routes';

/*
***********
APP COMPONENT IMPORTS 
***********
*/
import HomePage from '../Home/Home';
import RecruiterDashboard from '../recruiter/Dashboard/Dashboard';
import JobsHome from "../Jobs/JobsHome";
import JobDetailedView from "../Jobs/JobDetailedView";
import SearchedJobs from "../Jobs/SearchedJobs";
import Profile from "../profile/profile";
import Message from "../Message/Message";
import CompanyPage from "../Jobs/CompanyPage";
import JobSaved from "../Jobs/JobSaved";


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
                <Route path="/searchedjobs" component={SearchedJobs} exact />
                <Route path="/profile" component={Profile} exact />
                <Route path="/message" component={Message} exact />
                <Route path="/companypage" component={CompanyPage} exact />
                <Route path="/jobsaved" component={JobSaved} exact />



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
