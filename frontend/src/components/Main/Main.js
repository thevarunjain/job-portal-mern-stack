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
import Jobs from "../Jobs/Jobs";
import JobSingle from "../Jobs/JobSingle";
import SearchedJobs from "../Jobs/SearchedJobs";


class Main extends Component {
  render() {
    console.log(APPLICANT_LOGIN_ROUTE);
    return (
        <BrowserRouter>
            <div>
                <Route path="/" component={HomePage} exact/>
                <Route path="/recruiter" component={RecruiterDashboard} exact/>
                <Route path="/jobs" component={Jobs} exact />
                <Route path="/jobsingle" component={JobSingle} exact />
                <Route path="/searchedjobs" component={SearchedJobs} exact />
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
