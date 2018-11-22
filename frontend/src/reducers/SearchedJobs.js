const SearchedJobs = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "job_search") {
       
        console.log("In Job Search Reducer",action.payload);
       
   
        //newState.status=action.payload.status;
        newState.jobs=action.payload;
        if(action.payload != null && action.payload.length > 0){
            newState.activeID = action.payload[0]._id;
        }
        
   
        // newState.property_detail=temp.payload.data;
        // newState.images=temp.payload.data.images.split('*');
       
        
    }else if (action.type === "job_search_error") {
        
        newState.mesage="Error in fetching Jobs";
        
    }

    //console.log("state in reducer",state);

    return newState;
};

export default SearchedJobs;