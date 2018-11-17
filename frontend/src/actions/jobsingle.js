import axios from 'axios';
export const JOB_DETAIL = "job_detail";
export const  JOB_DETAIL_ERROR = "job_detail_error";
function getSuccess(response) {
    return {
      type: JOB_DETAIL,
      payload: response
    }
  }
  function getError(response) {
    return {
      type: JOB_DETAIL_ERROR,
      payload: response
    }
  }

function get_job_detail(id){
  

    //middleware call
  //receive response from backend
  return function(dispatch) {
  
  
    axios.get("/jobs/:"+id,).then(res=>{
        console.log("Get t Action",res);
        
    dispatch(
    getSuccess(res)
  )}).catch(error=>{
      dispatch(getError(error))
  })
}


}
export default get_job_detail;