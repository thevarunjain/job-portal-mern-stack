import axios from 'axios';
export const GET_JOBS = "get_jobs";
export const  GET_JOBS_ERROR = "get_jobs_error";
function getSuccess(response) {
    return {
      type: GET_JOBS,
      payload: response
    }
  }
  function getError(response) {
    return {
      type: GET_JOBS_ERROR,
      payload: response
    }
  }

function get_jobs(data){
  

    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.get(rootURL+"/jobs",{params:{location:data
    }}).then(res=>{
        console.log("Get t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}
export default get_jobs;