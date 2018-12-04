import axios from 'axios';
import { api , printError} from '../services/';
export const JOB_ACTIVE_ID = "job_active_id";




export const  set_active_id=(id)=>{
    return{
        type:JOB_ACTIVE_ID,
        payload:id
    }
}

