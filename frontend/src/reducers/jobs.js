const GetJobs = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "get_jobs") {
       
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("Fetch book",temp);
        //set token in local storage
        //localStorage.setItem("owner", temp.payload.data.token);
        //console.log("in reducer",temp.payload.status);
        newState.status=temp.payload.status;
        let message=null;
        if(temp.payload.status==200){
            message="This property has been successfully booked.";
        }else if(temp.payload.status==201){
            message="This property is already booked for your search criteria";
        }
        newState.message=message;
        // newState.property_detail=temp.payload.data;
        // newState.images=temp.payload.data.images.split('*');
       
        
    }else if (action.type === "get_jobs_error") {
        
        let temp=JSON.stringify(action);
        temp=JSON.parse(temp);
        console.log("temp error",temp);
        console.log("in book reducer error",temp.payload.response.status);
        newState.status=temp.payload.response.status;
        newState.message="This property is unavailable during selected dates";
        console.log(newState);
        
    }

    //console.log("state in reducer",state);

    return newState;
};

export default GetJobs;