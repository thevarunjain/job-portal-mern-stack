const SetActiveID = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "job_active_id") {
       
        console.log("In Job Set Active ID Reducer",action.payload);
       
   
        //newState.status=action.payload.status;
        newState.activeID=action.payload;
        
   
        // newState.property_detail=temp.payload.data;
        // newState.images=temp.payload.data.images.split('*');
       
        
    }
    //console.log("state in reducer",state);

    return newState;
};

export default SetActiveID;