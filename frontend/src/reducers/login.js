import jwt_decode from 'jwt-decode';

const LoginReducer =  (state = {}, action) => {
    //console.log(action);
    switch (action.type) {

      case 'LOGIN_SUCCESS':
        console.log(action);
        var decoded = jwt_decode(action.payload['data']['token']);
        console.log("DECODED IN REDUCER",decoded);
        return {
          ...state,
          user_id :  decoded['sub'],
          profile : decoded['role'],
          user_token : action.payload['data']['token']
        }
      default:
        return state;
    }
};


export default LoginReducer;