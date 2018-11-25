const user_profile =  (state = {}, action) => {
    //console.log(action);
    switch (action.type) {

      case 'FETCH_PROFILE':
        console.log(action);
        return {
          ...state,
          user_profile : action.payload['data']['payLoad']
        }
      default:
        return state;
    }
};


export default user_profile;