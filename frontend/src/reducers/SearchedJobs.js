const SearchedJobs = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "job_search") {
       
        console.log("In Job Search Reducer",action.payload);
       
   
        //newState.status=action.payload.status;
        newState.jobs=action.payload;
        if(action.payload != null && action.payload.length > 0){
            newState.activeID = action.payload[0]._id;
        }
        var jobs=action.payload;


        console.log("action payload jobs",jobs);
        for (var i=0;i<jobs.length;i++){
        var one_day=1000*60*60*24;
        let updateDateTime=new Date(jobs[i].updatedAt)
        let jobUpdatedDate=updateDateTime.getTime();
        let currentDateTime= new Date().getTime();
        let diff=currentDateTime-jobUpdatedDate;
            if(diff/one_day>=1){
                newState.jobs[i].time_diff=Math.floor(diff/one_day)+" days";
            }else{
                newState.jobs[i].time_diff=Math.floor(diff*24)+" hours";
            }
            
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