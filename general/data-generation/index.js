var express = require('express')
var app = express();
var faker = require('faker');
var http = require("http");
const api = require('./Axios');
const user = require('./user');
const jobs = require('./jobs');
//console.log(user);

let jobtype = ['recruiter','applicant'];


function selectRandom(type)
{
    if(type=='JOBS')
    {
        return jobtype[Math.floor(Math.random()*jobtype.length)];
    }
}

app.get('/signup/:count',async function(req, res) {
  
    let count = req.params.count;
    for(let k = 0 ; k < count ; k++)
    {
            let randomName = faker.name.findName();
            //*************USERS ARRAY****************/
            let fname= faker.name.firstName();
            let lname = faker.name.lastName();
            try 
            {
                let userdata = {
                    "email": (fname+lname+"@gmail.com").toLowerCase(),
                    "password": "CMPE273",
                    "role": selectRandom('JOBS'),
                    "name": {
                        "first": fname ,
                        "last": lname,
                    }
                }
                let ret = await api.api('POST',('/auth/signup'),userdata);
                let token = ret['data']['account']['id'];
                console.log(token);
                let userdata2 = user(fname,lname);   
                //console.log(userdata2);
                let ret2 = await api.api('PUT',('/users/'+token),userdata2);
                //console.log(ret2);
                let a = {
                    't1' : '',
                    't2' : userdata
                }
                if(ret2.status>=200 && ret2.status<300)
                {
                    console.log("Success");
                }
                else 
                {
                    console.log("Failed");
                }
                res.send(a);
            } 
            catch (error) 
            {
                console.log(error);
            }
        }
});



app.get('/jobs/:count',async function(req, res) {
  
    let count = req.params.count;
    for(let k = 0 ; k < count ; k++)
    {
            let randomName = faker.name.findName();
            //*************USERS ARRAY****************/
            let fname= faker.name.firstName();
            let lname = faker.name.lastName();
            try 
            {
                let jobdata = jobs();
                console.log(jobdata);
                let ret = await api.api('POST',('/jobs'),jobdata);
                //let token = ret['data']['account']['id'];
                
                if(ret.status>=200 && ret.status<300)
                {
                    console.log("Success");
                }
                else 
                {
                    console.log("Failed");
                }
                res.send(jobdata);
            } 
            catch (error) 
            {
                console.log(error);
            }
        }
});


app.get('/jobs/:count',async function(req, res) {
  
    let count = req.params.count;
    for(let k = 0 ; k < count ; k++)
    {
            let randomName = faker.name.findName();
            //*************USERS ARRAY****************/
            let fname= faker.name.firstName();
            let lname = faker.name.lastName();
            try 
            {
                let jobdata = jobs();
                console.log(jobdata);
                let ret = await api.api('POST',('/jobs'),jobdata);
                //let token = ret['data']['account']['id'];
                
                if(ret.status>=200 && ret.status<300)
                {
                    console.log("Success");
                }
                else 
                {
                    console.log("Failed");
                }
                res.send(jobdata);
            } 
            catch (error) 
            {
                console.log(error);
            }
        }
});



app.listen(3002);