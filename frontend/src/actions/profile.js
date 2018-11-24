import { api , printError, printMessage} from '../services/';
export const FETCH_PROFILE = "FETCH_PROFILE";



function profileSuccess(response) {
    return {
      type: FETCH_PROFILE,
      payload: response
    }
  }


async function fetchProfile(){
  return async function(dispatch,currentstate){

    try 
    {
        const { LoginReducer } = currentstate();
        console.log("m",LoginReducer);
        let ret = await api('GET','/users/'+LoginReducer.user_id);
        console.log(ret);
        if(ret.status>=200 && ret.status<300)
        {
            //printMessage("Login successful.");
            dispatch(profileSuccess(ret));
        }
      } 
      catch (error) {
        console.log(error); 
        printError(error);
      }
    }
}

export default fetchProfile;