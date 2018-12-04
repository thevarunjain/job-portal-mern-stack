import axios from 'axios';
import { api , printError} from '../services/';
export const JOBS_SEARCH = "job_search";
export const  JOBS_SEARCH_ERROR = "job_search_error";
function getSuccess(response) {
    return {
      type: JOBS_SEARCH,
      payload: response
    }
  }
  function getError(response) {
    return {
      type: JOBS_SEARCH_ERROR,
      payload: response
    }
  }

function get_filtered_jobs(data){
  

    //middleware call
  //receive response from backend
  return async function(dispatch) {
  


    try {
        let ret = await api('POST','/search/jobs',data);
        let temp=JSON.stringify(ret);
        temp=JSON.parse(temp);
        console.log("data1",temp.data.payLoad);
        

        dispatch(
            getSuccess(temp.data.payLoad)
          )
        
      } catch (error) {
        console.log("error response",Object.keys(error), error.response);
        dispatch(getError(error));
        console.log('errrr in get filtered',error);
        if(error.response){
        printError("ee",error);
        }
        
      }
  
  
}


}
export default get_filtered_jobs;