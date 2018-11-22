import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import GetJobSingle from "./jobsingle.js";
import GetJobs from "./jobs.js";
import LoginReducer from "./login";

const rootReducer = combineReducers({
  //reducer: mainreducer,
  form: formReducer,
  job_detail:GetJobSingle,
  jobs_all:GetJobs,
  LoginReducer
});

export default rootReducer;
