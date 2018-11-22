import { api , printError, printMessage} from '../services/';
import jwt_decode from 'jwt-decode';


export const CHECK_LOGIN = "CHECK_LOGIN";
export const  LOGIN_FAILED = "LOGIN_FAILED";
export const  LOGIN_SUCCESS = "LOGIN_SUCCESS";


function getSuccess(response) {
    return {
      type: LOGIN_SUCCESS,
      payload: response
    }
  }

  function getError(response) {
    return {
      type: LOGIN_FAILED,
      payload: response
    }
  }

async function login(data){
  return async function(dispatch){
    try 
    {
        let ret = await api('POST','/auth/login',data);
        console.log(ret);
        if(ret.status>=200 && ret.status<300)
        {
            var decoded = jwt_decode(ret['data']['token']);
            sessionStorage.setItem("user_id",decoded['sub']);
            sessionStorage.setItem("profile",decoded['role']);
            sessionStorage.setItem("user_token",ret['data']['token']);
            printMessage("Login successful.");
            dispatch(getSuccess(ret));
        }
      } 
      catch (error) {
        console.log(error); 
        printError(error);
      }
    }
}

export default login;