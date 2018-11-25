import React, { Component } from 'react'
import JobCard from "./JobCard.js";
import { api , printError, printMessage} from '../../services/';
import "./jobs.css";

class JobsBySkill extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recommended_jobs  : []
        }
    }
    
   async componentDidMount(){
        var used_id = sessionStorage.getItem("user_id")
        try 
        {
            let ret = await api("GET",`/users/${used_id}`);
            let job = await api("GET",`/search/jobs`);
            var recommended_jobs = []
            var skill_set = ret.data.payLoad.user.skills;
            var all_jobs =job.data.payLoad.job
            // console.log(skill_set)
            for(var i=0;i<all_jobs.length;i++){
                let flag=0;   
                for(var j=0;j<all_jobs[i].skills.length && flag==0;j++){
                    for(var k=0; k<skill_set.length; k++){
                          if(all_jobs[i].skills[j]==skill_set[k]){
                            recommended_jobs.push(all_jobs[i]);
                            flag=1;
                            break;
                          }  
                    }                      
                }
            }

            console.log(recommended_jobs);

            this.setState({
                recommended_jobs : all_jobs
            })

            // all_jobs.map((job)=>{
            //     console.log(job.skills);
            //     job.skills.some((element)=>{
            //         console.log(element)
            //         if(skill_set.includes(element)){
            //             recomeded_job.push(job)
            //             // skill_matched.push(element);
            //             // console.log("skill  matched",element);
            //             // console.log(skill_matched);
            //         }else{
            //             // console.log("skill not matched",element);
            //         }
            //     })

            // })
          } 
          catch(error) {
            console.log(error); 
            printError(error);
          }   
    }


    render() {
       var render_job = this.state.recommended_jobs.map((job)=>{
            return(
                                <div class="col-lg-3 col-md-4 col-sm-6">
                                    <div class="company_profile_info greybackground">
                                        <div class="company-up-info">
                                            <img src="http://via.placeholder.com/90x90" alt="" />
                                            <h3>{job.title}</h3>
                                            <h4>{job.function}</h4>
                                            <h4>{job.type}</h4>
                                        </div>
                                    </div>
                                </div>
            );
        })
    return (
            <div>                               
            <div class="container">
            <div class="companies-list">
            <div class="row">
                {render_job}
            </div>
            </div>
            </div>        
            </div>
        

      
    )
  }
}



export default JobsBySkill;